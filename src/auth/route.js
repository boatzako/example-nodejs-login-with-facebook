const express = require('express')
const facebookPassport = require('./facebook')

module.exports = (passport) => {
  const router = express.Router();
  passport.use(facebookPassport)

  router.get('/facebook/signin', passport.authenticate('facebook'));
  router.get('/facebook/callback', passport.authenticate('facebook', { session: true }), (req, res, next) => {
    try {
      console.log('======================================')
      console.log(req.user)
      res.redirect('/');
    } catch (err) {
      res.send(err)
    }
  });
  return router
}