const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors')
const bodyParser = require('body-parser')
let aylienData = {};
const AYLIENTextAPI = require('aylien_textapi');
const aylienAPI = new AYLIENTextAPI({
    application_id: '0358ff9c',
    application_key: '146da0d7114c5082c88d5a5e732bdfc0'
});

// application_id: process.env.API_ID,
// application_key: process.env.API_KEY

const app = express()
app.use(cors())
app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post('/aylien', function (req, response) {
    let newURL = req.body.url;
    aylienAPI.sentiment({url: newURL}, function(err,res) {
        if(err === null){
            aylienData.polarity = res.polarity;
            aylienData.polarity_confidence = res.polarity_confidence;
            aylienData.subjectivity = res.subjectivity;
            aylienData.subjectivity_confidence = res.subjectivity_confidence;
            response.send(aylienData);
        } else {
            console.log(`You encountered the following error: ${err}`)
        }
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8081;
}

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log('Example app listening on port 8081!')
})