/* eslint-disable import/no-unresolved */

// eslint-disable-next-line prefer-destructuring
const MongoClient = require('mongodb').MongoClient;

const util = require('./util');
const constants = require('./../globalConstants');

/**
 * API Call to remote server to create the colletcion
 *
 * @param {Db Mongo} dbo
 * @param {String} colName
 * @param {callback} callback
 */
function mongoCreateCollection(dbo, colName, callback) {
  dbo.createCollection(colName, (err) => {
    util.checkError(err, true);
    callback(null);
  });
}

/**
 * API Call to remote server to drop the colletcion
 *
 * @param {Db Mongo} dbo
 * @param {String} colName
 * @param {callback} callback
 */
function mongoDropCollection(dbo, colName, callback) {
  dbo.dropCollection(colName, (err) => {
    util.checkError(err, true);
    callback(null);
  });
}

/**
 * Internal API Call to create a new the colletcion
 *
 * @param {String} colName
 * @param {callback} callback
 */
module.exports.CreateCollection = function (colName, customUrl, callback) {
  // Check url viability
  const myUrl = util.checkUrl(customUrl);
  // Establish database connection
  MongoClient.connect(myUrl, { useNewUrlParser: true }, (err, db) => {
    util.checkError(err, true);
    const dbName = util.getDbName();
    const dbo = db.db(dbName);
    // Send method to remote database -- Create colelction
    mongoCreateCollection(dbo, colName, (mngErr) => {
      util.checkError(mngErr, true);
      db.close();
      constants.fileLog.info(`Created a new collection ${colName}`);
      callback(null);
    });
  });
};

/**
 * Internal API Call to drop a the colletcion
 *
 * @param {String} colName
 * @param {callback} callback
 */
module.exports.DropCollection = function (colName, customUrl, callback) {
  // Check url viability
  const myUrl = util.checkUrl(customUrl);
  // Establish database connection
  MongoClient.connect(myUrl, { useNewUrlParser: true }, (err, db) => {
    util.checkError(err, true);
    const dbName = util.getDbName();
    const dbo = db.db(dbName);
    // Send method to remote database -- Delete colelction
    mongoDropCollection(dbo, colName, (mngErr) => {
      util.checkError(mngErr, true);
      db.close();
      constants.fileLog.info(`Deleted a collection ${colName}`);
      callback(null);
    });
  });
};
