// Document related actions -- User access

const constants = require('./../globalConstants');
const users = require('./../modules/users');

const colName = 'files';

// Add a new document
// localhost:8082/api/v1/files/addDoc
module.exports.AddOne = function (req, res) {
  req.body.colName = colName;
  // Create working object
  const reqBody = {};
  Object.keys(req.body).forEach((key) => {
    reqBody[key] = req.body[key];
  });
  reqBody.deleted = false; // set deleted flag false for new entries
  const url = 'defaultURL';
  // Initiate database method -- Add Document to Collection
  users.AddOneToCollection(reqBody, url, (err, result) => {
    res.setHeader('content-type', 'application/json');
    res.setHeader('accepts', 'POST');
    if (err) {
      // Send failed reponse
      res.status(constants.serverInternalError);
      res.end(`error: ${err}`);
    }
    // Send successful reponse
    res.status(constants.successCreated);
    res.send({ message: 'Successfully uploaded', fileInfo: result.ops[0] });
  });
};

// Get a document
// localhost:8082/api/v1/files/getDoc
module.exports.GetOne = function (req, res) {
  req.body.colName = colName;
  const url = 'defaultURL';
  users.FindOne(req, url, (err, result) => {
    res.setHeader('content-type', 'application/json');
    res.setHeader('accepts', 'GET', 'POST');
    if (err) {
      // Send failed reponse
      res.status(constants.serverInternalError);
      res.end(`error: ${err}`);
    }
    // Send successful reponse
    res.status(constants.successAccepted);
    res.send({ body: result });
  });
};

// Soft-delete a document (update delete flag to true)
// localhost:8082/api/v1/files/delDoc
module.exports.SoftDelete = function (req, res) {
  req.body.colName = colName;
  const url = 'defaultURL';
  // Initiate database method -- Soft delete document
  users.SoftDelete(req, url, (err) => {
    res.setHeader('content-type', 'application/json');
    res.setHeader('accepts', 'PUT');
    if (err) {
      // Send failed reponse
      res.status(constants.serverInternalError);
      res.end(`error: ${err}`);
    }
    // Send successful reponse
    res.status(constants.successNoContent);
    res.send({ message: '204 Deletion - No Content' });
  });
};
