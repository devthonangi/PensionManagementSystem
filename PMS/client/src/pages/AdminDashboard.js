import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import {
  UserOutlined,
  FileAddOutlined,
  CheckOutlined,
  LogoutOutlined,
  SettingOutlined ,
  EyeOutlined 
} from '@ant-design/icons';
import ProfileAdminPage from './ProfileAdmin';
import ManageUserAccounts from '../components/ManageUserAccounts';
import PensionStatusPage from './PensionStatusPage';
import MaturityDateComp from '../components/MaturityDateComp';
import ManageAdminUserAccounts from '../components/ManageAdminUserAccounts';
const { Header, Content, Sider } = Layout;
const { Item } = Menu;

const Menu1Content = () => <div>Manage User Accounts</div>;
const Menu2Content = () => <div>Menu 2 Content</div>;
const AdminProfile = () => <div>Admin Profile Content</div>;
const AdminLogout = () => <div>Logout Content</div>;

const AdminDashboard = () => {
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
          <Item key="menu1" icon={<SettingOutlined />}>
          Manage Users
          </Item>
      
          <Item key="logout" icon={<LogoutOutlined />}>
            Logout
          </Item>
        </Menu>
      </Sider>

      <Layout style={contentStyles}>
        <Header style={headerStyles}>
          <h1 style={textCenterStyles}>Admin Dashboard</h1>
        </Header>
        <Content style={{ background: 'dark', padding: '16px', color: 'white' }}>
          {selectedSection === 'profile' &&  <ProfileAdminPage/>}
          {selectedSection === 'menu1' && <ManageAdminUserAccounts/>}
         
          {selectedSection === 'logout' && <AdminLogout />}

          {/* Render header and image when no section is selected */}
          {selectedSection === '' && (
            <div>
              <Header style={headerStyles}>
                <h1 style={textCenterStyles}>Welcome to Admin Dashboard</h1>
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

export default AdminDashboard;
