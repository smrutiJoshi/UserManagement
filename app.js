require('dotenv').config();
const express = require("express");
const app = express();
const userRouter = require("./routes/user/user.router");

var bodyParser = require('body-parser');

//parse request of content type:= application/form
var urlencoderParser = bodyParser.urlencoded({extended:false});

app.use(bodyParser.json())
app.use('/upload', express.static('upload'))
app.use("/api/", userRouter);
app.listen(process.env.APP_PORT, ()=>{
    console.log("Server started on PORT :", process.env.APP_PORT);
});