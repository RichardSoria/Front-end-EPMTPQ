import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ParadaContext = createContext();

const ParadaProvider = ({ children }) => {
    const location = useLocation();

    const [paradas, setParadas] = useState([]);
    const [paradaSeleccionada, setParadaSeleccionada] = useState(null);

    const listarParadas = async () => {
        try {
            const token = localStorage.getItem("token");
            const url = `${import.meta.env.VITE_BACKEND_URL}/paradas`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            setParadas(respuesta.data);
        } catch (error) {
            console.error("Error al listar paradas:", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            listarParadas();
        }
        // Reiniciar la parada seleccionada al cambiar de ruta
        setParadaSeleccionada(null);
    }, [location.pathname]);

    return (
        <ParadaContext.Provider
            value={{
                listarParadas,
                paradas,
                setParadas,
                paradaSeleccionada,
                setParadaSeleccionada,
            }}
        >
            {children}
        </ParadaContext.Provider>
    );
};

export { ParadaProvider };
export default ParadaContext;