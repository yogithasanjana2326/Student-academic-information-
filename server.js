

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Student = require("./student");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("Database Error:", err));

// Home Route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Add Student
app.post("/add", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.json({
            message: "Student Added Successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// View Students
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
