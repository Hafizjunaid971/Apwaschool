const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// POST Route - Contact Form
router.post('/', async (req, res) => {
  const { name, phone, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ success: false, message: "Sab fields zaroori hain!" });
  }

  try {
    // SdeMTP Transporter create karo
    debugger
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports (587 ke liye false)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email ka content HTML mein
    const mailOptions = {
      from: `"APWA School Website" <${process.env.SMTP_USER}>`,
      to: process.env.OWNER_EMAIL, // Tumhara email
      bcc: process.env.BCC_EMAIL,  // BCC email
      subject: `🔔 New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px;">New Contact Form Submission</h2>
          <p style="font-size: 16px;"><strong>👤 Name:</strong> ${name}</p>
          <p style="font-size: 16px;"><strong>📞 Phone Number:</strong> ${phone}</p>
          <p style="font-size: 16px;"><strong>💬 Message:</strong></p>
          <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #1e3a8a; margin-top: 10px; border-radius: 4px;">
            <p style="margin: 0; font-size: 15px;">${message}</p>
          </div>
          <hr style="margin-top: 20px; border: none; border-top: 1px solid #ddd;">
          <p style="color: #888; font-size: 12px;">This email was sent from APWA School Contact Page.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ success: false, message: "Email bhejne mein error aayi." });
  }
});

module.exports = router;