import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [patientData, setPatientData] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePatients = await axios.get('/api/patients');
        setPatientData(responsePatients.data);

        const responseDoctors = await axios.get('/api/doctors');
        setDoctors(responseDoctors.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDoctorSelect = async (doctorId) => {
    try {
      const response = await axios.get(`/api/patients?doctor=${doctorId}`);
      setPatientData(response.data);
    } catch (error) {
      console.error('Error fetching data for selected doctor:', error);
    }
  };

  return (
    <div className="admin-panel-container">
      <h2>Адміністраторська панель</h2>
      <label>
        Виберіть лікаря:
        <select className="doctor-select" onChange={(e) => handleDoctorSelect(e.target.value)}>
          <option value="">Всі лікарі</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor._id}>
              {doctor.name}
            </option>
          ))}
        </select>
      </label>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Ім'я пацієнта</th>
            <th>Вік</th>
            <th>Симптоми</th>
            <th>Діагноз</th>
            <th>Лікар</th>
          </tr>
        </thead>
        <tbody>
          {patientData.map((patient, index) => (
            <tr key={index}>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.symptoms}</td>
              <td>{patient.diagnosis}</td>
              <td>{patient.doctor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
