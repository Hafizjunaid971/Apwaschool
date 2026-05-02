const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Routes Import
const staffRoutes = require('./routes/staffRoutes');
const studentRoutes = require('./routes/studentRoutes'); // <--- YE LINE ADD KARI HAI
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.log("MongoDB Connection Error: ", err));

// Routes Use
app.use('/api/staff', staffRoutes);
app.use('/api/students', studentRoutes); // <--- YE LINE ADD KARI HAI
app.use('/api/auth', authRoutes);
// Test Route
app.get('/', (req, res) => {
  res.json({ message: "School Backend is Running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});