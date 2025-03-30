// controllers/leaderboard.js
const User = require('../Models/register.js');


const updateLeaderboard = async (io) => {
  if (!io) {
    console.error('Socket.IO instance not provided');
    return;
  }

  try {
    const leaderboard = await User.find().sort({
      currentQuestion: -1,
      totalTime: 1
    });

    io.emit('leaderboard', leaderboard);
  } catch (error) {
    console.error('Error emitting leaderboard:', error);
  }
};

module.exports = { updateLeaderboard };