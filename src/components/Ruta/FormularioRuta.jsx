import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Mensaje from "../Alertas/Mensaje";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import RutaContext from "../../context/RutaProvider";

export const FormularioRuta = () => {
    const { rutaSeleccionada, listarRutas } = useContext(RutaContext);
    const { id: corredorId } = useParams();

    const [mensaje, setMensaje] = useState({});
    const [form, setForm] = useState({
        nombre: "",
        recorrido: "",
        horario: "",
        sentido: "",
        _id: ""
    });

    useEffect(() => {
        if (rutaSeleccionada) {
            setForm(rutaSeleccionada);
        } else {
            resetForm();
        }
    }, [rutaSeleccionada]);

    const resetForm = () => {
        setForm({
            nombre: "",
            recorrido: "",
            horario: "",
            sentido: "",
            _id: ""
        });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAgregar = async (e) => {
        e.preventDefault();
        try {
            const confirmacion = window.confirm("¿Estás seguro de agregar esta ruta?");
            if (confirmacion) {
                const token = localStorage.getItem("token");
                const url = `${import.meta.env.VITE_BACKEND_URL}/ruta/registro`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };

                const formCrear = { ...form, corredor: corredorId };
                delete formCrear._id;

                await axios.post(url, formCrear, options);
                listarRutas();
                resetForm();
                setMensaje({ respuesta: "Ruta registrada con éxito.", tipo: true });
                setTimeout(() => setMensaje({}), 3000);
            }
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
            setTimeout(() => setMensaje({}), 3000);
        }
    };

    const handleActualizar = async (e) => {
        e.preventDefault();
        if (!rutaSeleccionada) {
            setMensaje({ respuesta: "Seleccione una ruta para actualizar.", tipo: false });
            setTimeout(() => setMensaje({}), 3000);
            return;
        }
        try {
            const confirmacion = window.confirm("¿Estás seguro de actualizar esta ruta?");
            if (confirmacion) {
                const token = localStorage.getItem("token");
                const url = `${import.meta.env.VITE_BACKEND_URL}/ruta/${rutaSeleccionada._id}`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios.put(url, form, options);
                listarRutas();
                resetForm();
                setMensaje({ respuesta: "Ruta actualizada con éxito.", tipo: true });
                setTimeout(() => setMensaje({}), 3000);
            }
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
            setTimeout(() => setMensaje({}), 3000);
        }
    };

    const handleActivar = async (e) => {
        e.preventDefault();
        if (!rutaSeleccionada) {
            setMensaje({ respuesta: "Seleccione una ruta para activar.", tipo: false });
        } else if (rutaSeleccionada.estado) {
            setMensaje({ respuesta: "La ruta ya está activada.", tipo: false });
        } else {
            const confirmacion = window.confirm("¿Estás seguro de activar esta ruta?");
            if (confirmacion) {
                try {
                    const token = localStorage.getItem("token");
                    const url = `${import.meta.env.VITE_BACKEND_URL}/ruta/habilitar/${rutaSeleccionada._id}`;
                    const options = {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    };
                    
                    await axios.put(url, {}, options);
                    listarRutas();
                    resetForm();
                    setMensaje({ respuesta: "Ruta activada con éxito.", tipo: true });
                } catch (error) {
                    setMensaje({ respuesta: error.response.data.msg, tipo: false });
                }
            }
        }
        setTimeout(() => setMensaje({}), 3000);
    };

    const handleDesactivar = async (e) => {
        e.preventDefault();
        if (!rutaSeleccionada) {
            setMensaje({ respuesta: "Seleccione una ruta para deshabilitar.", tipo: false });
        } else if (!rutaSeleccionada.estado) {
            setMensaje({ respuesta: "La ruta ya está desactivada.", tipo: false });
        } else {
            const confirmacion = window.confirm("¿Estás seguro de deshabilitar esta ruta?");
            if (confirmacion) {
                try {
                    const token = localStorage.getItem("token");
                    const url = `${import.meta.env.VITE_BACKEND_URL}/ruta/deshabilitar/${rutaSeleccionada._id}`;
                    const options = {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    };
                    await axios.put(url, {}, options);
                    listarRutas();
                    resetForm();
                    setMensaje({ respuesta: "Ruta deshabilitada con éxito.", tipo: true });
                } catch (error) {
                    setMensaje({ respuesta: error.response.data.msg, tipo: false });
                }
            }
        }
        setTimeout(() => setMensaje({}), 3000);
    };

    return (
        <form className="shadow-2xl rounded-lg p-6 bg-white max-w-2xl mx-auto">
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="text-gray-700 uppercase font-bold text-sm">Nombre:</label>
                    <input type="text" className="border-2 w-full p-3 mt-1 rounded-md" name="nombre" value={form.nombre} onChange={handleChange} />
                </div>

                <div className="mb-4">
                    <label className="text-gray-700 uppercase font-bold text-sm">Recorrido:</label>
                    <input type="text" className="border-2 w-full p-3 mt-1 rounded-md" name="recorrido" value={form.recorrido} onChange={handleChange} />
                </div>

                <div className="mb-4">
                    <label className="text-gray-700 uppercase font-bold text-sm">Horario:</label>
                    <input type="text" className="border-2 w-full p-3 mt-1 rounded-md" name="horario" value={form.horario} onChange={handleChange} />
                </div>

                <div className="mb-4">
                    <label className="text-gray-700 uppercase font-bold text-sm">Sentido:</label>
                    <input type="text" className="border-2 w-full p-3 mt-1 rounded-md" name="sentido" value={form.sentido} onChange={handleChange} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
                <button onClick={handleAgregar} className="bg-blue-600 text-white p-3 rounded-lg"><FontAwesomeIcon icon={faPlus} /> Agregar</button>
                <button onClick={handleActualizar} className="bg-yellow-500 text-white p-3 rounded-lg"><FontAwesomeIcon icon={faPen} /> Actualizar</button>
                <button onClick={handleActivar} className="bg-green-600 text-white p-3 rounded-lg"><FontAwesomeIcon icon={faCheck} /> Activar</button>
                <button onClick={handleDesactivar} className="bg-red-600 text-white p-3 rounded-lg"><FontAwesomeIcon icon={faMinus} /> Desactivar</button>
            </div>
        </form>
    );
};
