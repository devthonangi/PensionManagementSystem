# Pension Management System

The Pension Management System is designed to manage pension-related activities for administrators, managers, and customers.

## Table of Contents
- [Features](#features)
- [Server Setup](#server-setup)
- [Database Setup](#database-setup)
- [Client-Side Code](#client-side-code)
- [Usage](#usage)

## Features
### Admin Dashboard:
- Profile page
- Account management
- Issue resolution
- Logout

### Manager Dashboard:
- Profile page
- Approve withdrawal requests
- Manage customer accounts
- Approve maturity plans
- Logout

### Customer Dashboard:
- Profile page
- Enroll data
- Calculate pension amount
- Withdraw request
- Enroll maturity data
- Logout

## Server Setup
To start the server environment, follow these steps:
1. Open the XAMPP Control Panel.
2. Start the Apache server by clicking the "Start" button next to Apache.
3. Start the MySQL server by clicking the "Start" button next to MySQL.

## Database Setup
Create the following tables in your MySQL database:

1. **login**
```sql
CREATE TABLE login (
  Email varchar(100) NOT NULL,
  Password varchar(100) NOT NULL,
  Name varchar(100) NOT NULL,
  Usertype varchar(100) NOT NULL,
  ID int(100) NOT NULL,
  DOB varchar(100) NOT NULL
);
```

2. **enrolldata**
```sql
CREATE TABLE enrolldata (
  Name varchar(100) DEFAULT NULL,
  Email varchar(255) DEFAULT NULL,
  Age int(11) DEFAULT NULL,
  Salary int(11) DEFAULT NULL,
  Years_of_Service int(11) DEFAULT NULL,
  pension_amount int(11) DEFAULT NULL
);
```

3. **maturity_date**
```sql
CREATE TABLE maturity_date (
  Plan varchar(255) DEFAULT NULL,
  interest int(11) DEFAULT NULL,
  duration int(11) DEFAULT NULL
);

INSERT INTO maturity_date (Plan, interest, duration) VALUES
('Plan A', 4, 3),
('Plan B', 6, 6),
('Plan C', 8, 12);
```

4. **Maturity_date_data**
```sql
CREATE TABLE Maturity_date_data (
  id int(11) NOT NULL,
  name varchar(255) NOT NULL,
  plan varchar(255) NOT NULL,
  amount decimal(10,2) NOT NULL,
  approval_status varchar(255) DEFAULT 'not approved'
);
```

5. **report_issue**
```sql
CREATE TABLE report_issue (
  subject varchar(255) DEFAULT NULL,
  issue varchar(255) DEFAULT NULL,
  solution varchar(255) DEFAULT NULL,
  Name varchar(255) DEFAULT NULL
);
```

6. **withdrawalrequests**
```sql
CREATE TABLE withdrawalrequests (
  Email varchar(255) DEFAULT NULL,
  UserType varchar(50) DEFAULT NULL,
  Name varchar(100) DEFAULT NULL,
  WithdrawalAmount int(11) DEFAULT NULL,
  WithdrawStatus varchar(50) DEFAULT NULL
);
```

## Client-Side Code
To run the client-side code, execute the following commands:
```bash
cd client
npm run dev
```

## Server-Side Code
To run the server-side code, execute the following commands:
```bash
cd server
npm run dev
```
After running the server-side code, the server will start listening for incoming requests.

## Usage
Once the server and client-side code are set up and running, users can interact with the Pension Management System. They can submit pension applications, view courses, login to their accounts, and access pension-related data.
```

This README file provides comprehensive instructions for setting up and using the Pension Management System, covering server setup, database setup, client-side and server-side code execution, and usage guidelines.
