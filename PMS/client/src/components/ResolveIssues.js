import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Input, Space } from 'antd';

const ResolveIssues = () => {
  const [issues, setIssues] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [solutionInput, setSolutionInput] = useState('');

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await axios.get('http://localhost:3005/get-issues2');
      setIssues(response.data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'Name',
      key: 'customer_name',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Message',
      dataIndex: 'issue',
      key: 'issue',
    },
    {
      title: 'Status',
      dataIndex: 'solution',
      key: 'solution',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Input
              value={solutionInput}
              onChange={(e) => setSolutionInput(e.target.value)}
            />
            <Button type="primary" onClick={() => handleUpdate(record)}>Submit</Button>
          </Space>
        ) : (
          <Button type="primary" onClick={() => setEditingKey(record.key)}>
            {record.solution === 'unresolved' ? 'Unresolved' : 'Resolved'}
          </Button>
        );
      },
    },
  ];

  const isEditing = (record) => record.key === editingKey;

  const handleUpdate = async (record) => {
    try {
      // Send a request to update the solution in the backend
      await axios.post('http://localhost:3005/update-solution', {
        key: record.key,
        solution: solutionInput,
        subject: record.subject,
        name: record.Name
      });
  
      // Update the issues data locally
      const updatedIssues = issues.map((item) =>
        item.key === record.key ? { ...item, solution: solutionInput } : item
      );
      setIssues(updatedIssues);
  
      // Reset editing key and solution input
      setEditingKey('');
      setSolutionInput('');
    } catch (error) {
      console.error('Error updating solution:', error);
    }
  };
  

  return (
    <div>
      <h2>Resolve Issues</h2>
      <Table dataSource={issues} columns={columns} />
    </div>
  );
};

export default ResolveIssues;
