import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import AuthContext from '../context/AdministradorProvider'
import ImagenLogo from '../../public/images/logo_quito_transporte.png'
import ImagenPanecillo from '../../public/images/panecillo.jpg'
import axios from 'axios'

const Login = () => {

    const navigate = useNavigate()
    const { setAuth, listarAdministradores } = useContext(AuthContext)

    // Paso 1
    const [form, setForm] = useState({
        email: "",
        password: ""
    })


    // Paso 2

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // Paso 3
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/login`
            const respuesta = await axios.post(url, form)

            localStorage.setItem('token', respuesta.data.token)
            setAuth(respuesta.data)
            navigate('/dashboard')
            listarAdministradores()
            toast.success('Bienvenido')
        } catch (error) {
            toast.error(error.response.data.msg)
        }

    }

    return (
        <>
            <ToastContainer />
            <div className="w-1/2 h-screen)] 
            bg-no-repeat bg-cover sm:block hidden border-r-8 border-custom-blue"
                style={{ backgroundImage: `url(${ImagenPanecillo})` }}>
                <div className="h-screen justify-bottom items-end flex">
                    <img src="/public/images/FRANJA_TRAMA_02.png" />
                </div>
            </div>

            <div className="w-1/2 h-screen flex justify-center items-center">

                <div className="md:w-4/5 sm:w-full">

                    <img className="mx-auto flex justify-center items-center" src={ImagenLogo} />
                    <small className="text-gray-600 block my-4 text-lg">!Bienvenido de nuevo! Por favor ingrese sus credenciales</small>


                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="mb-2 block text-base font-semibold">Correo Electrónico</label>
                            <input type="email" placeholder="Ingrese su correo electrónico"
                                name='email'
                                value={form.email || ""} onChange={handleChange}
                                className="block w-full rounded-md border border-gray-300 focus:border-custom-light-blue focus:outline-none focus:ring-1 focus:ring-custom-light-blue py-1 px-2 text-gray-500" />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-base font-semibold">Contraseña</label>
                            <input type="password" placeholder="********************"
                                name='password'
                                value={form.password || ""} onChange={handleChange}
                                className="block w-full rounded-md border border-gray-300 focus:border-custom-light-blue focus:outline-none focus:ring-1 focus:ring-custom-light-blue py-1 px-2 text-gray-500" />
                        </div>

                        <div className="my-4">
                            <button className="py-2 w-full block text-center bg-custom-blue text-white font-bold text-xl rounded-xl hover:scale-105 duration-300 hover:bg-custom-red">Iniciar Sesión</button>
                        </div>

                    </form>


                </div>

            </div>

        </>

    )
}

export default Login