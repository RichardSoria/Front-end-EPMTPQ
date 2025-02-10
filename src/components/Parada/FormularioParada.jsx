import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Mensaje from "../Alertas/Mensaje";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import ParadaContext from "../../context/ParadaProvider";

export const FormularioParada = () => {
    const { paradaSeleccionada, listarParadas } = useContext(ParadaContext);
    const { id: corredorId } = useParams();

    const [mensaje, setMensaje] = useState({});
    const [form, setForm] = useState({
        nombre: "",
        tipo: "",
        ubicacion: "",
        _id: ""
    });

    useEffect(() => {
        if (paradaSeleccionada) {
            setForm(paradaSeleccionada);
        } else {
            resetForm();
        }
    }, [paradaSeleccionada]);

    const resetForm = () => {
        setForm({
            nombre: "",
            tipo: "",
            ubicacion: "",
            _id: ""
        });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAgregar = async (e) => {
        e.preventDefault();
        try {
            const confirmacion = window.confirm("¿Estás seguro de agregar esta parada?");
            if (confirmacion) {
                const token = localStorage.getItem("token");
                const url = `${import.meta.env.VITE_BACKEND_URL}/parada/registro`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };

                const formCrear = { ...form, corredor: corredorId };
                delete formCrear._id;

                await axios.post(url, formCrear, options);
                listarParadas();
                resetForm();
                setMensaje({ respuesta: "Parada registrada con éxito.", tipo: true });
                setTimeout(() => setMensaje({}), 3000);
            }
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
            setTimeout(() => setMensaje({}), 3000);
        }
    };

    const handleActualizar = async (e) => {
        e.preventDefault();
        if (!paradaSeleccionada) {
            setMensaje({ respuesta: "Seleccione una parada para actualizar.", tipo: false });
            setTimeout(() => setMensaje({}), 3000);
            return;
        }
        try {
            const confirmacion = window.confirm("¿Estás seguro de actualizar esta parada?");
            if (confirmacion) {
                const token = localStorage.getItem("token");
                const url = `${import.meta.env.VITE_BACKEND_URL}/parada/${paradaSeleccionada._id}`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios.put(url, form, options);
                listarParadas();
                resetForm();
                setMensaje({ respuesta: "Parada actualizada con éxito.", tipo: true });
                setTimeout(() => setMensaje({}), 3000);
            }
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
            setTimeout(() => setMensaje({}), 3000);
        }
    };

    const handleActivar = async (e) => {
        e.preventDefault();
        if (!paradaSeleccionada) {
            setMensaje({ respuesta: "Seleccione una parada para activar.", tipo: false });
        } else if (paradaSeleccionada.status) {
            setMensaje({ respuesta: "La parada ya está activada.", tipo: false });
        } else {
            const confirmacion = window.confirm("¿Estás seguro de activar esta parada?");
            if (confirmacion) {
                try {
                    const token = localStorage.getItem("token");
                    const url = `${import.meta.env.VITE_BACKEND_URL}/parada/habilitar/${paradaSeleccionada._id}`;
                    const options = {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    };
                    
                    await axios.put(url, {}, options);
                    listarParadas();
                    resetForm();
                    setMensaje({ respuesta: "Parada activada con éxito.", tipo: true });
                } catch (error) {
                    setMensaje({ respuesta: error.response.data.msg, tipo: false });
                }
            }
        }
        setTimeout(() => setMensaje({}), 3000);
    };

    const handleDesactivar = async (e) => {
        e.preventDefault();
        if (!paradaSeleccionada) {
            setMensaje({ respuesta: "Seleccione una parada para deshabilitar.", tipo: false });
        } else if (!paradaSeleccionada.status) {
            setMensaje({ respuesta: "La parada ya está desactivada.", tipo: false });
        } else {
            const confirmacion = window.confirm("¿Estás seguro de deshabilitar esta parada?");
            if (confirmacion) {
                try {
                    const token = localStorage.getItem("token");
                    const url = `${import.meta.env.VITE_BACKEND_URL}/parada/deshabilitar/${paradaSeleccionada._id}`;
                    const options = {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    };
                    await axios.put(url, {}, options);
                    listarParadas();
                    resetForm();
                    setMensaje({ respuesta: "Parada deshabilitada con éxito.", tipo: true });
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
                    <input type="text" className="border-2 w-full p-3 mt-1 rounded-md" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre de la parada"/>
                </div>

                <div className="mb-4">
                    <label className="text-gray-700 uppercase font-bold text-sm">Tipo:</label>
                    <input type="text" className="border-2 w-full p-3 mt-1 rounded-md" name="tipo" value={form.tipo} onChange={handleChange} placeholder="Tipo de parada"/>
                </div>

                <div className="mb-4">
                    <label className="text-gray-700 uppercase font-bold text-sm">Ubicación:</label>
                    <input type="text" className="border-2 w-full p-3 mt-1 rounded-md" name="ubicacion" value={form.ubicacion} onChange={handleChange} placeholder="Ubicación de la parada"/>
                </div>

                <div className="mb-4">
                    <label className="text-gray-700 uppercase font-bold text-sm">ID de Parada:</label>
                    <input type="text" className="border-2 w-full p-3 mt-1 rounded-md bg-gray-200 text-gray-500 cursor-not-allowed" name="_id" value={form._id} onChange={handleChange} readOnly placeholder="ID de la parada"/>
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
