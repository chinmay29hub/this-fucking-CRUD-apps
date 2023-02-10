import express from "express"
import cors from "cors"
import morgan from "morgan"
// var bodyParser = require('body-parser');
import bodyParser from "body-parser"
import connect from "./database/connection.js"
import router from "./router/route.js"
// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');


const app = express()
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
       res.sendStatus(200);
     }
     else {
       next();
     }});

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
// middleware
app.use(express.json())
app.use(morgan("tiny"))
app.disable("x-powered-by")



const port = 4000

// http request
app.get("/", (req, res) => {
    res.status(201).json("Home get request")
})

// routes
app.use("/api", router)

connect().then(() => {
    try {
        app.listen(port, () => {
            console.log("Listening on " + port)
        })
    } catch (error) {
        console.log("Cannot Connect to the Server")
    }
}).catch(error => console.log("Invalid Database Connection"))