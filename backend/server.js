const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');  // Import http module
const socketIo = require('socket.io');  // Import socket.io
const connectDB = require('./config/db');
const recyclingCenterRoutes = require('./routes/recyclingCenterRoutes');
const driverRoutes = require('./routes/driverRoutes');
const truckRoutes = require('./routes/truckRoutes'); 
const binRoutes = require('./routes/binRoutes'); 

dotenv.config();
connectDB();  // Connect to MongoDB

const app = express();
const server = http.createServer(app);  // Create an HTTP server with Express
const io = socketIo(server);  // Initialize Socket.IO on the server

app.use(cors());
app.use(express.json());  // Allows us to parse JSON requests

// Define your API routes
app.use('/api/recycling-centers', recyclingCenterRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/trucks', truckRoutes);
app.use('/api/bins', binRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
module.exports = { io };  // Export io for use in other files
