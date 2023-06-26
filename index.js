const express = require('express');
const {userController} = require("./routes/user.routes")
const {notesController} = require("./routes/notes.routes")
const {connection} = require("./config/db")
const {authenticate} = require('./middlewares/authentication')
const cors = require('cors')
//hello
const app = express();
require('dotenv').config()
app.use(cors())

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/user", userController);

app.use(authenticate)

app.use("/notes", notesController)

connection.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Connected to Database");
    })
})
