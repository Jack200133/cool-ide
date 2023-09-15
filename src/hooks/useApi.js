/* eslint-disable no-console */
import { useState, useCallback } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { useApiContext } from './ApiContext'

const tryParse = (s) => {
  let error = null
  try {
    error = JSON.parse(s)
  } catch {
    error = s.toString()
  }
  return error
}

const useApi = (defaultData, options = {}) => {
  // options.config object with request configuration
  // options.simpleRequest makes loading false always and doesnt clear data
  // options.dontUpdateState makes it so that the default state is never updated
  //                         you must manually manage state using the returned promise
  const [response, setResponse] = useState({
    loading: false,
    data: defaultData,
    error: false,
  })

  const {
    token,
    config: contextConfig,
    debug = true,
  } = useApiContext()
  // console.log('useApiContext', token, contextConfig, debug)
  const config = {
    ...contextConfig,
    ...options.config,
  }

  // config.onErrorCallback will be called if the api call does not return 200
  // and will receive the response
  // config.onSuccessCallback will be called if the api call returns 200
  // note that when both callbacks are called they are not waited on
  // to process the response, use the unimplemented middleware function

  const authHeaders = {}

  if (token.token) {
    authHeaders.Authorization = `Bearer ${token.token}`
  }

  const handleRequest = useCallback(
    (method, route, body = {}, headers = {}) => {
      if (!options.simpleRequest && !options.dontUpdateState) {
        setResponse({
          loading: true,
          error: false,
          data: response.data || defaultData,
        })
      }

      const fetchConfig = {
        method,
        headers: {
          // add default headers here
          'Content-Type': 'application/json',
          ...authHeaders,
          ...headers,
        },
        body: method !== 'GET' ? JSON.stringify(body) : undefined,
        mode: 'cors',
        cache: 'default',
      }
      const apiUrl = `http${config.apiSecure ? 's' : ''}://${
        config.apiUrl
      }${config.apiPort ? `:${config.apiPort}` : ''}/${
        config.apiMount ? `${config.apiMount}/` : ''
      }${route}`

      if (debug) {
        console.info(
          'API REQUEST:',
          method,
          route,
          JSON.stringify(body),
        )
      }

      // TODO: if a component gets unmounted mid request, it will log an error
      return fetch(apiUrl, fetchConfig)
        .then((r) => {
          if (!r.ok) {
            // Todo: rewrite this function to use async/await and wait for error callback
            if (typeof config.onErrorCallback === 'function') {
              config.onErrorCallback(r)
            }

            // assume all non 200 are errors
            throw r
          }
          // Todo: enable this when we use it
          // if (typeof config.onErrorCallback === 'function') {
          //  config.onSuccessCallback(r)
          // }
          return r.text() // we receive the body as text and manually parse it later
        })
        .then((r) => {
          const responseBody = tryParse(r)
          if (debug) {
            console.info('API RESPONSE:', responseBody)
          }

          const data = typeof responseBody === 'object' && responseBody !== null
            ? {
              // in case the response does not contain some of the default data,
              // we fill it to avoid undefined errors
              ...defaultData,
              ...responseBody,
            }
            : responseBody || ''
          if (!options.dontUpdateState) {
            setResponse({
              loading: false,
              error: false,
              data,
            })
          }

          return data
        }) // TODO: we should agree on a protocol and receive a json
        .catch((e) => {
          if (typeof e.text === 'function') {
            // some errors are backend errors, we need to parse those as well
            return e.text().then((errorBody) => {
              const errorBodyInJson = tryParse(errorBody)

              console.error(
                'API ERROR:',
                e.status,
                errorBodyInJson,
                errorBody,
              )



              if (!options.dontUpdateState) {
                setResponse({
                  loading: false,
                  error: errorBodyInJson || true,
                  data: { ...defaultData, ...errorBodyInJson },
                })
              }
            })
          }
          // this is probably a system error
          console.error('SYSTEM ERROR:', e)

          if (!options.dontUpdateState) {
            setResponse({
              loading: false,
              error: e,
              data: defaultData,
            })
          }
          // we have no promise to return
          return e
        })
    },
    [token],
  )
  return {
    isLoading: response.loading,
    hasError: response.error,
    data: response.data,
    handleRequest,
  }
}

export default useApi
