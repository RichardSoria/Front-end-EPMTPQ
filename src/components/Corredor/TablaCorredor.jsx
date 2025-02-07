import { useContext } from "react";
import { MdInfo } from "react-icons/md";

import Mensaje from "../Alertas/Mensaje";
import { useNavigate } from "react-router-dom";
import CorredorContext from "../../context/CorredorProvider";


const TablaCorredor = () => {

    const { corredores, setCorredorSeleccionado } = useContext(CorredorContext)
    const navigate = useNavigate()

    return (
        <>
            {
                corredores.length == 0
                    ?
                    <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                    :
                    <div className="overflow-x-auto">
                        <table className="min-w-full mt-5 table-auto shadow-2xl border-2 border-white">
                            <thead className="bg-custom-blue text-white">
                                <tr className="text-center">
                                    <th className="p-3">N°</th>
                                    <th className="p-3">Nombre del Corredor</th>
                                    <th className="p-3">Tipo de Servicio</th>
                                    <th className="p-3">Integración con Corredores</th>
                                    <th className="p-3">Integración con Alimentadores</th>
                                    <th className="p-3">Estado</th>
                                    <th className="p-3">Información</th>
                                </tr>
                            </thead>
                            <tbody>
                                {corredores.map((corredor, index) => (
                                    <tr
                                        key={corredor._id}
                                        className={`text-center border-t-2 border-b-2 font-bold hover:bg-blue-300 hover:text-blue-700 ${corredor.status ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"
                                            }`}
                                        onClick={() => setCorredorSeleccionado(corredor)}
                                    >
                                        <td className="p-2 border-2 border-white">{index + 1}</td>
                                        <td className="p-2 border-2 border-white">{corredor.nombre_corredor}</td>
                                        <td className="p-2 border-2 border-white">{corredor.tipo_servicio}</td>
                                        <td className="p-2 border-2 border-white">{corredor.integracion_corredor}</td>
                                        <td className="p-2 border-2 border-white">{corredor.integracion_alimentador}</td>
                                        <td className="p-2 border-2 border-white">
                                            <span>{corredor.status ? "Activo" : "Inactivo"}</span>
                                        </td>
                                        <td className="border-2 border-white">
                                            <MdInfo
                                                className="h-7 w-7 text-custom-light-blue cursor-pointer inline-block hover:text-black"
                                                onClick={() => navigate(`/dashboard/corredor/${corredor._id}`)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

            }
        </>

    )
}

export default TablaCorredor