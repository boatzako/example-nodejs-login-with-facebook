const express = require('express')
const facebookPassport = require('./facebook')

module.exports = (passport) => {
  const router = express.Router();
  passport.use(facebookPassport)

  router.get('/facebook/signin', passport.authenticate('facebook'));
  router.get('/facebook/callback', function (req, res, next) {
    passport.authenticate('facebook', function (err, user, info) {
      if (err) {
        return res.send(err);
      }
      if (!user) {
        return res.redirect('/login');
      }
      req.logIn(user, function (err) {
        if (err) {
          return res.send(err);
        }
        return res.redirect('/');
      })
    })(req, res, next)
  });
  return router
}