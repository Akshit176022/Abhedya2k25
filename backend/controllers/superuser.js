const User = require("../Models/register");
const Question = require ("../Models/questions");
const bcrypt = require('bcrypt');


const createSuperuser = async (req, res) => {
  try {
    const SUPERUSER_SECRET = process.env.SUPERUSER_SECRET;
    const { secret, username, password, email } = req.body;

    if (secret !== SUPERUSER_SECRET) {
      return res.status(403).json({ error: "Invalid superuser secret" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const superuser = new User({
      username,
      email,
      password: hashedPassword,
      issuperuser: true,
      isverified: true 
    });

    await superuser.save();
    res.status(201).json({ message: "Superuser created" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




const Sadd = async (req,res) =>{
  try {
    const { username, password, email, phone, rollNo, issuperuser, currentQuestion,totalTime, points } = req.body;

    if (!username || !password || !email || !phone || !rollNo) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const userExists = await User.exists({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists. Please log in." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      phone,
      rollNo,
      issuperuser,
      currentQuestion,
      totalTime,
      points,
      isverified : true,

    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }   
}


const Sdelete = async  (req,res ) =>{

try{
    const {username} = req.body;
    const user = await User.findOne({username})
    if (!user){
        console.log("NO user exits with this user name");
    }
    await user.deleteOne();
    return res.status(200).json({ message: "User deleted successfully" });
}
catch(error){
    console.error("Error in deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
}    
}

const Sget =  async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch users', message: err.message });
    }
  };

  const Supdate = async (req, res) => {
    try {
      const { username, updateddata } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(420).json({ message: "User not found" });
      }
  
      const updated = await User.findOneAndUpdate(
        { username },
        { $set: updateddata },
        { new: true }
      );
  
      res.status(200).json({ message: "User updated successfully", updated });
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).json({ error: "Internal server error", details: err.message });
    }
  };
  const addQuestion = async (req, res) => {
    try {
      const { id, question, answer, mediaItems } = req.body; // Changed from driveUrls to mediaItems
      
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Valid numeric ID is required' });
      }
      if (!question) {
        return res.status(400).json({ error: 'Question text is required' });
      }
      if (!answer) {
        return res.status(400).json({ error: 'Answer is required' });
      }
      const hashedAnswer = await bcrypt.hash(answer, 10);
      const media = [];
      if (mediaItems && Array.isArray(mediaItems)) { // Changed from driveUrls to mediaItems
        mediaItems.forEach(item => {
          if (typeof item.url === 'string' && item.type) { // Now checking for both url and type
            media.push({ 
              url: item.url,
              type: item.type 
            });
          }
        });
      }
  
      const newQuestion = new Question({
        id: Number(id),
        question,
        media,
        answer: hashedAnswer
      });
  
      await newQuestion.save();
      
      res.status(201).json({ 
        success: true,
        message: 'Question added successfully', 
        question: {
          id: newQuestion.id,
          question: newQuestion.question,
          media: newQuestion.media
        }
      });
  
    } catch (err) {
      console.error('Error adding question:', err);
      
      if (err.code === 11000) {
        return res.status(400).json({ 
          success: false,
          error: 'Question ID already exists' 
        });
      }
      res.status(500).json({ 
        success: false,
        error: 'Internal server error', 
        ...(process.env.NODE_ENV === 'development' && { details: err.message })
      });
    }
};

const updateQuestion = async (req, res) => {
    try {
        const { id, question, answer, mediaItems } = req.body; // Changed from driveUrls to mediaItems

        // Validate ID
        if (!id || isNaN(id) || id < 1) {
            return res.status(400).json({ 
                success: false,
                error: 'Valid positive numeric ID is required' 
            });
        }

        // Validate at least one field is provided
        if (!question && !answer && !mediaItems) { // Changed from driveUrls to mediaItems
            return res.status(400).json({
                success: false,
                error: 'At least one field (question, answer, or mediaItems) must be provided'
            });
        }

        // Prepare updates
        const updates = {};
        if (question) updates.question = question.toString().trim();
        if (answer) updates.answer = await bcrypt.hash(answer.toString().trim(), 10);
        
        // Process media URLs
        if (mediaItems) { // Changed from driveUrls to mediaItems
            if (!Array.isArray(mediaItems)) {
                return res.status(400).json({
                    success: false,
                    error: 'mediaItems must be an array'
                });
            }
            
            updates.media = mediaItems
                .filter(item => typeof item.url === 'string' && item.url.trim() !== '' && item.type)
                .map(item => ({ 
                    url: item.url.trim(),
                    type: item.type
                }));
        }

        // Update question
        const updatedQuestion = await Question.findOneAndUpdate(
            { id: Number(id) },
            { $set: updates },
            { 
                new: true,
                runValidators: true,
                lean: true,
                projection: { _id: 0, answer: 0 } 
            }
        );

        if (!updatedQuestion) {
            return res.status(404).json({ 
                success: false,
                error: `Question with ID ${id} not found` 
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Question updated successfully',
            data: updatedQuestion
        });

    } catch (err) {
        console.error('Error updating question:', err);
        
        // Handle specific errors
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: err.message
            });
        }
        
        if (err.code === 11000) {
            return res.status(409).json({ 
                success: false,
                error: 'Question ID already exists' 
            });
        }
        
        return res.status(500).json({ 
            success: false,
            error: 'Internal server error', 
            ...(process.env.NODE_ENV === 'development' && { details: err.message })
        });
    }
};

const Sgetques =  async (req, res) => {
    try {
      const users1 = await Question.find();
      res.status(200).json(users1);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch users', message: err.message });
    }
  };

  const Sdeleteques = async (req, res) => {
    try {
      const { id } = req.body;
      const question = await Question.findOne({ id });
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
  
      await question.deleteOne();
      return res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
      console.error("Error deleting question:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


module.exports = {Sadd, Sdelete,Sget,Supdate,addQuestion,updateQuestion,Sgetques,Sdeleteques,createSuperuser }
