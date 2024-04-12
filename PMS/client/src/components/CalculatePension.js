import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Typography, List, Card, Avatar } from 'antd';

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
      <Title level={2} style={{ color: '#008080' }}>Pension Details</Title>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={userData}
        loading={loading}
        renderItem={user => (
          <List.Item>
            <Card
              title={user.Name}
              extra={<span style={{ color: '#008080' }}>Age: {user.Age}</span>}
              style={{ width: 300, backgroundColor: '#f0f5f5' }}
            >
              <p><strong>Email:</strong> {user.Email}</p>
              <p><strong>Salary:</strong> {user.Salary}</p>
              <p><strong>Years of Service:</strong> {user.Years_of_Service}</p>
              <p><strong>Pension Amount:</strong> {calculatePension(user.Age)}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CalculatePension;
