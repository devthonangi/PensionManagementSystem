import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { Modal } from 'antd'; 
import { DatePicker } from 'antd';
import axios from 'axios';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const registerForm = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [name,setName]=useState('');
  const [usertype,setUsertype]=useState('');
  const [form] = Form.useForm();
  const router = useRouter()
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [dob, setDob] = useState(null);

  const onFinish = (event) => {
    console.log('Received values of form: ', event);
    axios
      .post('http://localhost:3005/submit-form', { email, password, name, usertype ,id,dob})
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setSuccessModalVisible(true); // Show the success modal
        }
      })
      .catch((err) => console.log(err));
  };
  const handleSignInClick = () => {
    setSuccessModalVisible(false); // Close the success modal
    router.push('/loginPage');
  };
  const prefixSelector = (

    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
    {/* Background Image */}
    <div
      style={{
        flex: 1,
        backgroundImage: `url('https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        backgroundSize: 'cover',
      }}
    ></div>
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: 'white', border: '1px solid #d9d9d9', borderRadius: '4px' }}>
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
          <Form.Item
  name="Name"
  label="Name"
  rules={[
    {
      required: true,
      message: 'Please input your name!',
      whitespace: true,
    },
  ]}
>
  <Input onChange={e => setName(e.target.value)} />
</Form.Item>


      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input onChange={e=>setEmail(e.target.value)}/>
      </Form.Item>
      <Form.Item
  name="dob"
  label="Date of Birth"
  rules={[
    {
      required: true,
      message: 'Please select your date of birth!',
    },
  ]}
>
  <DatePicker style={{ width: '100%' }} onChange={(date) => setDob(date)} />
</Form.Item>
      <Form.Item
  name="id"
  label="GOVT ID"
  rules={[
    {
      required: true,
      message: 'Please input your ID!',
    },
  ]}
>
  <Input onChange={(e) => setId(e.target.value)} />
</Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            min: 8,
            message: 'Password must be at least 8 characters long!',
          },
          {
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/,
            message: 'Password must contain at least one letter and one number!',
          },
        ]}
        hasFeedback
      >
        <Input.Password onChange={e=>setPassword(e.target.value)}/>
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

    

      <Form.Item
        name="usertype"
        label="Usertype"
        rules={[
          {
            required: true,
            message: 'Please select UserType!',
          },
        ]}
      >
        <Select placeholder="select your usertype" onChange={value => setUsertype(value)}>
          <Option value="Admin">Admin</Option>
          <Option value="Customer">Customer</Option>
          <Option value="Manager">Manager</Option>
        </Select>
      </Form.Item>

      

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    </div>
    <Modal
        title="Registration Successful"
        visible={successModalVisible}
        onOk={handleSignInClick}
        onCancel={() => setSuccessModalVisible(false)}
        footer={[
          <Button key="sign-in" type="primary" onClick={handleSignInClick}>
            Sign In
          </Button>,
        ]}
      >
        <p>Your registration was successful. Click the "Sign In" button to log in.</p>
      </Modal>
    </div>
  );
};
export default registerForm;