import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import {
  UserOutlined,
  FileAddOutlined,
  CheckOutlined,
  LogoutOutlined,
  CalculatorOutlined,
  EyeOutlined ,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import EnrollForm from '../components/EnrollForm';
import { Provider } from 'react-redux';
import { FormOutlined } from '@ant-design/icons';
import EnrollFormPage from './EnrollFormPage';
import CalculatePension from '../components/CalculatePension';
import ProfileSection from '../components/ProfileCustomerComp';
import ProfileCustomerPage from './ProfileCustomer';
import CalculatePensionPage from './CalculatePensionPage';
import RequestWithdrawalPage from './RequestWithdrawalPage';
import ViewBalancePage from './ViewBalancePage';
import MaturityDateComp from '../components/MaturityDateComp';
import ReportIssues from '../components/ReportIssues';
import ReportIssuesPage from './ReportIssuesPage';
import MaturityDate from './MaturityDate';

const { Header, Content, Sider } = Layout;
const { Item } = Menu;

const Menu1Content = () => <div>Enroll</div>;
const Menu2Content = () => <div>Menu 2 Content</div>;
const CustomerProfile = () => <div>Customer Profile Content</div>;
const CustomerLogout = () => <div>Logout Content</div>;

const CustomerDashboard = () => {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState('profile');

  const handleMenuItemClick = (item) => {
    setSelectedSection(item.key);
    if (item.key === 'logout') {
      // Route to the sign-in page when "Logout" is clicked
      router.push('/loginPage'); // Replace '/signin' with the actual sign-in page URL
    }
  };

  const layoutStyles = {
    display: 'flex',
    minHeight: '100vh',
  };

  const sidebarStyles = {
    width: '200px',
    background: 'dark',
  };

  const contentStyles = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const headerStyles = {
    backgroundColor: '#008b8b',
    color: 'white',
    width: '100%',
  };

  const textCenterStyles = {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '24px',
  };

  return (
    
    <Layout style={layoutStyles}>
      <Sider width={200} theme="dark" style={sidebarStyles}>
        <div className="logo">Your Logo</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['profile']} onClick={handleMenuItemClick}>
          <Item key="profile" icon={<UserOutlined />}>
            Profile
          </Item>
          <Item key="menu1" icon={<FormOutlined />}>
            Enroll
          </Item>
          
          <Item key="menu2" icon={<CalculatorOutlined />}>
          CalculatePension
          </Item>
          <Item key="menu3" icon={<CheckOutlined  />}>
          Request Withdrawal
          </Item>
          <Item key="menu4" icon={<EyeOutlined   />}>
          View Balance
          </Item>
          <Item key="menu5" icon={<EyeOutlined   />}>
          View Maturity Plans
          </Item>
          <Item key="menu6" icon={<ExclamationCircleOutlined/>}>
            Report Issues
          </Item>
          <Item key="logout" icon={<LogoutOutlined />}>
            Logout
          </Item>
        </Menu>
      </Sider>

      <Layout style={contentStyles}>
        <Header style={headerStyles}>
          <h1 style={textCenterStyles}>Customer Dashboard</h1>
        </Header>
        <Content style={{ background: 'dark', padding: '16px', color: 'white' }}>
          {selectedSection === 'profile' && <ProfileCustomerPage />}
          {selectedSection === 'menu1' && <EnrollFormPage />}
          {selectedSection === 'menu2' && <CalculatePensionPage/>}
          {selectedSection === 'menu3' && <RequestWithdrawalPage />}
          {selectedSection === 'menu4' && <ViewBalancePage />}
          {selectedSection === 'menu5' && <MaturityDate/>}
          {selectedSection === 'menu6' && <ReportIssuesPage/>}
          {selectedSection === 'logout' && <CustomerLogout />}
          
          {/* Render header and image when no section is selected */}
          {selectedSection === '' && (
            <div>
              <Header style={headerStyles}>
                <h1 style={textCenterStyles}>Welcome to Customer Dashboard</h1>
              </Header>
              <img
                src="https://images.pexels.com/photos/1181487/pexels-photo-1181487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Welcome"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
   
  );
};

export default CustomerDashboard;
