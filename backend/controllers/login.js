const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/register");
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }
    const user = await User.findOne({ 
      email,
      issuperuser: false 
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    if (!user.isverified) {
      return res.status(403).json({ 
        message: "Please verify your email first and  Check your inbox [spam folder] for the verification link" 
      });
    }

    const token = jwt.sign(
      {
        user_id: user._id,
        username: user.username,
      },
      secretKey,
      { expiresIn: "48h" }
    );

    res.status(200).json({
      message: "User login successful",
      token
    });

  } catch (err) {
    console.error("Normal login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};




const superuser_login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ 
      username,
      issuperuser: true
    });

    if (!user) {
      return res.status(404).json({ error: "Superuser account not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!user.isverified) {
      return res.status(403).json({ 
        message: "Please verify your email first" 
      });
    }

    const token = jwt.sign(
      {
        user_id: user._id,
        username: user.username,
        issuperuser: true 
      },
      secretKey,
      { expiresIn: "48h" }
    );

    res.status(200).json({
      message: "Superuser login successful",
      token
    });

  } catch (err) {
    console.error("Superuser login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { login ,superuser_login};

