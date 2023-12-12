import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import PatientForm from './PatientForm/PatientForm';
import DecisionTree from './DecisionTree/DecisionTree';
import AdminPanel from './AdminPanel/AdminPanel';
import DoctorSelect from './DoctorSelect/DoctorSelect';
import './styles.css';

const App = () => {
  const [view, setView] = useState('patient'); // 'patient' або 'admin'
  const [diagnosisData, setDiagnosisData] = useState(null);
  const [answers, setAnswers] = useState({
    cough: null,
    fever: null,
    soreThroat: null,
  });
  const [selectedDoctor, setSelectedDoctor] = useState('');

  const handleDiagnose = (data) => {
    setDiagnosisData(data);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div className="container">
      <h1>Медичний Заклад - Додаток обслуговування пацієнтів</h1>
      {view === 'patient' && (
        <>
          <PatientForm onSubmit={handleDiagnose} />
          <DoctorSelect onSelect={handleDoctorSelect} />
          <DecisionTree answers={answers} selectedDoctor={selectedDoctor} />
        </>
      )}
      {view === 'admin' && <AdminPanel />}
      <div>
        <button onClick={() => setView('patient')}>Ввести дані пацієнта</button>
        <button onClick={() => setView('admin')}>Адміністраторська панель</button>
      </div>
    </div>
  );
};

export default App;
