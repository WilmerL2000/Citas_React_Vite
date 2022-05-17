import { useState, useEffect } from 'react';
import Error from './Error';

function Form({ pacientes, setPacientes, paciente, setPaciente }) {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false);
    useEffect(() => {

        if (Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }

    }, [paciente])


    const generarId = () => {

        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);

        return random + fecha
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            setError(true)
            return;
        }

        setError(false)

        const objectPatient = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas,
        }

        if (paciente.id) {

            objectPatient.id = paciente.id;

            const pacientesActualizados = pacientes.map( pacienteState =>  pacienteState.id === paciente.id ? 
                objectPatient : pacienteState )
            
                setPacientes(pacientesActualizados);
                setPaciente({});

        } else {
            objectPatient.id = generarId();
            setPacientes([...pacientes, objectPatient]);

        }


        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span></p>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 ">
                {error && <Error mensaje='Todos los campos son obligatorios' />}
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase">Nombre Mascota</label>

                    <input id="mascota" type="text" placeholder="Nombre de mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        onChange={(e) => setNombre(e.target.value)} value={nombre} />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase">Propietario</label>

                    <input id="propietario" type="text" placeholder="Nombre del propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        onChange={(e) => setPropietario(e.target.value)} value={propietario} />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase">Email</label>

                    <input id="email" type="email" placeholder="email contacto propetario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>

                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase">Alta</label>

                    <input id="alta" type="date" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        onChange={(e) => setFecha(e.target.value)} value={fecha} />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase">Sintomas</label>
                    <textarea id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Escribe los sintomas"
                        onChange={(e) => setSintomas(e.target.value)} value={sintomas} />
                </div>

                <input type="submit" className="bg-indigo-600 w-full p-3 text-white font-bold uppercase hover:bg-indigo-700 cursor-pointer transition-shadow"
                    value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'} />
            </form>
        </div>
    )
}

export default Form