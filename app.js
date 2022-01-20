/*
Copyright Cyrus Cuenca. Do not redistribute.
*/

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('./config/passport');
require('dotenv').config();
const rateLimit = require("express-rate-limit");

// For console logging objects
const util = require('util');
require('./config/connection');

// Models
const models = require('./models');

// Cross Origin Requests package and trueskill for rankings
const cors = require('cors');

var app = express();
app.use(morgan('dev'));
app.use(cors());

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'mynamejeff',
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success');
  res.locals.error_messages = req.flash('error');
  res.locals.isAuthenticated = req.user ? true : false;
  next();
});

app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));
app.use('/pay', require('./routes/pay'));
app.use('/ads', require('./routes/ads'));
//app.use('/frontend', require('./routes/frontend'));

// 4️⃣0️⃣4️⃣ Catch 404 and forward to error handler
/*
app.use((req, res, next) => {
  res.render('notFound');
});
*/

let server = app.listen(5000, () => console.log('Server started listening on port 5000'));

module.exports = app;
