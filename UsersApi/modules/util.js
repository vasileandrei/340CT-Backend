// Utility module

const jwt = require('jsonwebtoken');
const constants = require('../globalConstants');
const config = require('./config');

/**
   * Error handling by printing err to logs
   *
   * @param {Error} err
   */
module.exports.checkError = function (err, testBool) {
  if (err) {
    if (testBool === false) {
      constants.fileLog.error(err.message);
    }
    if (testBool === true) {
      constants.fileLog.warn(`TEST ERROR ${err.message}`);
    }
  }
};

/**
   * Error handling by printing err to logs and return
   *
   * @param {Error} err
   */
module.exports.checkErrorWithReturn = function (err, testBool) {
  if (err) {
    if (testBool === false) {
      constants.fileLog.error(err.message);
    }
    if (testBool === true) {
      constants.fileLog.warn(`TEST ERROR ${err.message}`);
      return true;
    }
  }
  return false;
};

/**
     * Error handling by printing err to logs
     *
     * @param {string} field
     * @param {string} data
     * @param {boolean} testBool
     * @param {Response} res
     */
module.exports.checkField = function (field, data, testBool, res) {
  let returnBool;
  if (!data) {
    returnBool = false;
    if (testBool === false) {
      constants.fileLog.error('SERIOUS TEST Error Field cannot be empty!');
      res.send(`${field} cannot be empty`);
    } else {
      constants.fileLog.warn('TEST ERROR Field is empty');
      res.send(`${field} cannot be empty`);
    }
  }
  returnBool = true;
  return returnBool;
};

/**
     * Get permissions level based on config
     *
     * @param {string} dbPerm
     */
module.exports.getConfig = function (dbPerm) {
  if (dbPerm === 'admin') return config.accessLevels.admin;
  return config.accessLevels.user;
};

/**
     * Simple token sign promise
     *
     * @param {Object} user
     */
module.exports.simpleTokenSign = user => new Promise((resolve) => {
  // Gather constants
  const secret = constants.tokenSignature;
  const time = constants.tokenExpireTime;
  // Sign token
  jwt.sign({ userInfo: user.userInfo }, secret, { expiresIn: time }, (err, newToken) => {
    constants.fileLog.info('Appening new files to user Regex');
    resolve(newToken);
  });
});

/**
 * Simple token decode promise
 *
 * @param {string} user
 */
module.exports.simpleTokenDecode = token => new Promise((resolve) => {
  // Token to object magic
  const decoded = jwt.decode(token);
  resolve(decoded);
});
