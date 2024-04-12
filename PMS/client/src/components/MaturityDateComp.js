import React, { useState, useEffect } from 'react';
import { Table, Form, Input, Button, Select } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { Option } = Select;

const MaturityDateComp = () => {
  const [maturityData, setMaturityData] = useState([]);
  const [maturityData2, setMaturityData2] = useState([]);
  const [form] = Form.useForm()
  const [name, setName] = useState('');
  const [displayForm, setDisplayForm] = useState(true);
  const name2 = useSelector((state) => state.email.name);
  const [pensionAmount, setPensionAmount] = useState(null);

  useEffect(() => {
    getName(); // Fetch the name before fetching maturity data
    fetchMaturityData();
    fetchMaturityData2();
    fetchPensionAmount(name2); // Fetch pension amount
  }, []);

  const getName = async () => {
    try {
      const response = await axios.get('http://localhost:3005/get-name', {
        params: { name: name2 }
      });
      const count = response.data.count;
      setName(response.data.name);
      if (count > 0) {
        setDisplayForm(false);
      }
    } catch (error) {
      console.error('Error fetching name:', error);
    }
  };

  const fetchPensionAmount = async (name) => {
    try {
      const response = await axios.get('http://localhost:3005/get-pension-amount', {
        params: { name: name2 }
      });
      setPensionAmount(response.data.pensionAmount);
    } catch (error) {
      console.error('Error fetching pension amount:', error);
    }
  };

  const onFinish = async (values) => {
    const { amount } = values;
    if (amount > pensionAmount) {
      form.setFields([
        {
          name: 'amount',
          errors: ['Entered amount must be less than the pension amount'],
        },
      ]);
      return;
    }

    try {
      // Send form values to backend for processing
      await axios.post('http://localhost:3005/calculate-maturity-date', { ...values, name2 });
      // Fetch updated maturity data after submission
      fetchMaturityData();
      // Reset form fields
      form.resetFields();
    } catch (error) {
      console.error('Error calculating maturity date:', error);
    }
  };

  const fetchMaturityData = async () => {
    try {
      const response = await axios.get('http://localhost:3005/get-maturity-data');
      setMaturityData(response.data);
    } catch (error) {
      console.error('Error fetching maturity data:', error);
    }
  };

  const fetchMaturityData2 = async () => {
    try {
      const response3 = await axios.get('http://localhost:3005/get-maturity-data2', {
        params: { name: name2 }
      });
      setMaturityData2(response3.data);
    } catch (error) {
      console.error('Error fetching maturity data:', error);
    }
  };

  const columns = [
    {
      title: 'Plan',
      dataIndex: 'Plan',
      key: 'Plan',
    },
    {
      title: 'Interest',
      dataIndex: 'interest',
      key: 'interest',
    },
    {
      title: 'Duration (In Months)',
      dataIndex: 'duration',
      key: 'duration',
    },
  ];

  const columns2 = [
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
      title: 'Enrollment Status',
      dataIndex: 'approval_status',
      key: 'approval_status',
    },
  ];

  return (
    <div>
      {displayForm ? (
        <>
          <h2 style={{ color: 'black', fontSize: '24px' }}><b>Maturity Date Table</b></h2>
          <Form form={form} onFinish={onFinish} layout="inline">
            <Form.Item label="Plan" name="plan" rules={[{ required: true, message: 'Please select a plan' }]}>
              <Select placeholder="Select a plan">
                <Option value="A">Plan A</Option>
                <Option value="B">Plan B</Option>
                <Option value="C">Plan C</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Amount" name="amount" rules={[{ required: true, message: 'Please enter the amount' }]}>
              <Input placeholder="Amount" type="number" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Table columns={columns} dataSource={maturityData} />
        </>
      ) : (
        <div>
          <h2 style={{ color: 'black', fontSize: '24px' }}>Enrollment Status</h2>
          <Table columns={columns2} dataSource={maturityData2} />
        </div>
      )}
    </div>
  );
};

export default MaturityDateComp;
