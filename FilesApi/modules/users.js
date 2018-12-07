/* eslint-disable prefer-destructuring */
/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-lines */

// eslint-disable-next-line prefer-destructuring
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const util = require('./util');
const constants = require('./../globalConstants');

/**
 * API call to remote Mongo DB to insert document
 *
 * @param {Db} dbo
 * @param {req} req
 * @param {callback} callback
 */
function insertData(dbo, req, callback) {
  dbo.collection(req.colName).insertOne(req, (dbErr, result) => {
    util.checkError(dbErr, true);
    callback(null, result);
  });
}


/**
 * API call to remote Mongo DB to gather document
 *
 * @param {Db} dbo
 * @param {req} req
 * @param {callback} callback
 */
function gatherData(dbo, req, callback) {
  const query = { username: { $regex: `.*${req.body.username}.*` }, deleted: { $eq: false } };
  dbo.collection(req.body.colName).find(query).toArray((dbErr, result) => {
    util.checkError(dbErr, true);
    callback(null, result);
  });
}


/**
 * API call to remote Mongo DB to soft delete document
 *
 * @param {Db} dbo
 * @param {req} req
 * @param {callback} callback
 */
function updateDeleteFlag(dbo, req, callback) {
  dbo.collection(req.body.colName).findOneAndUpdate({ _id: ObjectID(req.body.id) }, { $set: { deleted: true } }, (dbErr, result) => {
    util.checkError(dbErr, true);
    callback(null, result);
  });
}

/**
 * Add new document to the <files> collecion
 * REQ MUST HAVE author and colname
 *
 * @param {req} req
 * @param {String} customUrl
 */
module.exports.AddOneToCollection = function (req, customUrl, callback) {
  // Check url viability
  const myUrl = util.checkUrl(customUrl);
  // Establish database connection
  MongoClient.connect(myUrl, { useNewUrlParser: true }, (err, db) => {
    util.checkError(err, true);
    const dbName = util.getDbName();
    const dbo = db.db(dbName);
    // Send method to remote database -- Add document
    insertData(dbo, req, (mngErr, result) => {
      util.checkError(mngErr, true);
      db.close();
      constants.fileLog.info(`Created new document in collection ${req.colName}`);
      callback(null, result);
    });
  });
};

/**
 * Find a document from the <files> collecion
 *
 * @param {req} req
 * @param {String} customUrl
 */
module.exports.FindOne = function (req, customUrl, callback) {
  // Check url viability
  const myUrl = util.checkUrl(customUrl);
  // Establish database connection
  MongoClient.connect(myUrl, { useNewUrlParser: true }, (err, db) => {
    util.checkError(err, true);
    const dbName = util.getDbName();
    const dbo = db.db(dbName);
    // Send method to remote database -- Get document
    gatherData(dbo, req, (mngErr, result) => {
      util.checkError(mngErr, true);
      db.close();
      constants.fileLog.info(`Retrieved data from collection, req: ${req}`);
      callback(null, result);
    });
  });
};

/**
 * Soft delete a document from the <files> collection
 * REQ MUST HAVE colname and fileTitle
 *
 * @param {req} req
 * @param {String} customUrl
 */
module.exports.SoftDelete = function (req, customUrl, callback) {
  // Check url viability
  const myUrl = util.checkUrl(customUrl);
  // Establish database connection
  MongoClient.connect(myUrl, { useNewUrlParser: true }, (err, db) => {
    util.checkError(err, true);
    const dbName = util.getDbName();
    const dbo = db.db(dbName);
    // Send method to remote database -- Soft-delete document
    updateDeleteFlag(dbo, req, (mngErr, result) => {
      util.checkError(mngErr, true);
      db.close();
      constants.fileLog.info(`Soft delete to collection ${req.body.colName}, id ${req.body.id}.`);
      callback(null, result);
    });
  });
};

// module.exports.FindSome = function (callback) {
//   MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
//     if (err) {
//       callback(err);
//       return;
//     }
//     const dbo = db.db(mongo.dbName);
//     dbo.collection(mongo.collectionName).find({ deleted: { $eq: false } }).toArray((err, result) => {
//       if (err) {
//         console.log('Error');
//         callback(err);
//         return;
//       }
//       callback(null, result);
//       db.close();
//     });
//   });
// };
