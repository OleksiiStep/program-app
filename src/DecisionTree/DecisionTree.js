import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DecisionTree = ({ answers, selectedDoctor }) => {
  const [diagnosis, setDiagnosis] = useState('Невідомий');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/diagnose', {
          symptoms: JSON.stringify(answers),
          doctor: selectedDoctor,
        });

        setDiagnosis(response.data.diagnosis || 'Невідомий');
      } catch (error) {
        console.error('Error fetching diagnosis:', error);
      }
    };

    fetchData();
  }, [answers, selectedDoctor]);

  return (
    <div>
      <h2>Дерево рішень для діагностики</h2>
      <p>Лікар: {selectedDoctor}</p>
      <p>Найвірогідніший діагноз: {diagnosis}</p>
    </div>
  );
};

export default DecisionTree;
