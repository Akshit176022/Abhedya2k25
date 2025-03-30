const User = require("../Models/register");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
require('dotenv').config();
const crypto = require('crypto');

// const emailQueue = new Queue('emailQueue', {
//   redis: {
//     host: process.env.REDIS_HOST, 
//     port: process.env.REDIS_PORT,  
//   },
// });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// emailQueue.process(async (job, done) => {
//   const { email, token } = job.data;
//   const verificationUrl = `${process.env.BASE_URL}/verify/${token}`;

//   try {
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Email Verification Reminder',
//       html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
//     });

//     console.log(`Verification email sent to ${email}`);
//     done(); 
//   } catch (error) {
//     console.error(`Failed to send email to ${email}: ${error.message}`);
//     await job.moveToFailed({ 
//       attemptsMade: job.attemptsMade,
//       error: error.message,
//     });
//     done(error); 
//   }
// });

const registerUser = async (req, res) => {
  const { username, password, email, phone, rollNo } = req.body;
  if (!username || !password || !email || !phone || !rollNo) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      if (userExists.isverified) {
        return res.status(400).json({ message: "User already exists. Please log in." });
      }
      return res.status(400).json({ message: "User exists but is not verified. Please verify your email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const generateVerificationToken = () => {
      return crypto.randomBytes(32).toString('hex');
    };
    const token = generateVerificationToken();

    const user = new User({
      username,
      password: hashedPassword,
      email,
      phone,
      rollNo,
      token,
    });

    await user.save();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      html: `<p>Welcome to ABHEDYA 4.0. Click on the link to verify your email.</p> ${process.env.BASE_URL}/verify/${token}`,
    });

    return res.status(201).json({ message: "User registered successfully. Check your email for verification link" });
  } catch (err) {
    console.error("Error registering user:", err.message);
    return res.status(500).json({ error: "User not registered", message: err.message });
  }
};

const verifyUser = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid verification token' });
    }
    if (user.isverified) {
      return res.status(400).json({ message: 'User is already verified' });
    }

    user.isverified = true;
    user.token = null;
    await user.save();
    return res.status(200).json({ message: 'User verified successfully' });
  } catch (err) {
    console.error("Error verifying user:", err.message);
    return res.status(500).json({ error: 'Verification failed', message: err.message });
  }
};

module.exports = { registerUser, verifyUser };