const crypto = require('crypto');
const constants = require('./../globalConstants');

/**
 * Create a hash based on 'username password'
 * encrypted sha256, stored hex
 *
 * @param {Request} req
 */
module.exports.createHash = req => new Promise((resolve) => {
  // All usernames are stored in lower-case
  req.username = req.username.toLowerCase();
  // Create sha256 encryption
  const hmac = crypto.createHmac('sha256', constants.encryptionSignature);
  hmac.write(`${req.username} ${req.password}`);
  hmac.end();
  const hash = hmac.read().toString('hex');
  constants.fileLog.info(`Created new Hash for ${req.permissions} ${req.username}`);
  resolve(hash);
});

/**
 * Used for Login page
 * Compare req username/password with SQL Hash
 *
 * @param {Request} req
 */
module.exports.compareHash = (req, hash) => new Promise((resolve) => {
  // All usernames are stored in lower-case -- request username
  req.username = req.username.toLowerCase();
  // Create sha256 encryption -- request username
  const userHmac = crypto.createHmac('sha256', constants.encryptionSignature);
  userHmac.write(`${req.username} ${req.password}`);
  userHmac.end();
  const userHash = userHmac.read().toString('hex');
  constants.fileLog.info(`Comparing hash for user ${req.username}`);
  // Compare request credentials with store credentials
  if (userHash === hash) resolve(true);
  else resolve(false);
});
