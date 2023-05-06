// server.js
import http from 'http';
import app from '../app.js'; // Import the app object from app.js

const port = process.env.PORT || 3000; // Define the port for the server
app.set('port', port); // Set the port on the app object

const server = http.createServer(app); // Create an HTTP server using the app object
server.listen(port); // Start the server and listen on the specified port
