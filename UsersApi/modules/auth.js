const jwt = require('jsonwebtoken');

const constants = require('./../globalConstants');
const config = require('./config');

/**
 * Javascript Web Token Signer
 * hashToken to jwtSigned string
 *
 * @param {String} hashToken
 */
module.exports.jwtSign = (info, files) => new Promise((resolve) => {
  // Construct working obj -- Token payload
  const userInfo = {
    username: info.username,
    email: info.email,
    role: config.accessLevels[`${info.permissions}`],
    files,
  };
  // Sign token using secret signatrure
  jwt.sign({ userInfo }, constants.tokenSignature, { expiresIn: constants.tokenExpireTime }, (_, token) => {
    constants.fileLog.info(`Signing a new token for ${userInfo.username} token. Expires in 300m`);
    resolve(token);
  });
});
