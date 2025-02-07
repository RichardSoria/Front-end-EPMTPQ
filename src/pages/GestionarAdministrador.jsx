import React, { useContext } from 'react';
import { FormularioAdministrador } from '../components/Administrador/FormularioAdministrador';
import TablaAdministrador from '../components/Administrador/TablaAdministrador';
import AuthContext from '../context/AdministradorProvider';
import { CardAdministrador } from '../components/Administrador/CardAdministrador';

const GestionarAdministrador = () => {

    const { auth } = useContext(AuthContext)

    return (
        <>
            <div>
                {
                    auth.rol === 'Administrador'
                        ? <h1 className='font-black text-4xl text-custom-light-blue'>Datos del Usuario</h1>
                        : <h1 className='font-black text-4xl text-custom-light-blue'>Gestionar Administradores</h1>
                }
                <hr className='my-4 border-gray-400 border-t-2' />
                {
                    auth.rol === 'Administrador'
                        ? <p>Este módulo te permite visualizar los datos de tu usuario...</p>
                        : <p>Este módulo permite la gestión de los usuarios Administradores...</p>
                }
            </div>
            {
                auth.rol === 'Administrador'
                    ? (<CardAdministrador />)
                    : (
                        <div className='flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap'>
                            <div className='w-full md:w-1/2'>
                                <FormularioAdministrador />
                            </div>
                            <div className='w-full md:w-1/2'>
                                <TablaAdministrador />
                            </div>
                        </div>
                    )
            }

        </>
    );
};

export default GestionarAdministrador;
