import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, Button, Table, message } from 'antd';
import axios from 'axios';

export default function RequestWithdrawal() {
    const email = useSelector((state) => state.email.email);
    const usertype = useSelector((state) => state.email.userType);
    const name = useSelector((state) => state.email.name);

    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    const [tableData, setTableData] = useState([]);
    const [pensionAmount, setPensionAmount] = useState(0); // State to store pension amount

    useEffect(() => {
        fetchData(); // Fetch data on component mount
        fetchPensionAmount(); // Fetch pension amount on component mount
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const fetchData = () => {
        // Make GET request to fetch data
        axios.get(`http://localhost:3005/withdrawal-requests?email=${email}`)
            .then(response => {
                // Update table data with the fetched data
                setTableData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                message.error('Failed to fetch data.');
            });
    };

    const fetchPensionAmount = () => {
        // Make GET request to fetch pension amount
        axios.get('http://localhost:3005/get-pension-amount', {
            params: { name: name }
        })
        .then(response => {
            // Update pension amount state
            setPensionAmount(response.data.pensionAmount);
        })
        .catch(error => {
            console.error('Error fetching pension amount:', error);
            message.error('Failed to fetch pension amount.');
        });
    };

    const handleWithdrawalSubmit = () => {
        // Check if withdrawal amount is less than pension amount
        if (withdrawalAmount > pensionAmount) {
            message.error('Withdrawal amount cannot exceed pension amount.');
            setWithdrawalAmount(''); // Clear withdrawal amount
            return;
        }

        // Make POST request here
        axios.post('http://localhost:3005/withdrawal-endpoint', {
            Email: email,
            UserType: usertype,
            Name: name,
            WithdrawalAmount: withdrawalAmount,
            WithdrawStatus: 'Not Approved'
        })
        .then(response => {
            // Update table data upon successful submission
            setTableData([...tableData, {
                key: tableData.length + 1,
                Email: email,
                UserType: usertype,
                Name: name,
                WithdrawalAmount: withdrawalAmount,
                WithdrawStatus: 'Not Approved'
            }]);
            // Clear withdrawal amount after submission
            setWithdrawalAmount('');
            // Show success message
            message.success('Withdrawal request submitted successfully.');
        })
        .catch(error => {
            // Handle errors
            console.error('Error submitting withdrawal request:', error);
            message.error('Failed to submit withdrawal request.');
        });
    };

    const columns = [
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email'
        },
        {
            title: 'User Type',
            dataIndex: 'UserType',
            key: 'UserType'
        },
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name'
        },
        {
            title: 'Withdrawal Amount',
            dataIndex: 'WithdrawalAmount',
            key: 'WithdrawalAmount'
        },
        {
            title: 'Withdrawal Status',
            dataIndex: 'WithdrawStatus',
            key: 'WithdrawStatus'
        }
    ];

    return (
        <div>
            <Form layout="inline" onFinish={handleWithdrawalSubmit}>
                <Form.Item label="Withdrawal Amount">
                    <Input
                        type="number"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
            <Table columns={columns} dataSource={tableData} />
        </div>
    );
}
