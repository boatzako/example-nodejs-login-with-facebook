const path = require('path')
const morgan = require('morgan')
const express = require('express')
const serverConfig = require('./config/server')
const app = express()
const passport = require('passport')
const session = require('express-session');
const facebookPassport = require('./facebook')

app.use(morgan('common'))
app.use(session({
  secret: 'mysecret',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

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

app.get('/api/auth/facebook/signin', passport.authenticate('facebook'));
app.get('/api/auth/facebook/callback', function (req, res, next) {
  passport.authenticate('facebook', function (err, user, info) {
    console.log('===================== INFO')
    console.log(info)
    if (err) {
      console.log('===================== ERROR')
      console.log(err)
      return res.send(err);
    }
    if (!user) {
      console.log('===================== USER')
      return res.redirect('/login');
    }
    req.logIn(user, function (err) {
      if (err) {
        console.log('===================== LOGIN')
        return res.send(err);
      }
      return res.redirect('/');
    })
  })(req, res, next)
})

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', (req, res) => {
  res.json(req.user || {})
})

app.get('**', (req, res) => {
  res.status(404)
  res.send('404 Page not found.')
  // res.sendFile(path.join(__dirname, 'private/404.html'))
})

app.listen(serverConfig.port, () => {
  console.log(`App listening on port ${serverConfig.port}!`)
})