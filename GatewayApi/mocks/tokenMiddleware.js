const jwt = require('jsonwebtoken');
const config = require('../config');
const constants = require('../globalConstants');

module.exports.checkSignature = function (token) {
  let bool = false;
  jwt.verify(token, constants.tokenSignature, (err) => {
    if (!err) bool = true;
    else bool = false;
  });
  return bool;
};

module.exports.checkAdminRole = function checkAdminRole(req) {
  const bearerHeader = req.headers.authorization;
  // check for x-www-form-urlencoded' as well
  if (typeof bearerHeader !== 'undefined') {
    const tokenIndex = 1;
    const decoded = jwt.decode(bearerHeader.split(' ')[tokenIndex]);
    if (!(decoded.userInfo.role <= config.accessLevels.admin)) {
      return false;
    }
    return true;
  }
  return false;
};

module.exports.AuthToken = function (req) {
  let bool = false;
  const bearerHeader = req.headers.authorization;
  // check for x-www-form-urlencoded' as well
  if (typeof bearerHeader !== 'undefined') {
    const tokenIndex = 1;
    const bearerToken = bearerHeader.split(' ');
    const token = bearerToken[tokenIndex];
    if (token) bool = true;
  } else {
    bool = false;
  }
  return bool;
};
