const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// const ip = require('ip')
// const IP = ip.address()
// const IP_AND_PORT = `SERVER IS ONLINE ON\n${IP}:${PORT}`

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

app.get('/', (req, res) => {
    return res.send('MARKETDO GODINEZ')
})
app.use('/users', userRoute)

const PORT = process.env.PORT || 2023
const PORT_ONLY = `SERVER IS ONLINE ON PORT: ${PORT}`
app.listen(PORT, '0.0.0.0', () => {
    console.log(PORT_ONLY)
    console.log('------------------------------')
    console.log('CONNECTING TO DATABASE...')
})