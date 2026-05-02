// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');

// // Routes Import
// const staffRoutes = require('./routes/staffRoutes');
// const studentRoutes = require('./routes/studentRoutes'); // <--- YE LINE ADD KARI HAI
// const authRoutes = require('./routes/authRoutes');

// dotenv.config();
// // ✅ YAHAN SIRF CORS UPDATE KIYA HAI (PEHLE SIRF app.use(cors()) THA)
// app.use(cors({
//     origin: ["http://localhost:3000", "https://apwaschool-wzbh.vercel.app"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Database Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected Successfully!"))
//   .catch((err) => console.log("MongoDB Connection Error: ", err));

// // Routes Use
// app.use('/api/staff', staffRoutes);
// app.use('/api/students', studentRoutes); // <--- YE LINE ADD KARI HAI
// app.use('/api/auth', authRoutes);
// // Test Route
// app.get('/', (req, res) => {
//   res.json({ message: "School Backend is Running!" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Routes Import
const staffRoutes = require('./routes/staffRoutes');
const studentRoutes = require('./routes/studentRoutes'); 
const authRoutes = require('./routes/authRoutes');

dotenv.config();

// ✅ 1. SABSE PEHLE APP INITIALIZE KARO
const app = express();

// ✅ 2. EK BAAR CORS SET KARO (DOBARA WALA HATA DIYA)
app.use(cors({
    origin: ["http://localhost:3000", "https://apwaschool-wzbh.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.log("MongoDB Connection Error: ", err));

// Routes Use
app.use('/api/staff', staffRoutes);
app.use('/api/students', studentRoutes); 
app.use('/api/auth', authRoutes);

// Test Route
app.get('/', (req, res) => {
  res.json({ message: "School Backend is Running!" });
});

const PORT = process.env.PORT || 5000;

// ✅ 3. VERCEL DEPLOYMENT LOGIC
if (process.env.NODE_ENV === 'production') {
  module.exports = app;
} else {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}