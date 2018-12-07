// Collection related actions module -- Admin access

/* eslint-disable import/no-unresolved */

const constants = require('./../globalConstants');
const db = require('./../modules/database');
const util = require('./../modules/util');

// localhost:8082/api/v1/files -- Test route
module.exports.baseGet = function (req, res) {
  res.status(constants.successOK);
  res.send({ message: 'Hello from baseGet, FilesController' });
};

// Create a new collection -- Admin access
// localhost:8082/api/v1/files/createCollection
module.exports.createCollectionPost = function (req, res) {
  const url = 'defaultURL';
  // Check req body viability
  util.checkField(req.body.colname, res);
  const collectionName = req.body.colname;
  // Initiate database method -- Create collection
  db.CreateCollection(collectionName, url, (err) => {
    res.setHeader('content-type', 'application/json');
    res.setHeader('accepts', 'POST');
    if (err) {
      // Send failed reponse
      res.status(constants.serverInternalError);
      res.end(`error: ${err}`);
    }
    // Send successful reponse
    res.status(constants.successCreated);
    res.send({ message: `Created a new collection ${collectionName}` });
  });
};

// Delete a collection -- Admin access
// localhost:8082/api/v1/files/dropCollection
module.exports.dropCollectionDel = function (req, res) {
  const url = 'defaultURL';
  // Check req body viability
  util.checkField(req.body.colname, res);
  const collectionName = req.body.colname;
  // Initiate database method -- Delete collection
  db.DropCollection(collectionName, url, (err) => {
    res.setHeader('content-type', 'application/json');
    res.setHeader('accepts', 'DELETE');
    if (err) {
      // Send failed reponse
      res.status(constants.serverInternalError);
      res.end(`error: ${err}`);
    }
    // Send successful reponse
    res.status(constants.successNoContent);
    res.send({ message: `Deleted a collection ${collectionName}` });
  });
};
