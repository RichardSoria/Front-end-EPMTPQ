import logoDog from '../assets/Quito-e-Galapagos-Basico-4.webp'
import {Link} from 'react-router-dom'


export const NotFound = () => {
    return (
        

        <div className="flex flex-col items-center justify-center">
            <img className="w-96 mx-auto mb-4" src="/public/images/logo_quito_transporte.png" />
            <img class="object-cover h-80 w-80 rounded-full border-4 border-solid border-custom-blue" src={logoDog} alt="image description"/>

            <div className="flex flex-col items-center justify-center">
                
                <p className="text-3xl md:text-4xl lg:text-5xl text-gray-600 mt-4">Página no encontrada</p>
                
                <p className="md:text-lg lg:text-xl text-gray-600 mt-8">Lo sentimos, la página que intentas acceder no existe.</p>
                
                <Link to="/login" className="py-2 w-full m-5 block text-center bg-custom-blue text-white font-bold text-lg rounded-xl hover:scale-105 duration-300 hover:bg-custom-red">Iniciar Sesión</Link>

            </div>
        </div>
    )
}
