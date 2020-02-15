const path = require('path')
const morgan = require('morgan')
const express = require('express')
const serverConfig = require('./config/server')
const app = express()

app.use(morgan('common'))

app.use('/', (req, res) => {
  res.json(req.user)
})

app.use('/api/auth', require('./src/auth/route'))

app.use(express.static(path.join(__dirname, 'public')))

app.get('**', (req, res) => {
  res.status(404)
  res.send('404 Page not found.')
  // res.sendFile(path.join(__dirname, 'private/404.html'))
})

app.listen(serverConfig.port, () => {
  console.log(`App listening on port ${serverConfig.port}!`)
})