import { useContext } from "react";
import { useParams } from "react-router-dom";
import Mensaje from "../Alertas/Mensaje";
import RutaContext from "../../context/RutaProvider";

const TablaRuta = () => {
    const { rutas, setRutaSeleccionada } = useContext(RutaContext);
    const { id } = useParams(); // Obtener el id del corredor desde la URL

    // Filtrar rutas que pertenecen al corredor actual
    const rutasFiltradas = rutas.filter(ruta => ruta.corredor === id);

    return (
        <>
            {rutasFiltradas.length === 0 ? (
                <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full mt-5 table-auto shadow-2xl border-2 border-white">
                        <thead className="bg-custom-blue text-white">
                            <tr className="text-center">
                                <th className="p-3">N°</th>
                                <th className="p-3">Nombre</th>
                                <th className="p-3">Recorrido</th>
                                <th className="p-3">Sentido</th>
                                <th className="p-3">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rutasFiltradas.map((ruta, index) => (
                                <tr
                                    key={ruta._id}
                                    className={`text-center border-t-2 border-b-2 font-bold hover:bg-blue-300 hover:text-blue-700 ${
                                        ruta.estado ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"
                                    }`}
                                    onClick={() => setRutaSeleccionada(ruta)}
                                >
                                    <td className="p-2 border-2 border-white">{index + 1}</td>
                                    <td className="p-2 border-2 border-white">{ruta.nombre}</td>
                                    <td className="p-2 border-2 border-white">{ruta.recorrido}</td>
                                    <td className="p-2 border-2 border-white">{ruta.sentido}</td>
                                    <td className="p-2 border-2 border-white">
                                        <span>{ruta.estado ? "Activo" : "Inactivo"}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default TablaRuta;
