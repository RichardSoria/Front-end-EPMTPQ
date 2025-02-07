import { useState, useEffect, useContext } from "react"
import axios from 'axios';
import Mensaje from "../Alertas/Mensaje";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserPen, faUserCheck, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import AuthContext from "../../context/AdministradorProvider";


export const FormularioAdministrador = () => {

    const { administradorSeleccionado, listarAdministradores } = useContext(AuthContext)

    const [mensaje, setMensaje] = useState({});

    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        telefono: '',
        email: '',
    });


    // Llenar el formulario automáticamente cuando cambie el administrador seleccionado
    useEffect(() => {
        if (administradorSeleccionado) {
            setForm(administradorSeleccionado);
        } else {
            resetForm();
        }
    }, [administradorSeleccionado]);

    const resetForm = () => {
        setForm({
            nombre: '',
            apellido: '',
            direccion: '',
            telefono: '',
            email: '',
        })
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAgregar = async (e) => {
        e.preventDefault()
        try {
            const confirmacion = window.confirm('¿Estas seguro de agregar este usuario?')
            if (confirmacion) {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/registro`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const formCrear = { ...form }
                delete formCrear._id

                await axios.post(url, formCrear, options)
                listarAdministradores()
                resetForm()
                setMensaje({ respuesta: "Usuario administrador registrado con exito y correo enviado.", tipo: true })
                setTimeout(() => {
                    setMensaje({})
                }, 3000);
            }
        } catch (error) {
            console.log(error)
            setMensaje({ respuesta: error.response.data.msg, tipo: false })
            setTimeout(() => {
                setMensaje({})
            }, 3000);
        }
    }

    const handleActualizar = async (e) => {
        e.preventDefault()
        try {
            if (!administradorSeleccionado){
                setMensaje({ respuesta: "Seleccione un usuario para actualizar", tipo: false })
                setTimeout(() => {
                    setMensaje({})
                }, 3000);
            }
            else{
                const confirmacion = window.confirm('¿Estas seguro de actualizar este usuario?')
                if (confirmacion) {
                    const token = localStorage.getItem('token')
                    const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/${administradorSeleccionado._id}`
                    const options = {
                        headers: {
                            method: 'PUT',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                    await axios.put(url, form, options)
                    listarAdministradores()
                    resetForm()
                    setMensaje({ respuesta: "Usuario administrador actualizado con exito.", tipo: true })
                    setTimeout(() => {
                        setMensaje({})
                    }, 3000);
                }
            }
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false })
            setTimeout(() => {
                setMensaje({})
            }, 3000);
        }
    }

    const handleHabilitar = async (e) => {
        e.preventDefault()
        try {
            if (!administradorSeleccionado){
                setMensaje({ respuesta: "Seleccione un usuario para habilitar", tipo: false })
                setTimeout(() => {
                    setMensaje({})
                }, 3000);
            } else if (administradorSeleccionado.status) {
                setMensaje({ respuesta: "El usuario ya se encuentra habilitado", tipo: false })
                setTimeout(() => {
                    setMensaje({})
                }, 3000);
            }
            else{
                const confirmacion = window.confirm('¿Estas seguro de habilitar este usuario?')
                if (confirmacion) {
                    const token = localStorage.getItem('token')
                    const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/habilitar/${administradorSeleccionado._id}`
                    const options = {
                        headers: {
                            method: 'PUT',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                    await axios.put(url, {}, options)
                    listarAdministradores()
                    resetForm()
                    setMensaje({ respuesta: "Usuario administrador habilitado con exito.", tipo: true })
                    setTimeout(() => {
                        setMensaje({})
                    }, 3000);
                }
            }
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false })
            setTimeout(() => {
                setMensaje({})
            }, 3000);
        }
    }

    const handleDesactivar = async (e) => {
        e.preventDefault()
        try {
            if (!administradorSeleccionado){
                setMensaje({ respuesta: "Seleccione un usuario para deshabilitar", tipo: false })
                setTimeout(() => {
                    setMensaje({})
                }, 3000);
            } else if (!administradorSeleccionado.status) {
                setMensaje({ respuesta: "El usuario ya se encuentra deshabilitado", tipo: false })
                setTimeout(() => {
                    setMensaje({})
                }, 3000);
            }
            else{
                const confirmacion = window.confirm('¿Estas seguro de deshabilitar este usuario?')
                if (confirmacion) {
                    const token = localStorage.getItem('token')
                    const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/deshabilitar/${administradorSeleccionado._id}`
                    const options = {
                        headers: {
                            method: 'PUT',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                    await axios.put(url, {}, options)
                    listarAdministradores()
                    resetForm()
                    setMensaje({ respuesta: "Usuario administrador deshabilitado con exito.", tipo: true })
                    setTimeout(() => {
                        setMensaje({})
                    }, 3000);
                }
            }
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false })
            setTimeout(() => {
                setMensaje({})
            }, 3000);
        }
    }



    return (

        <form className='shadow-2xl rounded-lg p-10'>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                <label
                    htmlFor='nombre:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del usuario: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Nombre del usuario'
                    name='nombre'
                    value={form.nombre}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='apellido:'
                    className='text-gray-700 uppercase font-bold text-sm'>Apellido del usuario: </label>
                <input
                    id='apellido'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Apellido del usuario'
                    name='apellido'
                    value={form.apellido}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='direccion:'
                    className='text-gray-700 uppercase font-bold text-sm'>Dirreción del usuario: </label>
                <input
                    id='direccion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Dirreción del usuario'
                    name='direccion'
                    value={form.direccion}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='telefono:'
                    className='text-gray-700 uppercase font-bold text-sm'>Número celular del usuario: </label>
                <input
                    id='telefono'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Número celular del usuario'
                    name='telefono'
                    value={form.telefono}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='email:'
                    className='text-gray-700 uppercase font-bold text-sm'>Email del usuario: </label>
                <input
                    id='email'
                    type="email"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Email del usuario'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                />
            </div>

            <div className='flex justify-between gap-4'>

                <button className="bg-custom-light-blue w-full p-3 text-white  font-bold rounded-lg 
                    hover:bg-custom-red cursor-pointer transition-all flex items-center justify-center gap-2"
                    onClick={handleAgregar}>
                    <FontAwesomeIcon icon={faUserPlus} />
                    Agregar Usuario
                </button>

                <button className="bg-custom-yellow w-full p-3 text-white  font-bold rounded-lg
                    hover:bg-custom-red cursor-pointer transition-all flex items-center justify-center gap-2"
                    onClick={handleActualizar}>
                    <FontAwesomeIcon icon={faUserPen} />
                    Actualizar Usuario
                </button>

                <button className="bg-green-600 w-full p-3 text-white  font-bold rounded-lg
                    hover:bg-custom-red cursor-pointer transition-all flex items-center justify-center gap-2"
                    onClick={handleHabilitar}>
                    <FontAwesomeIcon icon={faUserCheck} />
                    Activar Usuario
                </button>

                <button className="bg-custom-blue w-full p-3 text-white  font-bold rounded-lg
                    hover:bg-custom-red cursor-pointer transition-all flex items-center justify-center gap-2"
                    onClick={handleDesactivar}>
                    <FontAwesomeIcon icon={faUserMinus} />
                    Deshabilitar Usuario
                </button>


            </div>

        </form>
    )
}