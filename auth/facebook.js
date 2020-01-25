const Strategy = require('passport-facebook').Strategy
const fbConfig = require('../config/facebook')
const serverConfig = require('../config/server')

module.exports = new Strategy({
  clientID: fbConfig.clientID,
  clientSecret: fbConfig.clientSecret,
  callbackURL: serverConfig.hostname + '/api/auth/facebook/callback',
},
  function (accessToken, refreshToken, profile, cb) {
    try {
      console.log(arguments);
      return cb(null, profile);
    } catch (error) {
      return cb(error, null);
    }
  }
)