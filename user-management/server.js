const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')
const connectDB = require('./server/database/connection');

const app = express()

dotenv.config({path : "config.env"})
const PORT = process.env.PORT || 3000

// log requests
app.use(morgan("tiny"))

// mongodb connection
connectDB()

// parse request to body-parser
app.use(bodyparser.urlencoded({extended : true}))

// set view engine
app.set("view engine", "ejs")
// app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use("/css", express.static(__dirname + '/assets/css'))
app.use("/img", express.static(__dirname + '/assets/img'))
app.use("/js", express.static(__dirname + '/assets/js'))

app.use("/", require("./server/routes/router"))

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})