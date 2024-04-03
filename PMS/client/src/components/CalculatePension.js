import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Typography, Input } from 'antd';

const { Title } = Typography;

const CalculatePension = () => {
  const email = useSelector((state) => state.email.email);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3005/get-enrolldata');
      const filteredData = response.data.filter(user => user.Email === email);
      setUserData(filteredData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculatePension = (age) => {
    return age > 60 ? 20000 : 10000;
  };

  return (
    <div style={{ margin: '20px' }}>
      <Title level={2} style={{ color: '#333' }}>Pension Details</Title>
      {userData.map(user => (
        <div key={user.ID} style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', color: '#333' }} htmlFor="name">Name:</label>
          <Input value={user.Name} readOnly style={{ marginBottom: '10px' }} />

          <label style={{ fontWeight: 'bold', color: '#333' }} htmlFor="email">Email:</label>
          <Input value={user.Email} readOnly style={{ marginBottom: '10px' }} />

          <label style={{ fontWeight: 'bold', color: '#333' }} htmlFor="age">Age:</label>
          <Input value={user.Age} readOnly style={{ marginBottom: '10px' }} />

          <label style={{ fontWeight: 'bold', color: '#333' }} htmlFor="salary">Salary:</label>
          <Input value={user.Salary} readOnly style={{ marginBottom: '10px' }} />

          <label style={{ fontWeight: 'bold', color: '#333' }} htmlFor="yearsOfService">Years of Service:</label>
          <Input value={user.Years_of_Service} readOnly style={{ marginBottom: '10px' }} />

          <label style={{ fontWeight: 'bold', color: '#333' }} htmlFor="pensionAmount">Pension Amount:</label>
          <Input value={calculatePension(user.Age)} readOnly style={{ marginBottom: '10px' }} />
        </div>
      ))}
    </div>
  );
};

export default CalculatePension;
