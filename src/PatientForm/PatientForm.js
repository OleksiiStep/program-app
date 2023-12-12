import React, { useState } from 'react';
import axios from 'axios';
import DoctorSelect from '../DoctorSelect/DoctorSelect';

const PatientForm = ({ onSubmit }) => {
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    symptoms: '',
  });

  const [answers, setAnswers] = useState({
    cough: null,
    fever: null,
    soreThroat: null,
  });

  const [selectedDoctor, setSelectedDoctor] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAnswer = (question, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [question]: answer }));
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDoctor) {
      alert('Будь ласка, оберіть лікаря');
      return;
    }

    try {
      const response = await axios.post('/api/patients', {
        name: patientData.name,
        age: patientData.age,
        symptoms: patientData.symptoms,
        diagnosis: 'Невідомий',
        doctor: selectedDoctor,
      });

      setPatientData({
        name: '',
        age: '',
        symptoms: '',
      });

      onSubmit(response.data);
    } catch (error) {
      console.error('Error saving patient data:', error);
    }
  };

  return (
    <div>
      <h2>Введення даних пацієнта та опитування</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Ім'я:
          <input type="text" name="name" value={patientData.name} onChange={handleChange} />
        </label>
        <label>
          Вік:
          <input type="text" name="age" value={patientData.age} onChange={handleChange} />
        </label>
        <label>
          Симптоми:
          <textarea name="symptoms" value={patientData.symptoms} onChange={handleChange} />
        </label>
        <DoctorSelect onSelect={handleDoctorSelect} />
        <div>
          <h3>Опитування</h3>
          {/* Додайте кнопки для вибору відповідей */}
        </div>
        <button type="submit">Діагностикувати</button>
      </form>
    </div>
  );
};

export default PatientForm;
