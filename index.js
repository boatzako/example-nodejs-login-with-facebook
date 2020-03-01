const path = require('path')
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
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use('/api/auth', require('./src/auth/route')(passport))

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