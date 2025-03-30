const bcrypt = require('bcrypt');
const Question = require('../Models/questions');
const User = require('../Models/register');
const { updateLeaderboard } = require("../controllers/leaderboard");

const LAST_QUESTION_ID = 15;

const loadquestion = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { username } = req.user;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.currentQuestion > LAST_QUESTION_ID || user.hasCompletedGame) {
      return res.json({
        completed: true,
        message: "Congratulations! You've completed all questions!",
        points: user.points,
        totalTime: user.totalTime,
        hasCompletedGame: true
      });
    }

    if (id !== user.currentQuestion) {
      return res.status(403).json({
        error: `You should be answering question ${user.currentQuestion}`,
        currentQuestion: user.currentQuestion
      });
    }

    const question = await Question.findOne({ id });
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    if (!user.currentTimestamp || user.currentQuestion !== id) {
      await User.findByIdAndUpdate(user._id, {
        currentTimestamp: Date.now()
      });
    }

    res.json({
      id: question.id,
      question: question.question,
      media: question.media,
      currentQuestion: user.currentQuestion,
      points: user.points,
      totalTime: user.totalTime
    });

  } catch (err) {
    console.error("Error in loadquestion:", err);
    res.status(500).json({
      error: "Internal server error",
      details: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

const validateanswer = async (req, res) => {
  try {
    const { id, answer } = req.body;
    const { username } = req.user;

    if (!id || isNaN(id) || !answer || !username) {
      return res.status(400).json({
        error: "Valid question ID, answer, and username are required"
      });
    }

    const questionId = Number(id);
    const now = Date.now();

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.hasCompletedGame || user.currentQuestion > LAST_QUESTION_ID) {
      return res.status(400).json({
        error: "Game already completed",
        completed: true,
        message: "You've already completed all questions!"
      });
    }

    const question = await Question.findOne({ id: questionId });
    if (!question) return res.status(404).json({ error: "Question not found" });

    if (user.currentQuestion !== questionId) {
      const currentQuestion = await Question.findOne({
        id: user.currentQuestion
      });
      return res.status(400).json({
        error: `You should be answering question ${user.currentQuestion}`,
        currentQuestion: user.currentQuestion,
        questionDetails: currentQuestion || null
      });
    }

    const isCorrect = await bcrypt.compare(
      answer.toLowerCase().trim(),
      question.answer
    );

    const response = {
      isCorrect,
      timeTaken: 0,
      currentQuestion: user.currentQuestion,
      totalTime: user.totalTime,
      points: user.points,
      message: isCorrect ? "Correct answer!" : "Incorrect answer. Try again.",
      shouldClearInput: isCorrect,
      nextQuestion: null
    };

    if (isCorrect) {
      const timeTaken = user.currentTimestamp
        ? Math.floor((now - user.currentTimestamp) / 1000)
        : 0;

      response.timeTaken = timeTaken;
      response.totalTime = user.totalTime + timeTaken;
      response.points = user.points + 10;

      if (questionId === LAST_QUESTION_ID) {
        response.message = "Congratulations! You've completed all questions!";
        response.completed = true;

        await User.updateOne(
          { username },
          {
            $push: { timeTakenArray: timeTaken },
            $inc: { totalTime: timeTaken, points: 10 },
            currentTimestamp: null,
            hasCompletedGame: true,
            $set: { currentQuestion: LAST_QUESTION_ID + 1 }
          }
        );
      } else {
        const nextQuestionId = questionId + 1;
        const nextQuestion = await Question.findOne({ id: nextQuestionId });
        
        if (nextQuestion) {
          response.currentQuestion = nextQuestionId;
          response.nextQuestion = {
            id: nextQuestion.id,
            question: nextQuestion.question,
            media: nextQuestion.media
          };

          await User.updateOne(
            { username },
            {
              $push: { timeTakenArray: timeTaken },
              $inc: { totalTime: timeTaken, points: 10 },
              currentQuestion: nextQuestionId,
              currentTimestamp: now
            }
          );
        }
      }
    }

    const io = req.app.get('socketio');
    if (io && isCorrect) {
      try {
        await updateLeaderboard(io);
      } catch (socketError) {
        console.error('Leaderboard update error:', socketError);
      }
    }

    return res.json(response);

  } catch (err) {
    console.error("Validation error:", err);
    return res.status(500).json({
      error: "Internal server error",
      ...(process.env.NODE_ENV === "development" && { details: err.message })
    });
  }
};

module.exports = { validateanswer, loadquestion };