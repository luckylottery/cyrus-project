const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
const fs = require('fs-extra');
const path = require('path');
const Validator = require('jsonschema').Validator;
const v = new Validator();

let ads = [];
fs.readdirSync(path.join(__dirname, `../ads`)).forEach(file => {
    ads.push(file);
});

app.get('/serve', async (req, res) => {

    res.sendFile(path.join(__dirname, `../ads/${ads[Math.floor(Math.random() * ads.length)]}`));
});

module.exports = app;