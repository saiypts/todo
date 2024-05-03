const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());

//GET Request (ENDPOINTS)
app.get("/", (req, res) => {
    res.end("Hello world");
});

app.get("/about", (req, res) => {
    res.end("Welcome to the about page");
});

// http://localhost:8082/name/prakash
app.get("/name/:myname", (req, res) => {
    res.end("Welcome " + req.params.myname);
});

// Login endpoint
app.post("/login", (req, res) => {
    const { username, pass } = req.body;

    if (username === "aryan" && pass === "123") {
        res.end("Logged in successfully");
    } else {
        res.end("Incorrect credentials");
    }
});

// Register endpoint
app.post("/register", (req, res) => {
    const body = req.body;
    const { name, address, username, pass } = body;

    // Check if all required fields are provided
    if (!name || !address || !username || !pass) {
        return res.status(400).end("All fields are required");
    }

    // Here you would typically save the user data to a database, but for this example, we'll just send back a success message.
    res.end("User registered successfully");
});

// http://localhost:8082/
app.listen(8082, () => console.log("Application started"));