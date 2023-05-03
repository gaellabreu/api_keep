require('dotenv').config({path: __dirname + '/.env'})
const auth = require('./routes/note')
const express = require('express')

const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors({
    origin: '*'
}))


// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(auth);

const port = 3001;

console.log('Running a 2nd time')
app.listen(port, () => console.log(`listening on port ${port}`))
module.exports = { app }