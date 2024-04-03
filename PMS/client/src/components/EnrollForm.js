import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, Button, InputNumber, Modal } from 'antd';
import axios from 'axios';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const styles = {
  container: {
    padding: '20px',
    border: '1px solid #d9d9d9',
    borderRadius: '5px',
    marginBottom: '20px',
    backgroundColor: '#f5f5f5',
  },
  title: {
    color: '#1890ff',
  },
  errorText: {
    color: '#ff4d4f',
  },
  scheduleText: {
    color: '#52c41a',
  },
};

const EnrollForm = () => {
  const defaultName = useSelector((state) => state.email.name);
  const defaultEmail = useSelector((state) => state.email.email);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const { data } = await axios.post('http://localhost:3005/check-enrollment2', { name: defaultName, email: defaultEmail });
        setIsEnrolled(data.exists);
      } 
      catch (error) {
        console.error('Error:', error);
        // Handle error appropriately, such as displaying an error message to the user
      }
    };

    checkEnrollment();
  }, [defaultName, defaultEmail]);

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);

    const { name, email, age, salary, yearsOfService} = values;

    try {
      const { data } = await axios.post('http://localhost:3005/check-enrollment2', { name, email });
console.log(data);
      if (data.exists) {
        console.log('User already enrolled');
      } else {
        await axios.post('http://localhost:3005/enroll-data', { name, email, age, salary, yearsOfService });
        setSuccessModalVisible(true);
        setIsEnrolled(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      {isEnrolled === false ? (
        <Form
          name="enroll_form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Name"
            name="name"
            initialValue={defaultName}
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            initialValue={defaultEmail}
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email address!' }
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: 'Please input your age!' }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Salary"
            name="salary"
            rules={[{ required: true, message: 'Please input your salary!' }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Years of Service"
            name="yearsOfService"
            rules={[{ required: true, message: 'Please input years of service!' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div style={styles.container}>
           
      <Title level={2} style={styles.title}>
      Already enrolled
      </Title>
        </div>
      )}

      {/* Success Modal */}
      <Modal
        title="Success"
        visible={successModalVisible}
        onCancel={() => setSuccessModalVisible(false)}
        footer={[
          <Button key="ok" type="primary" onClick={() => setSuccessModalVisible(false)}>
            OK
          </Button>
        ]}
      >
        Enrollment successful!
      </Modal>
    </div>
  );
};

export default EnrollForm;
