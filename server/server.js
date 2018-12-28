// --- Requires --- //

const express = require('express');
const bodyParser = require('body-parser');

// --- Global Constants and Variables --- //

const app = express();
const PORT = process.env.PORT || 5000;

let employeeList = [];

// --- Setup --- //

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// --- Define Response to HTTP Requests --- //

// Responds to a client GET request. Sends back the current list of employees.
app.get('/employee', (req, res) => {
    res.send(employeeList);
});

// Responds to a client POST request. Appends a new employee to the list of
// employees.
app.post('/employee', (req, res) => {
    let employeeToAdd = req.body;
    employeeList.push(employeeToAdd);
    res.sendStatus(201);
});

// --- Start the Server --- //

app.listen(PORT, function() {
    console.log('Server listening on Port:', PORT); 
});