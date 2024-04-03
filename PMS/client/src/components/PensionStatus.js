import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';

const PensionStatus = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3005/get-enrolldata2');
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleApproval = async (record) => {
    try {
      console.log("User approved:", record.ID);

      // Update the approval status in the local state immediately
      const updatedUserData = userData.map(user => {
        if (user.Name === record.Name && user.WithdrawalAmount === record.WithdrawalAmount) {
          return { ...user, WithdrawStatus: 'Approved' }; // Update the WithdrawStatus
        }
        return user;
      });
      setUserData(updatedUserData);

      // Update the approval status and withdrawal amount in the backend
      await axios.post('http://localhost:3005/update-approval-status', { 
        userName: record.Name, 
        amount: record.WithdrawalAmount,
        status: 'Approved',
      });
    } catch (error) {
      console.error('Error updating approval status:', error);
    }
  };

  const columns = [
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'email',
    },
    {
      title: 'User Type',
      dataIndex: 'UserType',
      key: 'userType',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'name',
    },
    {
      title: 'Withdrawal Amount',
      dataIndex: 'WithdrawalAmount',
      key: 'withdrawalAmount',
    },
    {
      title: 'Withdrawal Status',
      dataIndex: 'WithdrawStatus',
      key: 'withdrawalStatus',
      render: (text, record) => (
        <Button
          type={record.WithdrawStatus === 'Not Approved' ? 'primary' : 'default'}
          onClick={() => handleApproval(record)}
          disabled={record.WithdrawStatus === 'Approved'} // Disable button if already approved
        >
          {record.WithdrawStatus}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Pension Status</h1>
      <Table columns={columns} dataSource={userData} loading={loading} />
    </div>
  );
};

export default PensionStatus;
