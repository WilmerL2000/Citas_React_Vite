import Patient from './Patient'

function PatientList({ pacientes, setPaciente, deletePatient }) {

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll ml-5">

      {pacientes && pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {''}
            <span className="text-indigo-600 font-bold">Pacientes y citas</span>
          </p>

          {pacientes.map(paciente => (
            <Patient
              key={paciente.id}
              paciente={paciente}
              setPaciente={setPaciente}
              deletePatient={deletePatient}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando {''}
            <span className="text-indigo-600 font-bold">Pacientes y citas</span>
          </p>
        </>
      )}


    </div>
  )
}

export default PatientList