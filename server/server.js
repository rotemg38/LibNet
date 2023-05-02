const express = require('express')
const mongoose =  require("mongoose");
const books = require("./routes/booksRoutes");
const users = require("./routes/userRouter");
const borrowBook = require("./routes/borrowBookRouter");
const orderBook = require("./routes/orderBookRouter");
const ratings = require("./routes/ratingRoutes");
const requests = require("./routes/requestRoutes");
const forums = require("./routes/forumRoutes");
const discussions = require("./routes/discussionRoutes");
const messages = require("./routes/messageRoutes");

const http = require('http');
const app = express()
const server = http.createServer(app);
const io = require('socket.io')(server);
var cors = require('cors')

//app.use(cors())
app.use(cors({ origin: 'http://localhost:3001' }));


const pass = "LGTWKvafiyatoX3N"
const uri = "mongodb+srv://rotemg:"+pass+"@clusterlibnet.6wi0mvp.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(uri)
.then(res => console.log(`Connection Succesful ${res}`))
.catch(err => console.log(`Error in DB connection ${err}`));


// create application/x-www-form-urlencoded parser
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

//register the enpoints
app.use("/api/books", books);
app.use("/api/users", users);
app.use("/api/borrowBooks", borrowBook);
app.use("/api/orderBooks", orderBook);
app.use("/api/ratings", ratings);
app.use("/api/requests", requests);
app.use("/api/forums", forums);
app.use("/api/discussions", discussions);
app.use("/api/messages", messages);

//for realtime messages in forum
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('message', (message) => {
    console.log('Received message:', message);
    io.emit('message', message);
  });
});


server.listen(3000,()=>{console.log("Server started on port 3000")})