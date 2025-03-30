const mongoose = require('mongoose');

const mongoconnect = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('MongoDB URI is not defined in the environment variables');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = mongoconnect;
