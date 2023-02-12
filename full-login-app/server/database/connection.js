import mongoose from "mongoose"
import ENV from "../config.js"
// const mongoose = require('mongoose');
// const MongoMemoryServer = require('mongodb-memory-server');

async function connect() {
    // const mongod = await MongoMemoryServer.create()
    // const getUri = mongod.getUri()
    mongoose.set("strictQuery", true)
    // const db = await mongoose.connect(getUri)
    const db = await mongoose.connect(ENV.ATLAS_URI)
    console.log("Database Connected")
    

    return db
}

export default connect