/* eslint-disable import/no-unresolved */

// eslint-disable-next-line prefer-destructuring
// const MongoClient = require('mongodb').MongoClient;

// const util = require('./util');
// const constants = require('./../globalConstants');

// /**
//  * API call to remote Mongo DB to force delete document(s)
//  *
//  * @param {Db} dbo
//  * @param {req} req
//  * @param {callback} callback
//  */
// function mongoDeleteDoc(dbo, req, callback) {
//   const query = { fileTitle: req.body.fileTitle };
//   dbo.collection(req.body.colname).deleteMany(query, (dbErr, result) => {
//     util.checkError(dbErr, true);
//     callback(null, result);
//   });
// }

// /**
//  * API call to remote Mongo DB to gather document(s) (even the 'deleted' ones)
//  *
//  * @param {Db} dbo
//  * @param {req} req
//  * @param {callback} callback
//  */
// function mongoGetAll(dbo, req, callback) {
//   dbo.collection(req.colname).find({}).toArray((dbErr, result) => {
//     util.checkError(dbErr, true);
//     callback(null, result);
//   });
// }


// /**
//  * Internal API Call to get ALL documents from a colletcion
//  *
//  * @param {String} colName
//  * @param {String} customUrl
//  * @param {callback} callback
//  */
// module.exports.FindAll = function (req, customUrl, callback) {
//   const myUrl = util.checkUrl(customUrl);
//   MongoClient.connect(myUrl, { useNewUrlParser: true }, (err, db) => {
//     util.checkError(err, true);
//     const dbName = util.getDbName();
//     const dbo = db.db(dbName);
//     mongoGetAll(dbo, req, (mngErr, result) => {
//       util.checkError(mngErr, true);
//       db.close();
//       constants.fileLog.info(`Retrieved all from ${req}`);
//       callback(null, result);
//     });
//   });
// };

// /**
//  * Internal API Call to delete ALL documents from a colletcion
//  * based on the fileTitle field
//  *
//  * @param {req} req
//  * @param {String} customUrl
//  * @param {callback} callback
//  */
// module.exports.ForceDelete = function (req, customUrl, callback) {
//   const myUrl = util.checkUrl(customUrl);
//   MongoClient.connect(myUrl, { useNewUrlParser: true }, (err, db) => {
//     util.checkError(err, true);
//     const dbName = util.getDbName();
//     const dbo = db.db(dbName);
//     mongoDeleteDoc(dbo, req, (mngErr, result) => {
//       util.checkError(mngErr, true);
//       db.close();
//       constants.fileLog.info(`Forced deleted ${result.result.n} document(s)`);
//       callback(null, result);
//     });
//   });
// };
