import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const RutaContext = createContext();

const RutaProvider = ({ children }) => {
    const location = useLocation();

    const [rutas, setRutas] = useState([]);
    const [rutaSeleccionada, setRutaSeleccionada] = useState(null);

    // Función para listar todas las rutas
    const listarRutas = async () => {
        try {
            const token = localStorage.getItem("token");
            const url = `${import.meta.env.VITE_BACKEND_URL}/rutas`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            setRutas(respuesta.data);
        } catch (error) {
            console.error("Error al listar rutas:", error);
        }
    };

    // Función para obtener detalles de una ruta
    const obtenerRuta = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const url = `${import.meta.env.VITE_BACKEND_URL}/rutas/${id}`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            setRutaSeleccionada(respuesta.data);
        } catch (error) {
            console.error(`Error al obtener la ruta con ID ${id}:`, error);
        }
    };

    // Función para registrar una nueva ruta
    const registrarRuta = async (ruta) => {
        try {
            const token = localStorage.getItem("token");
            const url = `${import.meta.env.VITE_BACKEND_URL}/rutas`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.post(url, ruta, options);
            setRutas([...rutas, respuesta.data.nuevaRuta]);
        } catch (error) {
            console.error("Error al registrar la ruta:", error);
        }
    };

    // Función para actualizar una ruta
    const actualizarRuta = async (id, rutaActualizada) => {
        try {
            const token = localStorage.getItem("token");
            const url = `${import.meta.env.VITE_BACKEND_URL}/rutas/${id}`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.put(url, rutaActualizada, options);
            setRutas(
                rutas.map((ruta) =>
                    ruta._id === id ? respuesta.data.rutaActualizada : ruta
                )
            );
        } catch (error) {
            console.error("Error al actualizar la ruta:", error);
        }
    };

    // Función para habilitar o deshabilitar una ruta
    const cambiarEstadoRuta = async (id, estado) => {
        try {
            const token = localStorage.getItem("token");
            const url = `${import.meta.env.VITE_BACKEND_URL}/rutas/${estado ? "habilitar" : "deshabilitar"}/${id}`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.put(url, {}, options);
            setRutas(
                rutas.map((ruta) =>
                    ruta._id === id ? respuesta.data.rutaActualizada : ruta
                )
            );
        } catch (error) {
            console.error(`Error al ${estado ? "habilitar" : "deshabilitar"} la ruta:`, error);
        }
    };

    // Cargar rutas al montar el componente
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            listarRutas();
        }
        // Reiniciar la ruta seleccionada al cambiar de ruta
        setRutaSeleccionada(null);
    }, [location.pathname]);

    return (
        <RutaContext.Provider
            value={{
                listarRutas,
                obtenerRuta,
                registrarRuta,
                actualizarRuta,
                cambiarEstadoRuta,
                rutas,
                setRutas,
                rutaSeleccionada,
                setRutaSeleccionada,
            }}
        >
            {children}
        </RutaContext.Provider>
    );
};

export { RutaProvider };
export default RutaContext;
