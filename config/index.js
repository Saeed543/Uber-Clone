const dotenv = require('dotenv')

dotenv.config()

const SERVER_PORT = process.env.SERVER_PORT
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const CLIENT_URL = process.env.CLIENT_URL
const REACT_APP_URL = process.env.REACT_APP_URL
const MONGO_DB_URL = process.env.MONGO_DB_URL

module.exports = {
    SERVER_PORT,
    CLIENT_ID,
    CLIENT_SECRET,
    CLIENT_URL,
    REACT_APP_URL,
    MONGO_DB_URL
}