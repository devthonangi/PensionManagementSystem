import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

const ViewBalance = () => {
  const email = useSelector((state) => state.email.email);
  const [enrollmentBalance, setEnrollmentBalance] = useState(0);
  const [withdrawalBalance, setWithdrawalBalance] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);

  useEffect(() => {
    fetchEnrollmentBalance();
    fetchWithdrawalBalance();
  }, []);

  const fetchEnrollmentBalance = async () => {
    try {
      const response2 = await axios.get('http://localhost:3005/get-balance', {
        params: {
          email: email
        }
      });
      console.log('Enrollment Balance Response:', response2.data); // Log response data
      setEnrollmentBalance(response2.data.pension_amount || 0);
    } catch (error) {
      console.error('Error fetching enrollment balance:', error);
    }
  };

  const fetchWithdrawalBalance = async () => {
    try {
      const response = await axios.get('http://localhost:3005/get-withdrawaldata2', {
        params: {
          email: email
        }
      });
      console.log('Withdrawal Balance Response:', response.data.totalWithdrawalAmount); // Log response data
      const totalWithdrawalAmount = response.data.totalWithdrawalAmount || 0;
      setWithdrawalBalance(totalWithdrawalAmount);
    } catch (error) {
      console.error('Error fetching withdrawal balance:', error);
    }
  };

  useEffect(() => {
    const calculateRemainingBalance = () => {
      setRemainingBalance(enrollmentBalance - withdrawalBalance);
    };

    calculateRemainingBalance();
  }, [enrollmentBalance, withdrawalBalance]);

  return (
    <Card title={<Title level={2}>View Balance</Title>} style={{ width: '400px', margin: 'auto', marginTop: '20px' }}>
      <div>
        <Text strong>Enrollment Balance:</Text> <Text>{enrollmentBalance}</Text>
        <br />
        <Text strong>Withdrawal Balance:</Text> <Text>{withdrawalBalance}</Text>
        <br />
        <Text strong>Remaining Balance:</Text> <Text>{remainingBalance}</Text>
      </div>
    </Card>
  );
};

export default ViewBalance;
