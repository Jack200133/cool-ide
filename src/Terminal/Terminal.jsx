import React, { useState, useEffect } from 'react';
import { IconArrowBarToDown } from '@tabler/icons-react';

function Terminal({ data, setCodetwo, codetwo }) {
    if (!data) return null;

    const [activeTab, setActiveTab] = useState("Errores");
    const [zoomImage, setZoomImage] = useState(null);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.keyCode === 27) {
                setZoomImage(null);
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <div className="w-full mx-h-60  bg-gray-800 text-white p-4">
            <div className="tabs pb-2">
                <div className="tab-list flex w-full gap-12 pb-2">
                    <button className="w-60 justify-start flex"
                        onClick={() => setActiveTab("Errores")}>Errores</button>
                    <button className='flex flex-row items-center gap-2 w-60 justify-between    '
                        onClick={() => setActiveTab("Graf")}>Grafo
                        <button className='p-0 m-0 hover:border-green-500 '>
                            <a href={`data:image/png;base64,${data.grafo_image}`} download="grafo.png" className="text-white"><IconArrowBarToDown color="lime" size={24} /></a>
                        </button>
                    </button>
                    <button className='flex flex-row items-center gap-2 w-60 justify-between   '
                        onClick={() => setActiveTab("Simbol")}>Tabla de Símbolos
                        <button className='p-0 m-0 hover:border-green-500 '>
                            <a href={`data:image/png;base64,${data.symbol_table_image}`} download="tabla_de_simbolos.png" className="text-white"><IconArrowBarToDown color="lime" size={24} /></a>
                        </button>
                    </button>

                    <button
                        onClick={() => setCodetwo(!codetwo)}>
                        Cambiar Codigo
                    </button>
                </div>

                <div className="tab-content overflow-auto max-h-52">
                    {activeTab === "Errores" && (
                        <div className='rounded-xl w-full bg-slate-900 grid grid-cols-1 pl-4 divide-y divide-slate-400/25 divide-dashed'>
                            {data.errors.length > 0 ? (
                                data.errors.map((error, index) => <p className='text-red-600 py-2' key={index}>{error.full_error}</p>)
                            ) : (

                                <p className='text-green-500 py-8 w-full bg-slate-900'>No hay errores</p>

                            )}
                        </div>
                    )}
                    {activeTab === "Graf" && data.grafo_image && (
                        <div onClick={() => setZoomImage(data.grafo_image)}>
                            <img src={`data:image/png;base64,${data.grafo_image}`} alt="Grafo" />
                        </div>
                    )}
                    {activeTab === "Simbol" && data.symbol_table_image && (
                        <div onClick={() => setZoomImage(data.symbol_table_image)}>
                            <img src={`data:image/png;base64,${data.symbol_table_image}`} alt="Tabla de Símbolos" />
                        </div>
                    )}
                </div>
            </div>

            {zoomImage && (
                <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <img className="max-h-screen max-w-screen" src={`data:image/png;base64,${zoomImage}`} alt="Zoomed" />
                </div>
            )}
        </div>
    );
}

export default Terminal;
