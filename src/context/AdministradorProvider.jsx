import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const AuthContext = createContext()

const AdministradorProvider = ({ children }) => {
    const location = useLocation()
    const [auth, setAuth] = useState({})
    const [administradores, setAdministradores] = useState([])
    const [administradorSeleccionado, setAdministradorSeleccionado] = useState(null)

    const perfil = async (token) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/perfil`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)

            setAuth(respuesta.data)
        } catch (error) {
            console.log(error);
        }
    }

    const listarAdministradores = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/administradores`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setAdministradores(respuesta.data, ...administradores)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            perfil(token)
            listarAdministradores()
        }
        setAdministradorSeleccionado(null)
    }, [location.pathname])


    return (
        <AuthContext.Provider value={
            {
                auth,
                setAuth,
                listarAdministradores,
                administradores,
                setAdministradores,
                administradorSeleccionado,
                setAdministradorSeleccionado
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}
export {
    AdministradorProvider
}
export default AuthContext