import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Input, Form, Modal } from 'antd'; // Import components from Ant Design

export default function ResolveIssues() {
  const [issues, setIssues] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentRecord, setCurrentRecord] = useState(null);

  const fetchIssues = async () => {
    try {
      const response = await axios.get('http://localhost:3005/get-issues2');
      setIssues(response.data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleButtonClick = (record) => {
    setCurrentRecord(record);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      // Make a POST request to update the solution
      await axios.post('http://localhost:3005/update-solution', {
        subject: currentRecord.subject,
        name: currentRecord.Name,
        solution: inputValue,
      });

      // Update the local state to reflect the change
      const updatedIssues = issues.map(issue => {
        if (issue.subject === currentRecord.subject) {
          return { ...issue, solution: inputValue };
        }
        return issue;
      });
      setIssues(updatedIssues);

      setShowModal(false);
      setInputValue('');
    } catch (error) {
      console.error('Error updating solution:', error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setInputValue('');
    setCurrentRecord(null);
  };

  return (
    <div>
   <h1 style={{ color: 'black' }}>Resolve Issues</h1>

      <Table
        dataSource={issues}
        columns={[
          {
            title: 'Customer Name',
            dataIndex: 'Name',
            key: 'Name',
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
            title: 'Solution',
            key: 'solution',
            render: (text, record) => (
              record.solution === 'unresolved' ? (
                <Button type="primary" onClick={() => handleButtonClick(record)}>
                  Resolve
                </Button>
              ) : (
                <span>{record.solution}</span>
              )
            ),
          },
        ]}
      />
      <Modal
        title="Enter Solution"
        visible={showModal}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form onFinish={handleSubmit}>
          <Form.Item name="solution">
            <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
