const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require("cors");
const path = require('path');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());
app.use(cors());
dotenv.config();
connectDB();
const PORT = process.env.PORT || 1500;

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/task', taskRoutes);
//testing
app.use('/api/v1/test', testRoutes);
app.get('/', (req, res) => {
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log("Welcome to TrackList");  
});