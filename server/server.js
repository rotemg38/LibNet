const express = require('express')
const mongoose =  require("mongoose");
const books = require("./routes/booksRoutes");
const users = require("./routes/userRouter");
const borrowBook = require("./routes/borrowBookRouter");
const orderBook = require("./routes/orderBookRouter");

const app = express()
var cors = require('cors')

app.use(cors())

const pass = "LGTWKvafiyatoX3N"
const uri = "mongodb+srv://rotemg:"+pass+"@clusterlibnet.6wi0mvp.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(uri)
.then(res => console.log(`Connection Succesful ${res}`))
.catch(err => console.log(`Error in DB connection ${err}`));

app.listen(3000,()=>{console.log("Server started on port 3000")})


// create application/x-www-form-urlencoded parser
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

//register the enpoints
app.use("/api/books", books);
app.use("/api/users", users);
app.use("/api/borrowBooks", borrowBook);
app.use("/api/orderBooks", orderBook);