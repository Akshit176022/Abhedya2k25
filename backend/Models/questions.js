const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  question: {
    type: String,
    required: true
  },
  media: [{
    url: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['image', 'audio', 'video', 'document'],
      default: 'image'
    }
  }],
  answer: {
    type: String,
    required: true
  }
});

const Question = mongoose.model("questions", QuestionSchema);
module.exports = Question;