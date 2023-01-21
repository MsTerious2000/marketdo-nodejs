const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ip = require('ip')

const app = express()
const connection = mongoose.connection

const userRoute = require('./routes/user_route')

const mongoUrl = 'mongodb+srv://admin:admin123@cluster0.1m3dy.mongodb.net/marketdo'

mongoose.set('strictQuery', true)
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


connection.once('open', () => {
    console.log(`CONNECTED TO MONGODB: ${connection.host}`)
})

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/users', userRoute)

const PORT = process.env.PORT || 2023
const IP = ip.address()
app.listen(PORT, '0.0.0.0', () => {
    console.log(`SERVER IS ONLINE ON\n${IP}:${PORT}`)
    console.log('------------------------------')
    console.log('CONNECTING TO DATABASE...')
})