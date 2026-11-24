
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => console.log(err));

// Student Schema
const Student = mongoose.model("Student", {
    name: String,
    rollNo: String,
    department: String,
    marks: Number,
    cgpa: Number
});

// Home Route
app.get("/", (req, res) => {
    res.send("Student Academic Information System");
});

// Add Student
app.post("/add", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.send("Student Added Successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// View Students
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Server Port
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
