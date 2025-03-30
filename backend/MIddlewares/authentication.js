const jwt = require("jsonwebtoken");
const User = require("../Models/register");


const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: "Authorization token required" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.user_id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = {
      id: user._id,
      username: user.username,
      isSuperuser: user.issuperuser
    };

    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

const Superuser = async (req, res, next) => {

  await verifyToken(req, res, () => {}); 
  
  if (!req.user?.isSuperuser) {
    return res.status(403).json({ error: "Superuser privileges required" });
  }
  
  next();
};
module.exports = {verifyToken,Superuser}