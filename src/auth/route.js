const express = require('express')
const passport = require('passport')
const facebookPassport = require('./facebook')
const router = express.Router();

passport.initialize()
passport.use(facebookPassport)

router.get('/facebook/signin', passport.authenticate('facebook'));
router.get('/facebook/callback', (req, res, next) => {
  try {
    passport.authenticate('facebook')(req, res, next)
    res.redirect('/');
  } catch (err) {
    res.send(err)
  }
});

module.exports = router