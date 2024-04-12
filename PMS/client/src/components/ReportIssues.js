import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux'; 
const { TextArea } = Input;

const ReportIssuesTable = ({ issues }) => {
  const columns = [
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
    },
  ];

  return <Table dataSource={issues} columns={columns} />;
};

const ReportIssues = () => {
  const [issues, setIssues] = useState([]);
  const name = useSelector((state) => state.email.name);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await axios.get('http://localhost:3005/get-issues', {
        params: {
          name: name // Send the user's name as a query parameter
        }
      });
      setIssues(response.data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };
  

  const handleSubmit = async (values) => {
    try {
      const dataToSend = {
        ...values,
        name: name // Add the user's name to the data
      };
      const response = await axios.post('http://localhost:3005/report-issue', dataToSend);
      console.log('Issue reported successfully:', response.data);
      fetchIssues(); // Refresh the data after submitting
    } catch (error) {
      console.error('Error reporting issue:', error);
    }
  };

  return (
    <div>
      <h2 style={{ color: 'black', fontSize: '24px' }}>Report Issues</h2><br />
      <Form
        name="reportIssueForm"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          label="Subject"
          name="subject"
          rules={[{ required: true, message: 'Please input the subject!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Message"
          name="issue"
          rules={[{ required: true, message: 'Please input the message!' }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      
      {/* Display table of reported issues */}
      <ReportIssuesTable issues={issues} />
    </div>
  );
};

export default ReportIssues;
