const express = require('express');
const router = express.Router();

// Import models
const models = require('../models');

const app = express();
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');

// Support json encoded bodies
app.use(bodyParser.json());

// Support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { layout: false });
});

app.get('/privacy', function (req, res) {
    res.render('privacy');
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/leagues', function (req, res) {
    res.render('leagues');
});

app.get('/users/:user/verify', async function (req, res) {
    const user = await models.User.findOne({where: {uuid: req.params.user}, attributes: ['id', 'username', 'email', 'roleId']});

    if(user && user.roleId === 0) {
        user.roleId = 1;
        user.save();

        return res.send('Your account has been verified!');
    } else if (!user) {

        res.status(404);
        return res.send('User does not exist');
    } else {
        
        return res.redirect('https://tactics.strife.gg/app/');
    }
});


module.exports = app;