import React, { useEffect, useState } from "react";
import { IconPlayerPlayFilled } from '@tabler/icons-react';

const Menu = ({ setFileText }) => {


    const handleFileUpload = (e) => {
        const file_path = e.target.value
        const file = e.target.files[0] // Obtenemos el primer archivo seleccionado
        if (file) {
            // Realiza las operaciones que necesites con el archivo aquí
            console.log("Archivo seleccionado:", file)
            // texto del archivo
            const reader = new FileReader();

            reader.onload = (e) => {
                const fileContent = e.target.result; // Aquí tienes el texto del archivo
                setFileText(fileContent); // Guarda el texto en el estado
            };

            reader.readAsText(file);
        }
    }

    return (
        <div className="flex flex-col w-screen bg-gray-900">
            <div className="flex flex-row items-center justify-between mx-8">
                <input
                    type="file"
                    accept=".txt, .cl" // Define los tipos de archivo permitidos
                    onChange={handleFileUpload}
                    style={{ display: "none" }} // Oculta el input de forma visual
                    id="file-upload"
                />
                <label
                    htmlFor="file-upload"
                    className="px-4 py-2 m-2 text-white bg-gray-800 rounded-md cursor-pointer"
                >
                    Upload
                </label>

                <button
                    className="px-4 py-2 m-2 bg-gray-800 rounded-md cursor-pointer  text-green-500"><IconPlayerPlayFilled color="lime" size={24} />
                </button>
                <h1 className="text-2xl font-bold text-white">Cool IDE</h1>
            </div>
        </div>
    )
}

export default Menu
