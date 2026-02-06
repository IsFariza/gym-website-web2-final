
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const dbConfig = require('./app/config/db.config')

const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(dbConfig.url)
    .then(() => { console.log("MongoDB connected") })
    .catch((e) => {console.error(e)})


app.get('/', (req, res) => {
    res.json({message: "gym api is running"})
})
app.listen(process.env.PORT, () =>{
    console.log('Server running')
})