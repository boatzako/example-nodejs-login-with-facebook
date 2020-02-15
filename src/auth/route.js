const express = require('express')
const passport = require('passport')
const facebookPassport = require('./facebook')
const router = express.Router();

passport.initialize()

passport.serializeUser((user, done) => {
  console.log('========== serializeUser ==========');
  console.log(user);
  done(null, user);
});
passport.deserializeUser((user, done) => {
  console.log('========== deserializeUser ==========');
  console.log(user);
  done(null, user);
});

passport.use(facebookPassport)

router.get('/facebook/signin', passport.authenticate('facebook'));
router.get('/facebook/callback', (req, res, next) => {
  try {
    passport.authenticate('facebook')(req, res, next)
    console.log('======================================')
    console.log(req.user)
    res.redirect('/');
  } catch (err) {
    res.send(err)
  }
});

module.exports = router