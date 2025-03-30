const User = require("../Models/register");

const getProgress = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      questionData: user.currentQuestionData,
      timeElapsed: user.timeElapsed || 0,
      isGameStarted: user.isGameStarted || false,
      isGameFinished: user.isGameFinished || false,
    });
  } catch (err) {
    console.error("Error fetching progress:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const saveProgress = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { questionData, timeElapsed, isGameStarted, isGameFinished } =
      req.body;

    user.currentQuestionData = questionData;
    user.timeElapsed = timeElapsed;
    user.isGameStarted = isGameStarted;
    user.isGameFinished = isGameFinished;

    await user.save();
    res.status(200).json({ message: "Progress saved successfully" });
  } catch (err) {
    console.error("Error saving progress:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};



const getCurrentUser = async (req, res) => {
  try {
    // User information is already available from verifyToken middleware
    const user = await User.findById(req.user.id)
      .select('-password -__v -issuperuser -isverified -createdAt -updatedAt');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      currentQuestion: user.currentQuestion,
      points: user.points,
      totalTime: user.totalTime
    });

  } catch (err) {
    console.error("Error getting current user:", err);
    res.status(500).json({ 
      error: "Internal server error",
      details: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};


module.exports = { getProgress, saveProgress ,getCurrentUser};
