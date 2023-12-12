import React from 'react';
import './DoctorSelect.css';

const DoctorSelect = ({ onSelect }) => {
  const doctors = ['Терапевт', 'Педіатр', 'Лор', 'Хірург', 'Гастроентеролог'];

  return (
    <div className="doctor-select-container">
      <label>
        Виберіть лікаря:
        <select onChange={(e) => onSelect(e.target.value)}>
          <option value="">Оберіть лікаря</option>
          {doctors.map((doctor, index) => (
            <option key={index} value={doctor}>
              {doctor}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default DoctorSelect;
