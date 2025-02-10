import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import AuthContext from '../context/AdministradorProvider'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate();
    const { setAuth, listarAdministradores } = useContext(AuthContext);

    // Estado para los campos del formulario
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    // Función para actualizar los campos
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Validación de correo electrónico con regex
    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Manejo del envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones antes de enviar
        if (!form.email || !form.password) {
            toast.error('Todos los campos son obligatorios.');
            return;
        }

        if (!isValidEmail(form.email)) {
            toast.error('Ingrese un correo electrónico válido.');
            return;
        }

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/login`;
            const respuesta = await axios.post(url, form);

            // Guardar token y autenticar usuario
            localStorage.setItem('token', respuesta.data.token);
            setAuth(respuesta.data);
            listarAdministradores();
            toast.success('Bienvenido');
            navigate('/dashboard');

        } catch (error) {
            // Si el servidor responde con un error, mostrar mensaje adecuado
            if (error.response && error.response.data.msg) {
                toast.error(error.response.data.msg);
            } else {
                toast.error('Ocurrió un error al iniciar sesión.');
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="flex h-screen">
                {/* Imagen de fondo */}
                <div className="w-1/2 bg-no-repeat bg-cover hidden sm:block border-r-8 border-custom-blue"
                    style={{ backgroundImage: `url(/images/panecillo.jpg)` }}>
                    <div className="h-screen flex items-end">
                        <img src="/images/FRANJA_TRAMA_02.png" alt="Franja" />
                    </div>
                </div>

                {/* Formulario de Login */}
                <div className="w-full sm:w-1/2 flex justify-center items-center">
                    <div className="md:w-4/5 sm:w-full p-6">
                        <img className="mx-auto mb-4" src="/images/logo_quito_transporte.png" alt="Logo" />
                        <small className="text-gray-600 block text-lg">
                            ¡Bienvenido de nuevo! Por favor ingrese sus credenciales
                        </small>

                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="mb-3">
                                <label className="mb-2 block text-base font-semibold">Correo Electrónico</label>
                                <input type="email" name="email" placeholder="Ingrese su correo"
                                    value={form.email || ""} onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 py-2 px-3" />
                            </div>

                            <div className="mb-3">
                                <label className="mb-2 block text-base font-semibold">Contraseña</label>
                                <input type="password" name="password" placeholder="********************"
                                    value={form.password || ""} onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 py-2 px-3" />
                            </div>

                            <div className="mt-4">
                                <button type="submit"
                                    className="py-2 w-full bg-custom-blue text-white font-bold text-lg rounded-lg hover:scale-105 transition hover:bg-custom-red">
                                    Iniciar Sesión
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
