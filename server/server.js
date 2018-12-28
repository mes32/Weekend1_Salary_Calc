// --- Requires --- //

const express = require('express');
const bodyParser = require('body-parser');

// --- Global Variables and Constants --- //

const app = express();
const PORT = process.env.PORT || 5000;

// --- Setup --- //

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// --- Define Response to HTTP Requests --- //

// --- Start the Server --- //

app.listen(PORT, function() {
    console.log('Server listening on Port:', PORT); 
});