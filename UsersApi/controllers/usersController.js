/* eslint-disable max-lines */
// User controller

const constants = require('./../globalConstants');

const sqlUser = require('./../modules/sqlUsers');
const usersDb = require('./../modules/sqlDatabase');
const auth = require('./../modules/auth');
const hash = require('./../modules/hash');
const util = require('./../modules/util');
const getFile = require('./../modules/requestFiles');

const tableName = 'users';

// localhost:8081/api/v1/users -- Test route
module.exports.baseGet = function (req, res) {
  res.status(constants.successOK);
  res.send({ message: 'Hello from baseGet, UserController' });
};

// localhost:8081/api/v1/users/register
module.exports.registerPost = async function (req, res) {
  // Construct working object
  const reqBody = {
    permissions: req.body.permissions,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };
  // Calling module method -- Get one user from database
  const userInfo = await sqlUser.getFromDb(tableName, reqBody);
  if (userInfo) {
    // Username already exists - 409 Conflict
    res.status(constants.clientConflict);
    res.send({ message: 'Username already in use' });
  } else {
  // Calling module method -- Add user to database
    sqlUser.addUser(tableName, reqBody, (err) => {
      if (err) {
        // Send faield response
        res.status(constants.serverInternalError);
        res.end(`error: ${err}`);
      }
      // Send succesful reponse
      res.status(constants.successCreated);
      res.send({ message: `User ${reqBody.username} succesfully registered` });
    });
  }
};

// localhost:8081/api/v1/users/signToken
module.exports.signTokenPost = async function (req, res) {
  res.setHeader('content-type', 'application/json');
  res.setHeader('accepts', 'POST');
  const currentUser = req.body.user;
  const newToken = await util.simpleTokenSign(currentUser);
  if (!newToken) {
    // Send faield response
    res.status(constants.serverInternalError);
    res.send('Could not generate new token');
  } else {
    // Send succesful reponse
    res.status(constants.successCreated);
    res.send({ token: newToken });
  }
};

// localhost:8081/api/v1/users/login
module.exports.loginPost = async function (req, res) {
  res.setHeader('content-type', 'application/json');
  res.setHeader('accepts', 'POST');
  // Construct working object
  const reqBody = {
    username: req.body.username,
    password: req.body.password,
  };
  const userInfo = await sqlUser.getFromDb(tableName, reqBody);
  if (!userInfo) {
    // Send faield response
    res.status(constants.clientNotFound);
    res.send({ message: 'Username or password is wrong' });
    return;
  }
  // Compare provided password and stored password
  const compare = await hash.compareHash(reqBody, userInfo.hashkey);
  if (!compare) {
    // Send faield response
    res.status(constants.clientNotFound);
    res.send({ message: 'Username or password is wrong' });
    return;
  }
  // Gather all documents that the user authored
  userInfo.files = await getFile.getFilesForAuthor(req, userInfo);
  const token = await auth.jwtSign(userInfo, userInfo.files);
  res.status(constants.successAccepted);
  res.send({
    // Send succesful reponse
    email: userInfo.email,
    username: userInfo.username,
    message: `Welcome back, ${userInfo.username}!`,
    token,
  });
};

// localhost:8081/api/v1/users/tokenUpdate
module.exports.deleteFileFromUserPost = async function (req, res) {
  // Decode the token
  const tmpObj = await util.simpleTokenDecode(req.body.token);
  const userInfo = tmpObj.userInfo;
  // Gather all documents that the user authored
  userInfo.files = await getFile.getFilesForAuthor(req, userInfo);
  // Re-sign token/ Update token
  const token = await auth.jwtSign(userInfo, userInfo.files);
  // Send succesful reponse
  res.status(constants.successAccepted);
  res.send({
    token,
    userInfo,
  });
};

// localhost:8081/api/v1/users/createTable
module.exports.createTablePost = function (req, res) {
  const bool = util.checkField('tableName', req.body.tableName, false, res);
  if (bool) {
    const newTableName = req.body.tableName;
    // Calling module method -- Create database table
    usersDb.createUserTable(newTableName, (dbErr) => {
      // tell the client we sending json data
      res.setHeader('content-type', 'application/json');
      res.setHeader('accepts', 'POST');
      if (dbErr) {
        // Send faield response
        res.status(constants.serverInternalError);
        res.end(`error: ${dbErr}`);
      }
      // Send succesful reponse
      res.status(constants.successCreated);
      res.send({ message: `Succesfully created table ${newTableName}` });
    });
  }
};

// localhost:8081/api/v1/users/dropTable
module.exports.dropTablePost = function (req, res) {
  const bool = util.checkField('tableName', req.body.tableName, false, res);
  if (bool) {
    const newTableName = req.body.tableName;
    // Calling module method -- Delete database table
    usersDb.dropUserTable(newTableName, (dbErr) => {
    // tell the client we sending json data
      res.setHeader('content-type', 'application/json');
      res.setHeader('accepts', 'DELETE');
      if (dbErr) {
        // Send faield response
        res.status(constants.serverInternalError);
        res.end(`error: ${dbErr}`);
      }
      res.status(constants.successNoContent);
      res.send({}); // 204 No Content
    });
  }
};
