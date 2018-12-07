// User module -- Admin access

const sqlite3 = require('sqlite3').verbose();
const constants = require('./../globalConstants');
const hash = require('./../modules/hash');
const util = require('./util');

function extablishConnection() {
  const db = new sqlite3.Database(constants.dbPath, sqlite3.OPEN_READWRITE, (err) => {
    util.checkError(err);
  });
  return db;
}

/**
 * Add user in the SQL database
 *
 * @param {String} tableName
 * @param {Request} req
 * @param {callback} callback
 */
module.exports.addUser = async function (tableName, req, callback) {
  // Establish database connection
  const db = extablishConnection();
  // Create hash for user
  const userHash = await hash.createHash(req);
  // If user permissions is not specified -- Asign user access
  if (!req.permissions) req.permissions = 'user';
  // Construct query
  let queryObj = `INSERT INTO ${tableName} (email, username, hashkey, permissions)`;
  queryObj += ` VALUES ("${req.email}", "${req.username}", "${userHash}", "${req.permissions}");`;
  // Run query
  db.run(queryObj, (err) => {
    db.close();
    const response = util.checkErrorWithReturn(err, true);
    if (response) {
      callback(err.message);
      return;
    }
    constants.fileLog.info(`Added user ${req.username} to Db`);
    callback(null);
  });
};

/**
 * Add user in the SQL database
 *
 * @param {String} tableName
 * @param {Request} req
 * @param {callback} callback
 */
module.exports.deleteUser = async function (tableName, req, callback) {
  // Establish database connection
  const db = extablishConnection();
  req.username = req.username.toLowerCase();
  // Construct query
  const queryObj = `DELETE FROM ${tableName} WHERE username="${req.username}";`;
  // Run query
  db.run(queryObj, (err) => {
    util.checkError(err, true);
    db.close();
    constants.fileLog.info(`Deleted user ${req.username} from Db`);
    callback(null);
  });
};

/**
 * Used for Login
 * Retireve entry with the username
 *
 * @param {String} tableName
 * @param {Request} req
 * @param {callback} callback
 */
module.exports.getFromDb = (tableName, req) => new Promise((resolve) => {
  req.username = req.username.toLowerCase();
  // Establish database connection
  const db = extablishConnection(constants.dbPath);
  // Construct query
  const queryObj = `SELECT * FROM ${tableName} WHERE username="${req.username}";`;
  // Run query
  db.all(queryObj, (err, data) => {
    util.checkError(err, true);
    db.close();
    constants.fileLog.info(`Requesting user information for ${req.username}`);
    // Send retrieved object
    resolve(data[0]);
  });
});
