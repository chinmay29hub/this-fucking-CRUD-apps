const dotenv = require('dotenv')

dotenv.config({path : "config.env"})

const API_KEY = process.env.API_KEY

module.exports = API_KEY

