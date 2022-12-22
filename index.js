const express = require("express");

const app = express();

const cors = require("cors");

const connection = require("./config/db");

const jobsRouter = require("./routes/jobs.routes");

require("dotenv").config();

const { PORT } = process.env || 8000 ;

app.use(express.json());

app.use(cors());

app.use("/jobs",jobsRouter);

app.get("/",(req,res)=>{
    res.send("<h1>Welcome to Home Page!");
});


app.listen(PORT,async()=>{
    try {
        connection;
        console.log("Connected with the database.");
        console.log(`Server is running on the localhost port : ${PORT}`);
    } catch (error) {
        console.log("Something went wrong in connectiong with the database.");
    }
});

