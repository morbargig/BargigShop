
const path = require('path')
const express = require('express')
const app = express()
const api = require('./server/routes/api')
const mongoose = require('mongoose')

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/api', api)

const port = process.env.PORT || 80
const DBname = 'BargigShop'
const MongoDBUri = process.env.MONGODB_URI || `mongodb://localhost/${DBname}`

console.log(port, MongoDBUri, process.env)

mongoose.connect(MongoDBUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .catch(e => { console.log(e); process.exit() })
    .then(() => {
        app.listen(port, () => console.log(`Running server on port ` + port))
    })