import express from "express"
import cors from "cors"
import morgan from "morgan"
import connect from "./database/connection.js"
import router from "./router/route.js"
// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');


const app = express()

// middleware
app.use(express.json())
app.use(cors())
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
