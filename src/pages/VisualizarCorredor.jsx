import { Navigate, useParams } from 'react-router-dom';
import { use, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AdministradorProvider';
import { useLocation } from 'react-router-dom';
import TablaParada from '../components/Parada/TablaParada';
import TablaRuta from '../components/Ruta/TablaRuta';
import ParadasContext from '../context/ParadaProvider';
import { FormularioParada } from '../components/Parada/FormularioParada';
import { FormularioRuta } from '../components/Ruta/FormularioRuta';

const VisualizarCorredor = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [corredor, setCorredor] = useState({});

    useEffect(() => {

        const consultarCorredor = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/corredor/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const respuesta = await axios.get(url, options);
                setCorredor(respuesta.data);
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false });
            }
        };
        consultarCorredor();

    }, []);

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-custom-light-blue'>Visualizar Corredor {corredor.nombre_corredor}</h1>
                <hr className='my-5 border-slate-500 border-t-2' />
                <p>Este submódulo te permite visualizar los datos del Corredor y gestionar sus paradas y rutas...</p>
            </div>
            <div className="my-5">
                <div className="grid grid-cols-3 gap-4 items-start">
                    <div className="p-5 shadow-2xl bg-slate-50 bg-opacity-50">
                        <p className="text-md text-gray-700">
                            <span className="text-black uppercase font-bold">Información General del Corredor</span>
                        </p>
                        <p className="text-md mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Nombre del Corredor: </span>
                            {corredor.nombre_corredor}
                        </p>
                        <p className="text-md mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Año de Inaguración del Corredor: </span>
                            {corredor.inaguracion_corredor?.split("T")[0] || "No disponible"}
                        </p>
                        <p className="text-md mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Integración con alimentadores: </span>
                            {corredor.integracion_alimentador}
                        </p>
                        <p className="text-md mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Integración con corredores: </span>
                            {corredor.integracion_corredor}
                        </p>
                        <p className="text-md mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Longitud del Corredor: </span>
                            {corredor.longitud_corredor}
                        </p>
                        <p className="text-md mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Tipo de Servicio del Corredor: </span>
                            {corredor.tipo_servicio}
                        </p>
                        <p className="text-md mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Demanda Diaria del Corredor: </span>
                            {corredor.demanda_diaria}
                        </p>
                        <p className="text-md mt-4">
                            <span className="text-black uppercase font-bold">Tipos de unidades del Corredor</span>
                        </p>
                        <p className="text-md mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Unidades de Trolebús: </span>
                            {corredor.vehiculos?.trolebus}
                        </p>
                        <p className="text-md mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Unidades de Biarticulados: </span>
                            {corredor.vehiculos?.biarticulados}
                        </p>
                        <p className="text-md mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Unidades de MB0500: </span>
                            {corredor.vehiculos?.mb0500}
                        </p>
                        <p className="text-md mt-4">
                            <span className="text-black uppercase font-bold">Tarifas del Corredor</span>
                        </p>
                        <p className="text-md mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Tarifa Normal: </span>
                            {`${corredor.tarifa?.normal} ctvs`}
                        </p>
                        <p className="text-md mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Tarifa Reducida: </span>
                            {`${corredor.tarifa?.reducida} ctvs`}
                        </p>
                        <p className="text-md mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Tarifa Preferencial: </span>
                            {`${corredor.tarifa?.preferencial} ctvs`}
                        </p>
                        <p className="text-md mt-4">
                            <span className="text-black uppercase font-bold">Historia del Corredor</span>
                        </p>
                        <p className="text-md text-justify mt-4">
                            {corredor.historia}
                        </p>
                        <p className="text-md mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Estado del Corredor: </span>
                            {corredor.status ? <span className="text-green-600 font-bold">Activo</span> : <span className="text-red-600 font-bold">Inactivo</span>}
                        </p>
                        <p className="text-md mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Fecha de creación: </span>
                            {corredor.createdAt ? new Date(corredor.createdAt).toLocaleString("es-ES", { timeZone: "America/Guayaquil" }) : "No disponible"}
                        </p>
                        <p className="text-md mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Fecha de última modificación: </span>
                            {corredor.updatedAt ? new Date(corredor.updatedAt).toLocaleString("es-ES", { timeZone: "America/Guayaquil" }) : "No disponible"}
                        </p>
                    </div>
                    <div className="p-4 shadow-2xl bg-slate-50 bg-opacity-50">
                        <p className="text-xl text-gray-700 text-center">
                            <span className="text-black uppercase font-bold">Paradas del Corredor</span>
                        </p>
                        <TablaParada />
                        <br />
                        <p className="text-xl text-gray-700 text-center">
                            <span className="text-black uppercase font-bold">Gestionar Parada</span>
                        </p>
                        <br />
                        <FormularioParada />
                    </div>
                    <div className="p-5 shadow-2xl bg-slate-50 bg-opacity-50">
                    <p className="text-xl text-gray-700 text-center">
                            <span className="text-black uppercase font-bold">Rutas del Corredor</span>
                        </p>
                        <TablaRuta />
                        <br />
                        <p className="text-xl text-gray-700 text-center">
                            <span className="text-black uppercase font-bold">Gestionar Ruta</span>
                        </p>
                        <br />
                        <FormularioRuta />
                    </div>
                </div>
            </div>
            <hr className='my-4 border-slate-500 border-t-2' />
            <div className='flex justify-center'>
                <button
                    className='text-black font-bold bg-custom-yellow p-3 rounded-md text-center text-xl hover:bg-custom-red hover:text-white'
                    onClick={() => navigate("/dashboard/gestionar-corredor")}
                >
                    Regresar a la Gestión de Corredores
                </button>
            </div>
        </>
    );
};

export default VisualizarCorredor;
