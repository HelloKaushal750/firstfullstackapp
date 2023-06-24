const express = require('express');
const {userController} = require("./routes/user.routes")
const {notesController} = require("./routes/notes.routes")
const {connection} = require("./config/db")
const {authenticate} = require('./middlewares/authentication')

const app = express();
require('dotenv').config()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/user", userController);

app.use(authenticate)

app.use("/notes", notesController)

app.listen(process.env.PORT,async ()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log("Error connecting to DB");
        console.log(error);
    }
})