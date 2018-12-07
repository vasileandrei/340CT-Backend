// Utility module

const constants = require('./../globalConstants');

/**
 * Error handling by printing err to logs
 *
 * @param {string} field
 * @param {string} data
 * @param {boolean} testBool
 * @param {Response} res
 */
module.exports.checkField = function (field, data, testBool, res) {
  if (!data) {
    if (testBool === false) {
      // Not a test - Send failed reponse
      constants.fileLog.error('SERIOUS TEST Error Field cannot be empty!');
      res.send({
        hasBeenSuccessful: false,
        message: `${field} cannot be empty`,
      });
    } else {
      // Test - Send failed reponse
      constants.fileLog.warn('TEST ERROR Field is empty');
      res.send({
        hasBeenSuccessful: false,
        message: `${field} cannot be empty`,
      });
    }
  }
};
