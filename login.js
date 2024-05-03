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

// http://localhost:8081/name/prakash
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

// GET user by username endpoint
app.get("/user/:username", (req, res) => {
    const username = req.params.username;

    // Here you would typically fetch user data from a database based on the username
    // For demonstration, let's assume we have a hardcoded list of users
    const users = [
        { username: 'aryan', name: 'Aryan', address: '123' },
        { username: 'sai', name: 'sai', address: '456' }
    ];

    const user = users.find(user => user.username === username);

    if (user) {
        res.json(user);
    } else {
        res.status(404).end("User not found");
    }
});

// http://localhost:8084/
app.listen(8084, () => console.log("Application started"));