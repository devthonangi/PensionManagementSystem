Pension Management System
The Pension Management System is designed to manage pension-related activities for administrators, managers, and customers. This README provides instructions on setting up the server environment, running the server-side code, and executing the client-side code.
Table of Contents
	•	Features
	•	Server Setup
	•	Database Setup
	•	Client-Side Code
	•	Usage
Features
Admin Dashboard:
	•	Profile page
	•	Account management
	•	Issue resolution
	•	Logout
Manager Dashboard:
	•	Profile page
	•	Approve withdrawal requests
	•	Manage customer accounts
	•	Approve maturity plans
	•	Logout
Customer Dashboard:
	•	Profile page
	•	Enroll data
	•	Calculate pension amount
	•	Withdraw request
	•	Enroll maturity data
	•	Logout
Server Setup
To start the server environment, follow these steps:
		Open the XAMPP Control Panel.
		Start the Apache server by clicking the "Start" button next to Apache.
		Start the MySQL server by clicking the "Start" button next to MySQL.
Database Setup
Create the following tables in your MySQL database:
Table 1: login

CREATE TABLE login ( Email varchar(100) NOT NULL, Password varchar(100) NOT NULL, Name varchar(100) NOT NULL, Usertype varchar(100) NOT NULL, ID int(100) NOT NULL, DOB varchar(100) NOT NULL );
Table 2: enrolldata

CREATE TABLE enrolldata ( Name varchar(100) DEFAULT NULL, Email varchar(255) DEFAULT NULL, Age int(11) DEFAULT NULL, Salary int(11) DEFAULT NULL, Years_of_Service int(11) DEFAULT NULL, pension_amount int(11) DEFAULT NULL );
Table 3: maturity_date

CREATE TABLE maturity_date ( Plan varchar(255) DEFAULT NULL, interest int(11) DEFAULT NULL, duration int(11) DEFAULT NULL );
Insert data into the maturity_date table:
INSERT INTO maturity_date (Plan, interest, duration) VALUES ('Plan A', 4, 3), ('Plan B', 6, 6), ('Plan C', 8, 12);
Table 4: Maturity_date_data

CREATE TABLE Maturity_date_data ( id int(11) NOT NULL, name varchar(255) NOT NULL, plan varchar(255) NOT NULL, amount decimal(10,2) NOT NULL, approval_status varchar(255) DEFAULT 'not approved' );
Table 5: report_issue

CREATE TABLE report_issue ( subject varchar(255) DEFAULT NULL, issue varchar(255) DEFAULT NULL, solution varchar(255) DEFAULT NULL, Name varchar(255) DEFAULT NULL );
Table 6: withdrawalrequests

CREATE TABLE withdrawalrequests ( Email varchar(255) DEFAULT NULL, UserType varchar(50) DEFAULT NULL, Name varchar(100) DEFAULT NULL, WithdrawalAmount int(11) DEFAULT NULL, WithdrawStatus varchar(50) DEFAULT NULL );

Client-Side Code
To run the client-side code, execute the following commands:
cd client npm run dev

Server-Side Code
To run the server-side code, execute the following commands:
cd server npm run dev
After running the server-side code, the server will start listening for incoming requests.
After running the client and server  side code, open your web browser and navigate to http://localhost:3000/loginPage.

Usage
Once the server and client-side code are set up and running, users can interact with the Pension Management System. They can submit pension applications, view courses, login to their accounts, and access pension-related data.
