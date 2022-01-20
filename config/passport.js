const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const models = require('../models');
const bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => {

  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {

  try {

    const user = await models.User.findOne({ where: { id: id } });

    done(null, user);
  } catch (error) {

    done(error, null);
  }
});

passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {

      try {

        // Check if the email already exists
        const user = await models.User.findOne({
          where: { email: email.toLowerCase() },
          attributes: ['id', 'uuid', 'username', 'email', 'password', 'roleId', 'locale', 'tag'],
          roleId: {
            [Op.gte]: 1
          }
        });

        if (!user) {

          req.authError = { status: 404, error: 'USER_NOT_FOUND', reason: 'We couldn\'t find a verified account with that email!' };
          return done(null, false);
        }

        // Check if the password is correct
        if (!(await bcrypt.compare(password, user.password))) {

          req.authError = { status: 401, error: 'PASSWORD_MISMATCH', reason: 'Email & password dont match!' };
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {

        return done(error, false);
      }
    }
  )
);
