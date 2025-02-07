import { useContext } from "react"
import AuthContext from "../../context/AdministradorProvider"
import AdministradorIcon from "../../assets/PRODUCCION.png"


export const CardAdministrador = () => {
    const { auth } = useContext(AuthContext)

    return (
            <>
                <div className='p-2 flex  justify-between'>
                    <div>
                        <p className="text-md mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Nombre del Usuario: </span>
                            {auth.nombre}
                        </p>
                        <p className="text-md text-gray-00 mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Apellido del Usuario: </span>
                            {auth.apellido}
                        </p>
                        <p className="text-md text-gray-00 mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Email del Usuario: </span>
                            {auth.email}
                        </p>
                        <p className="text-md text-gray-00 mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Teléfono del Usuario: </span>
                            {auth.telefono}
                        </p>
                        <p className="text-md text-gray-00 mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Dirección del Usuario: </span>
                            {auth.direccion}
                        </p>
                        <p className="text-md text-gray-00 mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Rol del usuario: </span>
                            {auth.rol}
                        </p>
                        <p className="text-md text-gray-00 mt-4">
                            <span className="text-gray-600 uppercase font-bold">* Estado del Usuario: </span>
                            {auth.status ? "Activo" : "nactivo"}
                        </p>
                    </div>
                    <div className="flex items-center justify-center">
                        <img src={AdministradorIcon} width={300}/>
                    </div>
                    
                </div>
                <hr className='border-slate-500 border-t-2' />
            </>
    )
}
