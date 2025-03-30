// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectdb = require('./Mongodb/connectdb.js');
require('dotenv').config();

const { submitAnswer, updateLeaderboard } = require('./controllers/leaderboard.js');
const { registerUser, verifyUser } = require('./controllers/register.js');
const { login,superuser_login } = require('./controllers/login.js');
const { Sdelete, Supdate, Sadd, Sget,addQuestion,updateQuestion, Sgetques,Sdeleteques, createSuperuser } = require('./controllers/superuser.js');
const { loadquestion } = require('./controllers/question.js');
const { validateanswer } = require('./controllers/question.js');
const { verifyToken, Superuser } = require('./MIddlewares/authentication.js');
const updateStats = require('./MIddlewares/updateStats.middleware.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const { getProgress, saveProgress,getCurrentUser } = require("./controllers/progress.js");



const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('./public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// MongoDB connection
connectdb();

// Routes
app.post('/register', registerUser);
app.get('/verify/:token', verifyUser);
app.post('/login', login);

app.get("/getProgress", verifyToken, getProgress);
app.post("/saveProgress", verifyToken, saveProgress);

// FOR SUPER USER
app.post("/slogin",superuser_login)
app.delete('/sdelete', verifyToken, Superuser, Sdelete);
app.post('/sadd', verifyToken, Superuser, Sadd);
app.get('/sget', verifyToken, Superuser, Sget);
app.put('/supdate', verifyToken, Superuser, Supdate);
app.post('/saddques', addQuestion);
app.put('/squesupdate', verifyToken, Superuser, updateQuestion);
app.get('/sgetques', verifyToken, Superuser, Sgetques);
app.delete('/sdeleteques', verifyToken, Superuser, Sdeleteques);

app.post('/vali',verifyToken, validateanswer,(req, res) => validateanswer(req, res, io));
app.get('/get/:id', verifyToken,loadquestion);
app.get('/board', updateLeaderboard);
app.post('/create-superuser', createSuperuser);

app.post('/submit', updateStats, (req, res) => submitAnswer(req, res, io));
app.get('/me', verifyToken, getCurrentUser);

io.on('connection', (socket) => {
  console.log('A user connected');
  updateLeaderboard(io);

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
