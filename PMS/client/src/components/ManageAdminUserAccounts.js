import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import axios from 'axios';

const ManageAdminUserAccounts = () => {
  const [adminUserData, setAdminUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3005/get-admin-logindata');
      setAdminUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (userName) => {
    try {
      await axios.post(`http://localhost:3005/delete-user`, { userName });
      // Remove the deleted user from the local state
      setAdminUserData(adminUserData.filter(user => user.Name !== userName));
      // Close the delete confirmation modal
      setDeleteModalVisible(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const showDeleteConfirmation = (userId) => {
    setSelectedUserId(userId);
    setDeleteModalVisible(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'email',
    },
    {
      title: 'Password',
      dataIndex: 'Password',
      key: 'password',
    },
    {
      title: 'User Type',
      dataIndex: 'Usertype',
      key: 'usertype',
    },
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'id',
    },
    {
      title: 'DOB',
      dataIndex: 'DOB',
      key: 'dob',
      render: dob => dob.substring(0, 10),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="danger" onClick={() => showDeleteConfirmation(record.Name)}>Delete Account</Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Manage Admin User Accounts</h1>
      <Table columns={columns} dataSource={adminUserData} loading={loading} />

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={() => handleDelete(selectedUserId)}
        onCancel={() => setDeleteModalVisible(false)}
      >
        <p>Are you sure you want to delete this account?</p>
      </Modal>
    </div>
  );
};

export default ManageAdminUserAccounts;
