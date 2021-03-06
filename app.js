const express = require('express')
const app = express()
const PORT = 5000
const mongoose = require('mongoose')
    // const MONGODBURI = require('./keys')
var cors = require('cors')
var bodyParser = require('body-parser')




app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));


mongoose.connect("mongodb+srv://uzair:PWK6z6lbsofmWdnU@cluster0.mg7j7.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log('connected to MOngo DB')
})
mongoose.connection.on('error', (err) => {
    console.log('error connecting', err)
})



// importing models
require('./models/user')
require('./models/post')



// importing routes
app.use(express.json())
app.use(require('./Routes/auth'))
app.use(require('./Routes/postRoute'))
app.use(require('./Routes/user'))



app.get('/', (req, res) => {
    res.send("hello world")

})

app.listen(PORT, () => {
    console.log('Server is runing on Port :', PORT)
})