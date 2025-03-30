const calculatePoints = (currentQuestion, currentTimeTaken) => {
  const basePoints = currentQuestion;

  let multiplier;

  // Base case: if the time taken is <= 5 minutes
  if (currentTimeTaken <= 5) {
    multiplier = 100; // Full points for very quick answers
  } else if (currentTimeTaken > 5 && currentTimeTaken <= 10) {
    multiplier = 90; // Slight delay reduces points
  } else if (currentTimeTaken > 10 && currentTimeTaken <= 20) {
    multiplier = 70; // Moderate delay reduces points further
  } else if (currentTimeTaken > 20 && currentTimeTaken <= 30) {
    multiplier = 50; // Further delays reduce points more
  } else if (currentTimeTaken > 30 && currentTimeTaken <= 45) {
    multiplier = 30; // Significant delay reduces points considerably
  } else {
    multiplier = 20; // Extreme delay results in very few points
  }

  // Ensure multiplier is a valid number before calculating
  if (isNaN(multiplier)) {
    console.error('Invalid multiplier value:', multiplier);
    return 0; // Return 0 if something went wrong
  }

  return basePoints * multiplier; // Calculate points based on the time taken
};

module.exports = { calculatePoints };
