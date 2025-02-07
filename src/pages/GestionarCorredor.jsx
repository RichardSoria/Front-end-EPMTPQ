import React from 'react'
import { FormularioCorredor } from '../components/Corredor/FormularioCorredor'
import TablaCorredor from '../components/Corredor/TablaCorredor'

const GestionarCorredor = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-custom-blue'>
                Gestionar Corredores de Transporte...
            </h1>
            <hr className='my-4 border-gray-400 border-t-2'/>
            <p>
                Este módulo permite la gestión de los Corredores de Transporte...
            </p>
            <div className="mt-8">
                <FormularioCorredor />
            </div>
            <div className="mt-8">
                <TablaCorredor />
            </div>
        </div>
    )
}

export default GestionarCorredor
