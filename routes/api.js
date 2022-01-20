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
const AWS = require('aws-sdk');
const request = require('request');
const requestPromiseNative = require('request-promise-native');
const Validator = require('jsonschema').Validator;
const v = new Validator();

// Time based UUID generator
const uuidv1 = require('uuid/v1');
const short = require('short-uuid');
const translator = short();

// Language filter
const Filter = require('bad-words'), filter = new Filter();
filter.removeWords('h4x0r', 'poop', 'shiz');

function languageFilter (value, helper) {

  if (filter.isProfane(value)) {

    return helper.message('Submissions must not contain profanity!');
  }

  return true;
}

// 🆔 Verify user via bearer token
function verifyToken (req, res, next) {

  // ✊ Get auth header
  const bearerHeader = req.headers['authorization'];

  // 📄 Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {

    // 🔪 Split at the space
    const bearer = bearerHeader.split(' ');

    // ✊ Get token from array
    const bearerToken = bearer[1];

    // 🧼 Set the token
    req.token = bearerToken;

    jwt.verify(req.token, process.env.JWT_SECRET_TOKEN, (err, payload) => {

      if (err) {
        
        return next(createError.Unauthorized());
      }
    });

    next();
  } else {

    // 🚫 Forbidden
    res.sendStatus(403);
  }
}

app.post('/signin', passport.authenticate('local', { failWithError: true }),
  function (req, res) {

    const user = req.user.toJSON();
    const stripped = {
      'id': user.id,
      'uuid': user.uuid,
      'username': user.username,
      'tag': user.tag,
      'roleId': user.roleId
    }

    jwt.sign(stripped, process.env.JWT_SECRET_TOKEN, { expiresIn: '14d' }, (err, token) => {

      const { id, password, roleId, ...userInfo } = user;
      userInfo['token'] = token;

      return res.status(200).json(userInfo);
    });
  },
  function (err, req, res, next) {

    if (req.authError) {

      return res.status(req.authError.status).send({ ...req.authError });
    } else {

      console.log(err);
      return res.status(500).send(err);
    }
  }
);

// Validation Schema
const userSchema = Joi.object().keys({
  username: Joi.string().min(3).max(16).regex(new RegExp(/^[a-z][a-z0-9_ .-]*?/i)).custom(languageFilter).required(),
  email: Joi.string().max(36).email().required(),
  password: Joi.string().min(8).max(36).required()
});

app.post('/sign-up', async function (req, res, next) {

  try {

    const result = Joi.validate({ email: req.body.email, password: req.body.password, username: req.body.username }, userSchema);

    if (result.error) {

      throw { reason: 'Invalid / missing values for username &/ password &/ email!', status: 400, error: 'INVALID_ARGUMENTS' };
    }

    // 🔍 Checking if email is already taken
    const user = await models.User.findOne({
      where: {
        email: result.value.email.toLowerCase(),
        roleId: {
          [Op.gte]: 1
        }
      }
    });

    if (user) {

      throw { reason: 'Email is already in use!', status: 409, error: 'EMAIL_IN_USE' };
    }

    // 🔍 Checking if username has been used too many times
    const usernameCount = await models.User.count({
      where: {
        username: result.value.username
      }
    });

    if (usernameCount > 9999) {

      throw { reason: 'Username has been used too many times!', status: 409, error: 'USERNAME_UNAVAILABLE' };
    }

    const existingTags = await models.User.findAll({
      where: { username: result.value.username },
      attributes: ['tag'],
    });

    existingTags.map((r) => r.tag);

    const availableTags = [];

    for (let i = 0; i <= 9999; i++) {

      const tag = i.toString().padStart(4, '0');

      if (!existingTags.includes(tag)) {

        availableTags.push(tag);
      }
    }

    const randomIndex = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const length = availableTags.length;

    if (!length) {

      throw { reason: 'Usename not available', status: 409, error: 'USERNAME_CONFLICT' };
    }

    // 🔐 Hash the password
    bcrypt.hash(result.value.password, saltRounds, async function (err, hash) {

      let user = await models.User.create({
        secret: randomstring.generate(28),
        email: result.value.email.toLowerCase(),
        username: result.value.username,
        password: hash,
        roleId: 0,
        tag: availableTags[randomIndex(0, length)]
      });

      // 📧 Compose email
      const html = `
          Hey there!

          <br/>
          <br/>
              <i>If you didn't register for an account with Strife, please ignore this email.</i>
          <br/>
          <br/>

          Please verify your email by clicking this link:

          <br/>
              <a href="https://www.strife.gg/users/`+ user.uuid + `/verify">https://www.strife.gg/users/` + user.uuid + `/verify</a>
          <br/>
          <br/>

          Best,

          <br/>
          <br/>

          <b>Strife Staff</b>`;

      // Send email
      // await mailer.sendEmail('noreply@strife.gg', result.value.email, 'Please verify your email address', html);

      res.status(200).send({});
    });
  } catch (err) {

    console.log(err);
    if (err.status) {

      return res.status(err.status).send(err);
    }

    return res.status(500).send({ reason: 'Something went wrong!', status: 500 });
  }
});

app.get('/users/me', verifyToken, async (req, res) => {

  let decrypted = jwt.verify(req.token, process.env.JWT_SECRET_TOKEN);

  models.User.findOne({
    where: { id: decrypted.id },
    attributes: [
      'uuid',
      'email',
      'username',
      'tag',
      'roleId'
    ]
  }).then((user) => {

    user = user.toJSON();
    if (user) {

      user.token = req.token;
      return res.json(user);
    } else {

      return res.sendStatus(404);
    }
  }).catch(function (err) {

    console.log(err);
  });
});

app.get('/posts', [query('count').isNumeric({ min: 0, max: 16 }), query('parent').isString()], async (req, res) => {

  try {

    let count = ('count' in req.query) ? req.query.count : 8;
    let result = [];

    // Check if the client has provided a parent query param to get
    // children from
    if (req.query.parent) {

      const parent = await models.Post.findOne({
        where: {
          slug: req.query.parent
        },
        attributes: [
          'id'
        ]
      });

      if (!parent) {

        return res.sendStatus(404);
      }

      let children = await models.Post.findAll({
        where: {
          parentId: parent.id,
          hierarchyLevel: 2
        },
        attributes: [
          'id',
          'content',
          'edits',
          'slug',
          'createdAt',
          'updatedAt'
        ],
        include: {
          model: models.User,
          as: 'user',
          attributes: [
            'username',
            'tag',
            'uuid'
          ]
        },
        limit: count
      });

      for (let i = 0; i < children.length; i++) {

        // inclide user!
        children[i] = await models.Post.findOne({
          where: { 
            id: children[i].id
          },
          attributes: [
            'id',
            'content',
            'edits',
            'slug',
            'createdAt',
            'updatedAt'
          ],
          include: [{
            model: models.Post,
            as: 'descendents',
            hierarchy: true,
            include: [{
              model: models.User,
              as: 'user'
            }]
          },
          {
            model: models.User,
            as: 'user'
          }
        ]
        });
      }

      result = children;
    } else {

      const questions = await models.Post.findAll({
        where: {
          visibility: 1,
          hierarchyLevel: 1
        },
        order: [
          ['id', 'DESC']
        ],
        attributes: [
          'title',
          'content',
          'score',
          'replyCount',
          'slug',
          'updatedAt',
          'hierarchyLevel'
        ],
        include: {
          model: models.User,
          as: 'user',
          attributes: [
            'username',
            'tag',
            'uuid'
          ]
        },
        limit: count
      });

      result = questions;
    }

    return res.json(result);
  } catch (err) {

    console.log(err);
    return res.sendStatus(500);
  }
});

app.get('/posts/:slug', async (req, res) => {

  let question = await models.Post.findOne({
    where: {
      'slug': req.params.slug
    },
    attributes: [
      'id',
      'title',
      'content',
      'score',
      'upvotes',
      'downvotes',
      'replyCount',
      'slug',
      'edits',
      'updatedAt'
    ],
    include: [
      {
        model: models.User,
        as: 'user',
        attributes: [
          'username',
          'tag',
          'uuid'
        ]
      }
    ],
  });

  if (req.token) {

    let decrypted = jwt.verify(req.token, process.env.JWT_SECRET_TOKEN);

    if (decrypted) {

      // Need to switch to a post-upvote system and combine posts and comments
      const vote = await models.Vote.findOne({
        where: {
          'userId': decrypted.id,
          'postId': question.id
        },
        attributes: [
          'type'
        ],
      });

      question.vote = vote.type;
    }
  }

  delete question.id;
  return res.json(question);
});


const questionSchema = Joi.object().keys({
  //title: Joi.string().min(18).max(196).regex(new RegExp(/^[a-z][a-z0-9_ .-]*?/i)).custom(languageFilter).required(),
  content: Joi.string().min(36).max(2048).custom(languageFilter).required()
});

app.post('/posts/submit', verifyToken, async function (req, res, next) {

  try {

    const result = questionSchema.validate({ title: req.body.title, content: req.body.content });

    if (result.errors) {

      console.log(result.errors);
      return res.sendStatus(400).send(result.errors);
    }

    let parent = null;
    if (req.body.parentSlug) {

      console.log('parent!')
      console.log(req.body.parentSlug)
      parent = await models.Post.findOne({
        where: {
          'slug': req.body.parentSlug
        }
      });

      if (!parent) {
        
        console.log('parent not found!')
        return res.sendStatus(400);
      }
    }

    let decrypted = jwt.verify(req.token, process.env.JWT_SECRET_TOKEN);
    let slug = null;
    if (!req.body.title) {

      slug = uuidv1();
      slug = translator.fromUUID(slug);
    } else {
      
      slug = toSlug(req.body.title);
      let split = slug.split('-');
      const stopWords = [
        'i',
        'me',
        'my',
        'we',
        'our',
        'ours',
        'you',
        'youre',
        'youve',
        'youll',
        'youd',
        'your',
        'yours',
        'it',
        'am',
        'is',
        'are',
        'was',
        'be',
        'do',
        'a',
        'an',
        'the',
        'and',
        'if',
        'or',
        'as',
        'of',
        'at',
        'by',
        'for',
        'in',
        'on',
        'so'
      ];
  
      split.filter(e => !(e in stopWords));
      let filtered = split.join('-');
  
      // Actually filter out the stop words if the
      // resulting string is long enough
      if (filtered.length >= 64) {
  
        slug = filtered;
      }
  
      slug = slug.substring(0, 64);
      slug = `${slug}-${uniqueSlug(slug)}`;
      slug = slug.replace('--','-');
    }

    let question = await models.Post.create({
      parentId: (parent) ? parent.id : null,
      replyCount: 0,
      userId: decrypted.id,
      title: (req.body.title) ? req.body.title: null,
      content: req.body.content,
      slug: slug
    });

    if (question instanceof models.Post) {

      return res.sendStatus(200);
    }

    return res.sendStatus(500);
  } catch (err) {

    console.log(err);
    return res.sendStatus(500);
  }
});

// Need to check if token owner owns question!
app.post('/posts/edit', [query('slug').isString(), query('question').isString()], verifyToken, async function (req, res, next) {

  try {

    const result = questionSchema.validate({ question: req.body.content });

    if (result.errors) {

      console.log(result.errors);
      return res.sendStatus(400).send(result.errors);
    }

    let question = await models.Post.findOne({
      where: {
        'slug': req.body.slug
      }
    });
    
    question = await question.update({
      'content': req.body.content,
      'edits': question.edits + 1
    });

    if (question instanceof models.Post) {

      question = question.toJSON();
      const filtered = {
        'title': question.title,
        'content': question.content,
        'score': question.score,
        'edits': question.edits,
        'upvotes': question.upvotes,
        'downvotes': question.downvotes,
        'updatedAt': question.updatedAt
      };

      return res.json(filtered);
    }

    return res.sendStatus(500);
  } catch (err) {

    console.log(err);
    return res.sendStatus(500);
  }
});

app.delete('/posts/:slug', verifyToken, async (req, res) => {

  try {

  } catch (err) {

  }
});

// Requires a tag query
app.get('/posts/:slug/votes/me', verifyToken, async (req, res) => {

  try {

    let decrypted = jwt.verify(req.token, process.env.JWT_SECRET_TOKEN);

    const post = await models.Post.findOne({
      where: {
        slug: req.params.slug
      }
    });

    if (!post) {

      return res.sendStatus(404);
    }

    const vote = await models.Vote.findOne({
      where: {
        postId: post.id,
        userId: decrypted.id
      }
    });

    if (!vote) {

      return res.json({type: null});
    }

    return res.json({type: vote.type});
  } catch (err) {

    console.log(err);
    return res.sendStatus(500);
  }
});

app.post('/posts/:slug/votes/:verb', verifyToken, async (req, res) => {

  try {

    let decrypted = jwt.verify(req.token, process.env.JWT_SECRET_TOKEN);

    if (!(['upvote', 'downvote'].includes(req.params.verb))) {

      return res.sendStatus(400);
    }

    let type = null;
    switch (req.params.verb) {

      case 'upvote': {

        type = 1;
        break;
      }
      case 'downvote': {

        type = 0;
        break;
      }
    }

    const post = await models.Post.findOne({
      where: {
        slug: req.params.slug,
        visibility: 1
      }
    });

    if (!post) {
      
      return res.sendStatus(400);
    }

    let vote = await models.Vote.findOne({
      where: {
        userId: decrypted.id,
        postId: post.id
      },
      attributes: [
        'id',
        'userId',
        'postId'
      ]
    });

    if (vote) {

      await vote.update({
        ...vote,
        type: type
      });

      return res.json({ type: vote.type })
    }

    vote = await models.Vote.create({
      userId: decrypted.id,
      postId: post.id,
      type: type
    });

    return res.json({ type: vote.type })
  }
  catch (err) {

    console.log(err);
    return res.sendStatus(500);
  }
});

app.delete('/posts/:slug/votes/me', verifyToken, async (req, res) => {

  try {

    let decrypted = jwt.verify(req.token, process.env.JWT_SECRET_TOKEN);
    const post = await models.Post.findOne({
      where: {
        slug: req.params.slug,
        visibility: 1
      }
    });

    await models.Vote.destroy({
      where: {
        userId: decrypted.id,
        postId: post.id
      }
    });

    return res.sendStatus(200);
  } catch (err) {

    console.log(err);
    return res.sendStatus(500);
  }
});

/*
  Almost everyone shouldn't be able to see this data.
  Set to let anyone know they're unauthorized.
*/
app.get('/posts/:slug/votes', async (req, res) => {
  
  return res.sendStatus(403);
});

// Return user's tags and popular tags
app.get('/tags', verifyToken, async (req, res) => {

  try {

    let decrypted = jwt.verify(req.token, process.env.JWT_SECRET_TOKEN);
  } catch (err) {

    console.log(err);
    return res.sendStatus(500);
  }
});

// Return question posting distribution throughout the day
app.get('/analytics/questions/activity/:interval', verifyToken, async (req, res) => {

  try {

    // Interval must be defined
    if (!Object.keys(req.params).length) {
      
      console.log('BRUH', !Object.keys(req.params).length)
      res.sendStatus(400);
    }

    switch (req.params.interval) {

      case 'hourly': {

        const [results, metadata] = await sequelize.query(`
          SELECT date_trunc('hour', "createdAt") AS hour
              , count(*) AS count
          FROM   "Posts"
          WHERE "createdAt" > current_date - interval '28' day
          GROUP  BY 1
          ORDER  BY 1;
        `);

        return res.json(results);
      }
      case 'daily': {

        const [results, metadata] = await sequelize.query(`
          SELECT date_trunc('day', "createdAt") AS day
              , count(*) AS count
          FROM   "Posts"
          WHERE "createdAt" > current_date - interval '28' day
          GROUP  BY 1
          ORDER  BY 1;
        `);

        return res.json(results);
      }
      case 'weekly': {

        const [results, metadata] = await sequelize.query(`
          SELECT date_trunc('day', "createdAt") AS day
              , count(*) AS count
          FROM   "Posts"
          WHERE "createdAt" > current_date - interval '28' day
          GROUP  BY 1
          ORDER  BY 1;
        `);

        return res.json(results);
      }
      default: {

        return res.sendStatus(400);
      }
    }
  } catch (err) {

    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = app;