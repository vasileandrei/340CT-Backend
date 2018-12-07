// Strinctly admin access controller

const constants = require('./../globalConstants');
const admin = require('./../modules/admin');
const util = require('./../modules/util');

// Find all documents in the collection
// localhost:8082/api/v1/files/getAll
module.exports.getAll = function (req, res) {
  // Check req body viability
  util.checkField(req.body.colname, false);
  // Create working object
  const reqBody = {};
  Object.keys(req.body).forEach((key) => {
    reqBody[key] = req.body[key];
  });
  const url = 'defaultURL';
  // Initiate database method -- Find All
  admin.FindAll(reqBody, url, (err, result) => {
    res.setHeader('content-type', 'application/json');
    res.setHeader('accepts', 'GET');
    if (err) {
      // Send failed response
      res.status(constants.serverInternalError);
      res.end(`error: ${err}`);
    }
    // Send success response
    res.status(constants.successAccepted);
    res.send({ body: result });
  });
};

// Delete documents from colelction
// localhost:8082/api/v1/files/forceDelete
module.exports.ForceDelete = function (req, res) {
  const url = 'defaultURL';
  // Initiate database method -- Force Delete
  admin.ForceDelete(req, url, (err) => {
    res.setHeader('content-type', 'application/json');
    res.setHeader('accepts', 'DELETE');
    if (err) {
      // Send failed response
      res.status(constants.serverInternalError);
      res.end(`error: ${err}`);
    }
    // Send success response
    res.status(constants.successNoContent);
    res.send({ body: '204 Deletion - No Content' });
  });
};
