import { useState, useEffect } from 'react';
import Header from "./components/Header"
import Form from "./components/Form"
import PatientList from "./components/PatientList"

function App() {

  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    const getLS = () => {
      const patientsLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      setPacientes(patientsLS)
    }

    getLS();
  }, [])

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes])

  const deletePatient = id => {
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id);
    setPacientes(pacientesActualizados);
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex lg:mt-0">
        <Form
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <PatientList
          pacientes={pacientes}
          setPaciente={setPaciente}
          deletePatient={deletePatient}
        />
      </div>
    </div>
  )
}

export default App
