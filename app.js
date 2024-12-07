const express = require('express');
const cors = require('cors');
const db = require('./utils/db');
require('dotenv').config();

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
// const initializeBookingsTable = require('./utils/initDb');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Railway Management System API!',
    status: 'Running',
  });
});

app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.status(200).json({
      message: 'Database is connected successfully!',
      data: rows,
    });
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    res.status(500).json({
      error: 'Failed to connect to the database.',
      details: error.message,
    });
  }
});

const startServer = async () => {
    try {
      const [result] = await db.query('SELECT 1');
      console.log('Database connected successfully:', result);
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error.message);
      process.exit(1);w
    }
  };
  
  startServer();
