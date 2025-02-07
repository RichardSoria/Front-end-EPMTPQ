import { Navigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Mensaje from '../components/Alertas/Mensaje';
import { useNavigate } from "react-router-dom";

import AuthContext from '../context/AdministradorProvider';
import AdministradorIcon from "../assets/PRODUCCION.png"

const VisualizarAdministrador = () => {

    const { auth } = useContext(AuthContext)

    const { modal, handleModal, tratamientos, setTratamientos } = useContext(TratamientosContext)
    const navigate = useNavigate()
    const { id } = useParams()
    const [administrador, setadministrador] = useState({})
    const [mensaje, setMensaje] = useState({})


    useEffect(() => {
        const consultaradministrador = async () => {
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)

                setadministrador(respuesta.data)

            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultaradministrador()
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-custom-light-blue'>Visualizar Administrador</h1>
                <hr className='my-4 border-slate-500 border-t-2' />
                <p >Este submódulo te permite visualizar los datos del administrador</p>

            </div>
            <div>
                <>
                    <div className='mt-4 flex justify-between bg-slate-50 bg-opacity-50 shadow-2xl p-5'>
                        <div>
                            <p className="text-md mt-4">
                                <span className="text-gray-600 uppercase font-bold">* Nombre del Usuario: </span>
                                {administrador.nombre}
                            </p>
                            <p className="text-md text-gray-00 mt-4">
                                <span className="text-gray-600 uppercase font-bold">* Apellido del Usuario: </span>
                                {administrador.apellido}
                            </p>
                            <p className="text-md text-gray-00 mt-4">
                                <span className="text-gray-600 uppercase font-bold">* Email del Usuario: </span>
                                {administrador.email}
                            </p>
                            <p className="text-md text-gray-00 mt-4">
                                <span className="text-gray-600 uppercase font-bold">* Teléfono del Usuario: </span>
                                {administrador.telefono}
                            </p>
                            <p className="text-md text-gray-00 mt-4">
                                <span className="text-gray-600 uppercase font-bold">* Dirección del Usuario: </span>
                                {administrador.direccion}
                            </p>
                            <p className="text-md text-gray-00 mt-4">
                                <span className="text-gray-600 uppercase font-bold">* Fecha de creación del Usuario: </span>
                                {administrador.createdAt ? new Date(administrador.createdAt).toLocaleString("es-ES", { timeZone: "America/Guayaquil" }) : "No disponible"}
                            </p>
                            <p className="text-md text-gray-00 mt-4">
                                <span className="text-gray-600 uppercase font-bold">* Fecha de ultimá modificación del Usuario: </span>
                                {administrador.updatedAt ? new Date(administrador.updatedAt).toLocaleString("es-ES", { timeZone: "America/Guayaquil" }) : "No disponible"}
                            </p>
                            <p className="text-md text-gray-00 mt-4">
                                <span className="text-gray-600 uppercase font-bold">* Rol del usuario: </span>
                                Administrador
                            </p>
                            <p className="text-md text-gray-00 mt-4">
                                <span className="text-gray-600 uppercase font-bold">* Estado del Usuario: </span>
                                {administrador.status ? <span className="text-green-600 font-bold">Activo</span> : <span className="text-red-600 font-bold">Inactivo</span>}
                            </p>
                        </div>
                        <div class="flex items-center justify-center">
                            <img src={AdministradorIcon} width={350} />
                        </div>
                    </div>
                    <hr className='my-4 border-slate-500 border-t-2' />
                    <div className='flex justify-center'>
                        <button className='text-black font-bold bg-custom-yellow p-3 rounded-md text-center text-xl item hover:bg-custom-red hover:text-white' onClick={() => navigate("/dashboard")}>Regresar a la Gestión de Administradores</button>
                    </div>
                </>
            </div>
        </>

    )
}

export default VisualizarAdministrador