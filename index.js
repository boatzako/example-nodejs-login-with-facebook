const morgan = require('morgan')
const express = require('express')
const serverConfig = require('./config/server')
const app = express()
const passport = require('passport')
const session = require('express-session');

app.use(morgan('common'))
app.use(session({
  secret: 'mysecret',
  saveUninitialized: true,
  resave: true,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use('/api/auth', require('./src/auth/router'))

app.use('/', (req, res) => {
  res.json(req.user || {})
})

app.get('**', (req, res) => {
  res.status(404).send('404 Page not found.')
})

app.listen(serverConfig.port, () => {
  console.log(`App listening on port ${serverConfig.port}!`)
})