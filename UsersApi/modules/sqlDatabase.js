// Table module -- Admin access

const sqlite3 = require('sqlite3').verbose();
const constants = require('./../globalConstants');
const util = require('./util');

/**
 * Opens the connection to the local DB
 *
 * @param {String} dbPath
 * @returns
 */
function extablishConnection() {
  const db = new sqlite3.Database(constants.dbPath, sqlite3.OPEN_READWRITE, (err) => {
    util.checkError(err);
  });
  return db;
}

/**
 * Create a SQL Table
 *
 * @param {String} tableName
 * @param {callback} callback
 */
module.exports.createUserTable = function (tableName, callback) {
  // Establish database connection
  const db = extablishConnection();
  // Construct query
  let sqlCommand = `CREATE TABLE ${tableName} (id integer PRIMARY KEY,`;
  sqlCommand += ' hashkey text NOT NULL, username text NOT NULL UNIQUE,';
  sqlCommand += ' permissions text, email text NOT NULL);';
  // Run query
  db.run(sqlCommand, (err) => {
    const resp = util.checkErrorWithReturn(err, true);
    db.close();
    if (resp === true) {
      callback(err.message);
      return;
    }
    constants.fileLog.info(`Created a collection ${tableName}`);
    callback(null);
  });
};

/**
 * Drop a SQL Table
 *
 * @param {String} tableName
 * @param {callback} callback
 */
module.exports.dropUserTable = function (tableName, callback) {
  // Establish database connection
  const db = extablishConnection();
  // Construct query
  const sqlCommand = `DROP TABLE ${tableName};`;
  // Run query
  db.run(sqlCommand, (err) => {
    const resp = util.checkErrorWithReturn(err, true);
    db.close();
    if (resp === true) {
      callback(err.message);
      return;
    }
    constants.fileLog.info(`Deleted a table ${tableName}`);
    callback(null);
  });
};
