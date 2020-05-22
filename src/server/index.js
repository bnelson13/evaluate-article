const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors')
const aylienData = {};
const AYLIENTextAPI = require('aylien_textapi');
const aylienAPI = new AYLIENTextAPI({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

const app = express()
app.use(cors())

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/aylien', function (req, res) {
    const url = req.body.url;
    aylienAPI.sentiment({url: url}, function (err, res) {
        if(!err) {
            aylienData.polarity = response.polarity;
            res.send(aylienData);
        } else {
            console.log(err);
        }
    })
});
