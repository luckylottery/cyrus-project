const express = require('express');
const rateLimit = require("express-rate-limit");
const app = express();
const cors = require('cors');
app.use(cors());
const createError = require('http-errors')
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
const Joi = require('joi');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const mailer = require('../misc/mailer');
const bcrypt = require('bcryptjs');
const saltRounds = 14;
const fs = require('fs-extra');
const path = require('path');
const jsonfile = require('jsonfile');
const multer = require('multer');
const uniqueSlug = require('unique-slug');
const toSlug = require('slug');
const { check, validationResult, body, param, query } = require('express-validator');
const os = require('os');
const crypto = require('crypto');
const models = require('../models');
const dotenv = require('dotenv').config();
const request = require('request');
const requestPromiseNative = require('request-promise-native');
const Validator = require('jsonschema').Validator;
const v = new Validator();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/checkout', async (req, res) => {

  console.log('checkout!')
  const productIds = [
    'price_1KDMEwGi5Tu5mGHH6kePKQMZ', // 500
    'price_1KDMGPGi5Tu5mGHHcgV3eV6I', // 2,000
    'price_1KDMKDGi5Tu5mGHHdpOOa4Gf', // 10,000
  ]

  const session = await stripe.checkout.sessions.create({

    line_items: [
      {
        // BUY 500 CREDITS EVERY TIME
        price: productIds[0],
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `https://www.mathbanana.com/?success=true`,
    cancel_url: `https://www.mathbanana.com/?canceled=true`,
  });

  res.json({'session': session.url});
});

module.exports = app;