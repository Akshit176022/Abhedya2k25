const User = require('../Models/register.js');
const { calculatePoints } = require('../utils/calculatePoints.js');

const updateStats = async (req, res, next) => {
  const { username, currentQuestion, currentTimestamp } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const initialTimestamp = user.initialTimestamp;
    const currentTimeTaken = (currentTimestamp - initialTimestamp) / (1000 * 60); 

    const pointsForQuestion = calculatePoints(currentQuestion, currentTimeTaken);

    if (isNaN(pointsForQuestion) || pointsForQuestion < 0) {
      console.error('Invalid points calculated for question:', pointsForQuestion);
      return res.status(400).json({ error: 'Invalid points calculation' });
    }


    user.points = (user.points || 0) + pointsForQuestion;
    user.totalTime = (user.totalTime || 0) + currentTimeTaken;
    user.currentQuestion = currentQuestion;
    user.initialTimestamp = currentTimestamp;
    user.currentTimestamp = null; 
    user.timeTakenArray.push(currentTimeTaken); 

    await user.save();
    next(); 
  } catch (error) {
    console.error('Error in updateStats middleware:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

module.exports = updateStats;
