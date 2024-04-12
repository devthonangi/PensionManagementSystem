const express = require("express");
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require("cors");
const PORT = 3005;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pms",
  port: 3306,
});
app.get('/get-pension-amount', (req, res) => {
  const { name } = req.query;

  const query = `
    SELECT pension_amount
    FROM enrolldata
    WHERE Name = ?;
  `;

  db.query(query, [name], (error, results) => {
    if (error) {
      console.error('Error fetching pension amount:', error);
      res.status(500).json({ error: 'Failed to fetch pension amount' });
      return;
    }
    if (results.length === 0) {
      // No matching record found for the given name
      res.status(404).json({ error: 'No pension amount found for the given name' });
      return;
    }
    const pensionAmount = results[0].pension_amount;
    res.json({ pensionAmount });
  });
});

app.post('/login', (req, res) => {
  const sql = "SELECT name FROM login WHERE Email = ? AND Password = ? AND Usertype = ? AND ID = ?";

  db.query(sql, [req.body.email, req.body.password, req.body.usertype, req.body.id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (data.length > 0) {
      const name = data[0].name;
      return res.json({ message: 'Login success', name });
    } else {
      return res.json('No record');
    }
  });
});

app.post('/submit-form', (req, res) => {
  const { email, password, name, usertype, id, dob } = req.body;

  const sql_register = 'INSERT INTO login (Email, Password, Name, Usertype, ID, DOB) VALUES (?, ?, ?, ?, ?, ?)';

  try {
    // Insert data into MySQL
    db.query(sql_register, [email, password, name, usertype, id, dob], (err, data) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
      } else {
        console.log('Data inserted into MySQL');
        res.status(200).json({ message: 'Data inserted successfully' });
      }
    });
  } catch (error) {
    console.error('Error submitting form data:', error);
    res.status(500).json({ message: 'Failed to submit form data', error: error.message });
  }
});
app.post('/enroll-data', (req, res) => {
  const { name, email, age, salary, yearsOfService } = req.body;

  // Calculate pension amount based on age
  const pensionAmount = age > 60 ? 20000 : 10000;

  const sql_insert = 'INSERT INTO enrolldata (Name, Email, Age, Salary, Years_of_Service, pension_amount) VALUES (?, ?, ?, ?, ?, ?)';

  try {
    // Insert data into your MySQL table
    db.query(sql_insert, [name, email, age, salary, yearsOfService, pensionAmount], (err, data) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
      } else {
        console.log('Data inserted into MySQL');
        res.status(200).json({ message: 'Data inserted successfully' });
      }
    });
  } catch (error) {
    console.error('Error submitting form data:', error);
    res.status(500).json({ message: 'Failed to submit form data', error: error.message });
  }
});
app.post('/calculate-maturity-date', (req, res) => {
  const { name2, plan, amount } = req.body;

  // Perform the SQL insert operation to insert the data into the database
  const sql = 'INSERT INTO Maturity_date_data (name, plan, amount) VALUES (?, ?, ?)';

  // Execute the SQL query
  db.query(sql, [name2, plan, amount], (err, result) => {
    if (err) {
      console.error('Error inserting data into Maturity_date_data table:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Send a success response
    res.status(200).json({ message: 'Data inserted successfully into Maturity_date_data table' });
  });
});

app.post('/check-enrollment', (req, res) => {
  const { name, email } = req.body;

  // Query the database to check if the provided name and email exist in the enrolldata table
  const sql_check_enrollment = 'SELECT COUNT(*) AS count FROM enrolldata WHERE Name = ? AND Email = ? AND approval_status = "Approved"';


  db.query(sql_check_enrollment, [name, email], (err, data) => {
    if (err) {
      console.error('Error checking enrollment:', err);
      res.status(500).json({ message: 'Internal server error', error: err.message });
    } else {
      const count = data[0].count;
      // Send response indicating whether the name and email already exist
      res.status(200).json({ exists: count > 0 });
    }
  });
});
app.post('/check-enrollment2', (req, res) => {
  const { name, email } = req.body;

  const sql_check_enrollment = 'SELECT * FROM enrolldata WHERE Name = ? AND Email = ?';

  db.query(sql_check_enrollment, [name, email], (err, data) => {
    if (err) {
      console.error('Error checking enrollment:', err);
      res.status(500).json({ message: 'Internal server error', error: err.message });
    } else {
      if (data.length > 0) {
        res.status(200).json({ exists: true, data: data[0] }); // Return data of the enrolled user
      } else {
        res.status(200).json({ exists: false });
      }
    }
  });
});


app.get('/get-logindata', (req, res) => {
  const sql = "SELECT Email, Password, Name, Usertype, ID, DOB FROM login WHERE Usertype = 'Customer' ORDER BY Name ASC";
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result);
    }
  });
});
app.get('/get-admin-logindata', (req, res) => {
  const sql = "SELECT Email, Password, Name, Usertype, ID, DOB FROM login WHERE Usertype IN ('Customer', 'Manager') ORDER BY Name ASC";

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result);
    }
  });
});
app.get('/get-enrolldata', (req, res) => {
  const sql = "SELECT Name,Email,Age,Salary,Years_of_Service  FROM enrolldata";
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result);
    }
  });
});
app.get('/get-enrolldata2', (req, res) => {
  const sql = "SELECT Email, UserType, Name, WithdrawalAmount, WithdrawStatus FROM withdrawalrequests";
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result);
    }
  });
});
app.post('/delete-user', (req, res) => {
  const { userName } = req.body;
  const query = `DELETE FROM login WHERE Name = ?`;

  db.query(query, [userName], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ message: 'Error deleting user' });
      return;
    }

    console.log(`Deleting user with name: ${userName}`);
    res.status(200).json({ message: 'User deleted successfully!' });
  });
});

app.post('/update-approval-status', (req, res) => {
  const { userName, amount, status } = req.body;

  // Perform an SQL update operation to update the approval status
  const sql = 'UPDATE withdrawalrequests SET WithdrawStatus = ? WHERE Name = ? AND WithdrawalAmount = ?';

  // Execute the SQL query
  db.query(sql, [status, userName, amount], (err, result) => {
    if (err) {
      console.error('Error updating approval status:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send a success response
    res.status(200).json({ message: 'Approval status updated successfully' });
  });
});
app.post('/update-approval-status2', (req, res) => {
  const { name, amount, status } = req.body;

  // Perform an SQL update operation to update the approval status
  const sql = 'UPDATE maturity_date_data SET approval_status = ? WHERE name = ? AND amount = ?';

  // Execute the SQL query
  db.query(sql, [status, name, amount], (err, result) => {
    if (err) {
      console.error('Error updating approval status:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'No records updated' });
    }

    // Send a success response
    res.status(200).json({ message: 'Approval status updated successfully' });
  });
});
app.post('/withdrawal-endpoint', (req, res) => {
  const { Email, UserType, Name, WithdrawalAmount, WithdrawStatus } = req.body;

  // Log received values
  console.log('Received withdrawal request:');
  console.log('Email:', Email);
  console.log('UserType:', UserType);
  console.log('Name:', Name);
  console.log('WithdrawalAmount:', WithdrawalAmount);
  console.log('WithdrawStatus:', WithdrawStatus);

  // Insert new withdrawal record into the database
  const sql_insert2 = 'INSERT INTO withdrawalrequests (Email, UserType, Name, WithdrawalAmount, WithdrawStatus) VALUES (?, ?, ?, ?, ?)';
  db.query(sql_insert2, [Email, UserType, Name, WithdrawalAmount, WithdrawStatus], (error, results) => {
      if (error) {
          console.error('Error submitting withdrawal request:', error);
          res.status(500).json({ error: 'Failed to submit withdrawal request.' });
          return;
      }
      console.log('Withdrawal request submitted successfully.');
      res.status(200).json({ message: 'Withdrawal request submitted successfully.' });
  });
});

app.get('/withdrawal-requests', (req, res) => {
  const { email } = req.query; // Extract email from query parameters
  let sql;

  if (email) {
      // If email is provided in the query parameters, filter records based on email
      sql = 'SELECT * FROM withdrawalrequests WHERE Email = ?';
  } else {
      // If no email is provided, select all records
      sql = 'SELECT * FROM withdrawalrequests';
  }

  // Execute the query with email parameter if provided
  db.query(sql, [email], (error, results) => {
      if (error) {
          console.error('Error fetching withdrawal requests:', error);
          res.status(500).json({ error: 'Failed to fetch withdrawal requests.' });
          return;
      }

      // Send the fetched data as JSON response
      res.status(200).json(results);
  });
});

// Backend Route to Fetch Enrollment Data
app.get('/get-balance', (req, res) => {
  const { email } = req.query;

  // Query to fetch enrollment data for the user
  const query = 'SELECT pension_amount FROM enrolldata WHERE Email = ?';

  // Execute the query
  db.query(query, [email], (error, results) => {
    if (error) {
      console.error('Error fetching enrollment data:', error);
      res.status(500).json({ error: 'Failed to fetch enrollment data' });
      return;
    }

    // Send the enrollment data to the client
    res.json(results[0]); // Assuming only one row is returned
  });
});
app.get('/get-withdrawaldata2', (req, res) => {
  const { email } = req.query;

  // Query to fetch withdrawal data for the user
  const query = 'SELECT SUM(WithdrawalAmount) AS totalWithdrawalAmount FROM withdrawalrequests WHERE Email = ? AND WithdrawStatus = "Approved"';


  // Execute the query
  db.query(query, [email], (error, results) => {
    if (error) {
      console.error('Error fetching withdrawal data:', error);
      res.status(500).json({ error: 'Failed to fetch withdrawal data' });
      return;
    }

    // Extract totalWithdrawalAmount from the results
    const totalWithdrawalAmount = results.length > 0 ? results[0].totalWithdrawalAmount : 0;

    // Send the total withdrawal amount to the client
    res.json({ totalWithdrawalAmount });
  });
});
app.get('/get-maturity-data', (req, res) => {
  // SQL query to select all rows from Maturity_Date table
  console.log('hi');
  const query = 'SELECT Plan, interest, duration FROM maturity_date';

  // Execute the query
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching maturity data:', error);
      res.status(500).json({ error: 'Failed to fetch maturity data' });
      return;
    }
    // Send the fetched data as JSON response
    res.json(results);
  });
});
app.get('/get-maturity-data2', (req, res) => {
  // Extract the name from the query parameters
  const { name } = req.query;

  // SQL query to select rows from Maturity_Date table based on the provided name
  const query = 'SELECT name, plan, amount, approval_status FROM maturity_date_data WHERE name = ?';

  // Execute the query with the provided name
  db.query(query, [name], (error, results) => {
    if (error) {
      console.error('Error fetching maturity data:', error);
      res.status(500).json({ error: 'Failed to fetch maturity data' });
      return;
    }
    // Send the fetched data as JSON response
    res.json(results);
  });
});
app.get('/get-maturity-data3', (req, res) => {
  // Extract the name from the query parameters
 
  // SQL query to select rows from Maturity_Date table based on the provided name
  const query2 = 'SELECT name, plan, amount, approval_status FROM maturity_date_data';

  // Execute the query with the provided name
  db.query(query2, (error, results) => {
    if (error) {
      console.error('Error fetching maturity data:', error);
      res.status(500).json({ error: 'Failed to fetch maturity data' });
      return;
    }
    // Send the fetched data as JSON response
    res.json(results);
  });
});
app.post('/update-user-data', (req, res) => {
  const { name, amount } = req.body;

  // SQL query to update user data based on the provided name and amount
  const query4 = `
  UPDATE enrolldata
  SET pension_amount = pension_amount - ?
  WHERE Name = ?;
  
  `;

  // Execute the query with the provided parameters
  db.query(query4, [amount, name], (error, results) => {
    if (error) {
      console.error('Error updating user data:', error);
      res.status(500).json({ error: 'Failed to update user data' });
      return;
    }
    // Send a success response
    res.json({ success: true });
  });
});

app.post('/report-issue', (req, res) => {
  const { subject, issue, name } = req.body; // Corrected from message to issue

  // Insert the issue into the database with solution column set to 'unresolved'
  const sql5 = 'INSERT INTO report_issue (subject, issue, solution, Name) VALUES (?, ?, ?, ?)';
  db.query(sql5, [subject, issue, 'unresolved', name], (err, result) => {
    if (err) {
      console.error('Error inserting issue into database:', err);
      res.status(500).json({ message: 'Internal server error', solved: false });
    } else {
      console.log('Issue reported successfully');
      res.status(200).json({ message: 'Issue reported successfully', solved: false });
    }
  });
});


app.get('/get-issues', (req, res) => {
  const name = req.query.name; // Extract name from query parameter

  // Select issues where the name matches the provided name
  const sql = 'SELECT * FROM report_issue WHERE Name = ?';
  
  db.query(sql, [name], (error, results) => {
      if (error) {
          console.error('Error fetching issues:', error);
          res.status(500).json({ error: 'Failed to fetch issues.' });
          return;
      }
      
      res.status(200).json(results);
  });
});
app.get('/get-issues2', (req, res) => {
  const sql = 'SELECT subject, issue, solution, Name  FROM report_issue';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching issues:', err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      console.log('Issues fetched successfully');
      res.status(200).json(results);
    }
  });
});
app.post('/update-solution', (req, res) => {
  const { solution, subject, name } = req.body;
console.log(solution, subject, name);
  // Update the solution in the database
  const sql49 = 'UPDATE report_issue SET solution = ? WHERE Name = ? AND subject = ?';

  db.query(sql49, [solution, name, subject], (err, result) => {
    if (err) {
      console.error('Error updating solution:', err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      console.log('Solution updated successfully');
      res.status(200).json({ message: 'Solution updated successfully' });
    }
  });
});
app.post('/get-submitted-requests', (req, res) => {
  // Assuming you are using a MySQL database connection
  
  // SQL query to fetch submitted requests
  const sql = "SELECT * FROM Maturity_date_data ";  // Adjust the query according to your schema and criteria

  // Execute the SQL query
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (data.length > 0) {
      // If submitted requests are found, send them in the response
      return res.json(data);
    } else {
      // If no submitted requests are found, return a message
      return res.json({ message: 'No submitted requests found' });
    }
  });
});
app.post('/get-maturity-data', (req, res) => {
  // Assuming you are using a MySQL database connection
  
  // SQL query to fetch maturity data
  const sql7 = "SELECT * FROM Maturity_date_data";  // Adjust the query according to your schema and criteria

  // Execute the SQL query
  db.query(sql7, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (data.length > 0) {
      // If maturity data is found, send it in the response
      return res.json(data);
    } else {
      // If no data is found, return a message
      return res.json({ message: 'No data found' });
    }
  });
});
app.get('/get-name', (req, res) => {
  const { name } = req.query;

  const sqlQuery = `SELECT COUNT(*) AS count FROM maturity_date_data WHERE name = ?`;

  db.query(sqlQuery, [name], (error, results) => {
    if (error) {
      console.error('Error fetching name:', error);
      res.status(500).json({ error: 'Failed to fetch name' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Name not found' });
      return;
    }

    const count = results[0].count;
     console.log(count);
    // Send the count of records with the provided name in the response
    res.json({ count: count });
  });
});

app.get('/get-maturity-data2', (req, res) => {
  const { name } = req.query;

  // If name is provided, fetch maturity data for that specific user
  let sql;
  let sqlParams;

  if (name) {
    sql = 'SELECT * FROM maturity_date_data WHERE name = ?';
    sqlParams = [name];
  } else {
    // If name is not provided, fetch all maturity data
    sql = 'SELECT * FROM maturity_date_data';
    sqlParams = [];
  }

  // Execute the SQL query
  db.query(sql, sqlParams, (error, results) => {
    if (error) {
      console.error('Error fetching maturity data:', error);
      res.status(500).json({ error: 'Failed to fetch maturity data' });
      return;
    }

    // Send the fetched data as JSON response
    res.status(200).json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
