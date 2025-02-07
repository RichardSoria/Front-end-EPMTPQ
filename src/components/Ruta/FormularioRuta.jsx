import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // 🔹 Obtener el ID del corredor desde la URL
import RutaContext from "../../context/RutaProvider";
import Mensaje from "../Alertas/Mensaje";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export const FormularioRuta = () => {
    const { rutaSeleccionada, setRutaSeleccionada, listarRutas } = useContext(RutaContext);
    const { id: corredorId } = useParams(); // 🔹 Obtener el ID del corredor desde la URL
    const [mensaje, setMensaje] = useState({});
    const [form, setForm] = useState({
        nombre: "",
        recorrido: "",
        horario: "",
        sentido: "",
    });

    // ✅ Llenar el formulario automáticamente si hay una ruta seleccionada
    useEffect(() => {
        if (rutaSeleccionada) {
            setForm({
                nombre: rutaSeleccionada.nombre ?? "",
                recorrido: rutaSeleccionada.recorrido ?? "",
                horario: rutaSeleccionada.horario ?? "",
                sentido: rutaSeleccionada.sentido ?? "",
            });
        } else {
            resetForm();
        }
    }, [rutaSeleccionada]);

    const resetForm = () => {
        setForm({ nombre: "", recorrido: "", horario: "", sentido: "" });
        setRutaSeleccionada(null);
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

        if (!rutaSeleccionada && action !== "agregar") {
            setMensaje({ respuesta: "Seleccione una ruta para continuar.", tipo: false });
            setTimeout(() => setMensaje({}), 3000);
            return;
        }

        if (!confirm(`¿Está seguro de ${action} la ruta?`)) return;

        try {
            const token = localStorage.getItem("token");
            const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/ruta`;

            const headers = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } };

            const id = rutaSeleccionada?._id;

            console.log("🟢 ID del corredor obtenido de la URL:", corredorId); // 🔹 Verifica en la consola si el ID es correcto

            // ✅ Asegurar que el `corredor` se asigna correctamente
            const rutaData = {
                ...form,
                corredor: corredorId, // 🔹 Se asigna automáticamente el ID del corredor desde la URL
            };

            const endpoints = {
                agregar: { url: `${baseUrl}/registro`, method: "post" },
                actualizar: { url: `${baseUrl}/actualizar/${id}`, method: "put" },
                activar: { url: `${baseUrl}/habilitar/${id}`, method: "put" },
                desactivar: { url: `${baseUrl}/deshabilitar/${id}`, method: "put" },
            };

            await axios[endpoints[action].method](endpoints[action].url, rutaData, headers);

            listarRutas();
            resetForm();
            setMensaje({ respuesta: `Ruta "${form.nombre}" ${action} con éxito.`, tipo: true });
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

            {/* ✅ Campos del formulario con el ID de la ruta junto a "Horario" */}
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
                    <label htmlFor="recorrido" className="text-gray-700 uppercase font-bold text-sm">
                        Recorrido:
                    </label>
                    <input
                        id="recorrido"
                        type="text"
                        className="border-2 w-full p-3 mt-1 placeholder-gray-400 rounded-md focus:ring-2 focus:ring-custom-blue"
                        placeholder="Ingrese recorrido"
                        name="recorrido"
                        value={form.recorrido}
                        onChange={handleChange}
                    />
                </div>

                {/* 🔹 Horario y Sentido en la misma fila */}
                <div className="mb-4">
                    <label htmlFor="horario" className="text-gray-700 uppercase font-bold text-sm">
                        Horario:
                    </label>
                    <input
                        id="horario"
                        type="text"
                        className="border-2 w-full p-3 mt-1 placeholder-gray-400 rounded-md focus:ring-2 focus:ring-custom-blue"
                        placeholder="Ingrese horario"
                        name="horario"
                        value={form.horario}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="sentido" className="text-gray-700 uppercase font-bold text-sm">
                        Sentido:
                    </label>
                    <input
                        id="sentido"
                        type="text"
                        className="border-2 w-full p-3 mt-1 rounded-md focus:ring-2 focus:ring-custom-blue"
                        placeholder="Ingrese sentido"
                        name="sentido"
                        value={form.sentido}
                        onChange={handleChange}
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
