// Utility module

const constants = require('../globalConstants');

// Construct remote database configuration variables
const mongo = constants.mongoCredentials;
const user = constants.userCredentials;
const url = `mongodb://${user.dbUser}:${user.password}@${mongo.host}:${mongo.port}/${mongo.dbName}`;


/**
 * Setting the right URL for the DB Connection
 *
 * @param {Error} err
 */
module.exports.checkUrl = function (customUrl) {
  let myUrl = 'noUrlSpecified';
  if (customUrl === 'defaultURL') myUrl = url;
  else myUrl = customUrl;
  return myUrl;
};

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
       * @param {Error} err
       */
module.exports.checkField = function (data, testBool) {
  if (!data) {
    if (testBool === false) {
      constants.fileLog.error('SERIOUS TEST Error Field cannot be empty!');
    }
    if (testBool === true) {
      constants.fileLog.warn('TEST ERROR Field is empty');
    }
  }
};

/**
   * Returning DB Name
   */
module.exports.getDbName = function () {
  return mongo.dbName;
};
