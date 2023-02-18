const express = require('express');
const cors = require("cors")
const dotenv = require('dotenv');
const mongoose = require("mongoose")
const articleRouter = require("./routes/articles")
const Article = require("./models/article")
const methodOverride = require('method-override');
dotenv.config()

const app = express()

app.use(cors())

app.set("view engine", "ejs")

app.use(express.urlencoded({ extended : false }))
app.use(methodOverride("_method"))

app.use("/articles",articleRouter)

mongoose.set('strictQuery', false)
mongoose.connect(process.env.ATLAS_URI).then(() => {
    console.log("Connected to Atlas")
}).catch(error => console.log(error))

app.get("/", async (req, res) => {
    // res.send("hello world")
    const articles = await Article.find().sort({ createdAt : "desc" })
    res.render("articles/index", { articles : articles })
})

const port = process.env.PORT

app.listen(port, () => {
    console.log("Server Started on 4000")
})