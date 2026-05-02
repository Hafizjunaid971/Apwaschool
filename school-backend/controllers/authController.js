const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Signup API
exports.signup = async (req, res) => {
    try {
        const { email, password, phoneNumber } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const user = new User({ email, password, phoneNumber });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ success: true, token, user: { id: user._id, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login API
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await user.comparePassword(password); // Ye method .env se call hoga
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ success: true, token, user: { id: user._id, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};