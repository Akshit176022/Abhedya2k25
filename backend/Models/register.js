const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    // match: [/^\d{2}[a-z]{3}\d{3}@nith\.ac\.in$/]
  },
  phone: {
    type: String,
    trim: true
  },
  rollNo: {
    type: String,
    trim: true,
  },
  isverified:{
    type: Boolean,
    default: false
  },
  token:{
    type: String
  },

  currentQuestion:{
    type:  Number,
    default: 1,

  },

  timeTakenArray: {
    type: [Number], 
    default: [],    
  },

  totalTime: {
    type: Number,
    default: 0,
  },

  points: {
    type: Number,
    default: 0,
  },

  initialTimestamp: {
    type: Number,
    default: 1709073600000, 
  },

 currentTimestamp : {
    type: Number,
    default: null, 
  },
  issuperuser: {
    type: Boolean,
    default : false,
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('User_register', RegisterSchema);

