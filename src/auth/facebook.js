const Strategy = require('passport-facebook').Strategy
const fbConfig = require('../../config/facebook')
const serverConfig = require('../../config/server')

console.log('=============== FACEBOOK =================');
console.log(fbConfig.clientID);
console.log(fbConfig.clientSecret);

module.exports = new Strategy({
  clientID: fbConfig.clientID,
  clientSecret: fbConfig.clientSecret,
  callbackURL: serverConfig.hostname + '/api/auth/facebook/callback',
  enableProof: true,
},
  function (accessToken, refreshToken, profile, cb) {
    try {
      return cb(null, profile);
    } catch (error) {
      return cb(error, null);
    }
  }
)