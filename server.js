// Import the express library
const express = require('express');

// Create an instance of express
const app = express();

// Set the port number to 80
const port = 80;

// Serve static files from the 'frontend/dist' directory
app.use(express.static('frontend/dist'));

// Start the server and listen on port 80
app.listen(port, () => {
  console.log('Server has been started on port 80...');
});