import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';

const MaturityDateAdmin = () => {
  const [maturityData, setMaturityData] = useState([]);

  useEffect(() => {
    fetchMaturityData();
  }, []);

  const fetchMaturityData = async () => {
    try {
      const response = await axios.get('http://localhost:3005/get-maturity-data2');
      setMaturityData(response.data);
    } catch (error) {
      console.error('Error fetching maturity data:', error);
    }
  };

  const handleApprovalStatusChange = async (record) => {
    try {
      const updatedStatus = record.approval_status === 'not approved' ? 'Approved' : 'not approved';
      const updatedData = maturityData.map(item => {
        if (item.amount === record.amount) {
          return {
            ...item,
            approval_status: updatedStatus
          };
        }
        return item;
      });
      setMaturityData(updatedData);

      // Send POST request to update the column in the backend
      await axios.post('http://localhost:3005/update-approval-status2', {
        name: record.name,
        amount: record.amount,
        approval_status: updatedStatus
      });
    } catch (error) {
      console.error('Error updating approval status:', error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
      key: 'plan',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Approval Status',
      dataIndex: 'approval_status',
      key: 'approval_status',
      render: (text, record) => (
        <Button onClick={() => handleApprovalStatusChange(record)}>
          {text}
        </Button>
      )
    },
  ];

  return (
    <div>
      <h2>Maturity Date Admin</h2>
      <Table dataSource={maturityData} columns={columns} />
    </div>
  );
};

export default MaturityDateAdmin;
