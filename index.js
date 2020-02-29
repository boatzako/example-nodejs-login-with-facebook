const path = require('path')
const morgan = require('morgan')
const express = require('express')
const serverConfig = require('./config/server')
const app = express()
const passport = require('passport')
const session = require('express-session');
const facebookPassport = require('./src/auth/facebook')

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
app.get('/api/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
}))

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