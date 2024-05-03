require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express()

const conn = process.env.CONN;

app.use(bodyParser.json())

mongoose.connect(conn)
        .then(() => console.log('connected'))
        .catch(() => console.log('Error'))

const demoSchema = new mongoose.Schema({
    todoid: {
        type: Number,
        required: true
    },
    todotitle: {
        type: String,
        required: true
    },
    tododesc: {
        type: String,
        required: true
    },
    time: {
        type:String,
        required: true
    }
})

const user = mongoose.model('mymodel', demoSchema, 'demodata')

// GET Request (ENDPOINTS)
app.get("/", (req, res) => {
    res.end("Hello world")
})

app.get("/about", (req, res) => {
    res.end("welcome to about page")
})

// http://localhost:8086/name/aaryan
app.get("/name/:myname", (req, res) => {
    res.end("welcome " + req.params.myname)
})

// POST Request (ENDPOINTS)
// TODO:body-parser

app.post("/login", (req, res) => {
    const body = req.body;
    const username = body.username;
    const pass = body.pass;

    if(username === "aryan" && pass === 123)
        res.json({
            data: "success",
        })
    else 
        res.end("Incorrect creds")
})

app.post('/create', async (req, res) => {
    const body = req.body;

    const todoid = body.todoid;
    const todotitle = body.todotitle;
    const tododesc = body.tododesc;
    const time = body.time;

    const insertedUser = await user.create({todoid: todoid, todotitle: todotitle, tododesc: tododesc, time: time})

    res.json({msg: "User inserted successfully", data: insertedUser})
})

app.get('/id/:name', async (req, res) => {
    const name = req.params.name;

    const namedUser = await user.find({name: name})//.where('name').equals(name);

    res.json({msg: "success", data: namedUser})
})


// http://localhost:8091/
app.listen(8091, () => console.log("Application started"))