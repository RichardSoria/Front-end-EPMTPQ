import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // 🔹 Importar useParams para obtener el ID del corredor
import ParadaContext from "../../context/ParadaProvider";
import Mensaje from "../Alertas/Mensaje";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export const FormularioParada = () => {
    const { paradaSeleccionada, setParadaSeleccionada, listarParadas } = useContext(ParadaContext);
    const { id: corredorId } = useParams(); // 🔹 Obtener el ID del corredor desde la URL
    const [mensaje, setMensaje] = useState({});
    const [form, setForm] = useState({
        nombre: "",
        tipo: "",
        ubicacion: "",
    });

    // ✅ Llenar el formulario automáticamente si hay una parada seleccionada
    useEffect(() => {
        if (paradaSeleccionada) {
            setForm({
                nombre: paradaSeleccionada.nombre ?? "",
                tipo: paradaSeleccionada.tipo ?? "",
                ubicacion: paradaSeleccionada.ubicacion ?? "",
            });
        } else {
            resetForm();
        }
    }, [paradaSeleccionada]);

    const resetForm = () => {
        setForm({ nombre: "", tipo: "", ubicacion: "" });
        setParadaSeleccionada(null);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e, action) => {
        e.preventDefault();

        if (Object.values(form).some((input) => input === "")) {
            setMensaje({ respuesta: "Todos los campos son requeridos.", tipo: false });
            setTimeout(() => setMensaje({}), 3000);
            return;
        }

        if (!paradaSeleccionada && action !== "agregar") {
            setMensaje({ respuesta: "Seleccione una parada para continuar.", tipo: false });
            setTimeout(() => setMensaje({}), 3000);
            return;
        }

        if (!confirm(`¿Está seguro de ${action} la parada?`)) return;

        try {
            const token = localStorage.getItem("token");
            const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/parada`;

            const headers = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };

            const id = paradaSeleccionada?._id;

            console.log("🟢 ID del corredor obtenido de la URL:", corredorId); // 🔹 Verifica en la consola si el ID es correcto

            // ✅ Asegurar que el `corredor` se asigna correctamente
            const paradaData = {
                ...form,
                corredor: corredorId, // 🔹 Se asigna automáticamente el ID del corredor desde la URL
            };

            const endpoints = {
                agregar: { url: `${baseUrl}/registro`, method: "post" },
                actualizar: { url: `${baseUrl}/${id}`, method: "put" },
                activar: { url: `${baseUrl}/activar/${id}`, method: "put" },
                desactivar: { url: `${baseUrl}/desactivar/${id}`, method: "put" },
            };

            await axios[endpoints[action].method](endpoints[action].url, paradaData, headers);

            listarParadas();
            resetForm();
            setMensaje({ respuesta: `Parada "${form.nombre}" ${action} con éxito.`, tipo: true });
            setTimeout(() => setMensaje({}), 3000);
        } catch (error) {
            console.log("⚠️ Error en la solicitud:", error.response);

            if (error.response?.status === 400 && error.response.data.msg.includes("ya existe")) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false });
            } else {
                setMensaje({ respuesta: error.response?.data?.msg || `Error al ${action}.`, tipo: false });
            }

            setTimeout(() => setMensaje({}), 3000);
        }
    };

    return (
        <form className="shadow-2xl rounded-lg p-6 bg-white max-w-2xl mx-auto">
            {/* ✅ Mostrar mensaje de éxito o error */}
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

            {/* ✅ Campos del formulario con el ID de la parada junto a "Ubicación" */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">
                        Nombre:
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        className="border-2 w-full p-3 mt-1 placeholder-gray-400 rounded-md focus:ring-2 focus:ring-custom-blue"
                        placeholder="Ingrese nombre"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="tipo" className="text-gray-700 uppercase font-bold text-sm">
                        Tipo:
                    </label>
                    <input
                        id="tipo"
                        type="text"
                        className="border-2 w-full p-3 mt-1 placeholder-gray-400 rounded-md focus:ring-2 focus:ring-custom-blue"
                        placeholder="Ingrese tipo"
                        name="tipo"
                        value={form.tipo}
                        onChange={handleChange}
                    />
                </div>

                {/* 🔹 Ubicación y ID de la parada en la misma fila */}
                <div className="mb-4">
                    <label htmlFor="ubicacion" className="text-gray-700 uppercase font-bold text-sm">
                        Ubicación:
                    </label>
                    <input
                        id="ubicacion"
                        type="text"
                        className="border-2 w-full p-3 mt-1 placeholder-gray-400 rounded-md focus:ring-2 focus:ring-custom-blue"
                        placeholder="Ingrese ubicación"
                        name="ubicacion"
                        value={form.ubicacion}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="paradaId" className="text-gray-700 uppercase font-bold text-sm">
                        ID de Parada:
                    </label>
                    <input
                        id="paradaId"
                        type="text"
                        className="border-2 w-full p-3 mt-1 rounded-md bg-gray-200 cursor-not-allowed"
                        value={paradaSeleccionada?._id || "No seleccionado"}
                        disabled // 🔹 Solo visible, no editable
                    />
                </div>
            </div>

            {/* ✅ Botones de acción organizados en 2x2 */}
            <div className="grid grid-cols-2 gap-4 mt-6">
                <button
                    className="bg-custom-blue w-full p-3 text-white font-bold rounded-lg hover:bg-custom-dark-blue transition-all flex items-center justify-center gap-2"
                    onClick={(e) => handleSubmit(e, "agregar")}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    Agregar
                </button>

                <button
                    className="bg-custom-yellow w-full p-3 text-white font-bold rounded-lg hover:bg-custom-dark-yellow transition-all flex items-center justify-center gap-2"
                    onClick={(e) => handleSubmit(e, "actualizar")}
                >
                    <FontAwesomeIcon icon={faPen} />
                    Actualizar
                </button>

                <button
                    className="bg-green-600 w-full p-3 text-white font-bold rounded-lg hover:bg-custom-dark-green transition-all flex items-center justify-center gap-2"
                    onClick={(e) => handleSubmit(e, "activar")}
                >
                    <FontAwesomeIcon icon={faCheck} />
                    Activar
                </button>

                <button
                    className="bg-custom-red w-full p-3 text-white font-bold rounded-lg hover:bg-custom-dark-red transition-all flex items-center justify-center gap-2"
                    onClick={(e) => handleSubmit(e, "desactivar")}
                >
                    <FontAwesomeIcon icon={faMinus} />
                    Desactivar
                </button>
            </div>
        </form>
    );
};
