// Reponse utility

const BaseResponse = require('../serviceModels/BaseResponse');
const DataResponse = require('./../serviceModels/DataResponse');

/**
 * Create a base response
 *
 * @param {boolean} success
 * @param {err} err
 * @param {string} redirect
 */
module.exports.CreateBaseReponse = function (success, err, redirect) {
  const successfulObj = new BaseResponse();
  successfulObj.hasBeenSuccessful = success;
  successfulObj.errors = err;
  successfulObj.redirect = redirect;
  return successfulObj;
};

/**
 * Create a base response -- with content
 *
 * @param {boolean} success
 * @param {err} err
 * @param {string} redirect
 * @param {string} data
 */
module.exports.CreateDataReponse = function (success, err, redirect, data) {
  const successfulObj = new DataResponse();
  successfulObj.hasBeenSuccessful = success;
  successfulObj.errors = err;
  successfulObj.redirect = redirect;
  successfulObj.content = data;
  return successfulObj;
};
