const SimpleNodeLogger = require('simple-node-logger');

// ------------ Log file ------------------------------
// ----------------------------------------------------
const opts = {
  logFilePath: './logs/serverLogs.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
};

// Usage
// <export>.fileLog.info('An informational message!');
// <export>.fileLog.warn('A warning!');
// <export>.fileLog.error('An error!');

module.exports.fileLog = SimpleNodeLogger.createSimpleLogger(opts);
// ----------------------------------------------------


// ------------ HTTP Reponses -------------------------
// ----------------------------------------------------
// Succesful status code
module.exports.successOK = 200;
module.exports.successCreated = 201;
module.exports.successAccepted = 202;
module.exports.successNoContent = 204;

// Client Problem status code
module.exports.clientBadRequest = 400;
module.exports.clientUnauthorized = 401;
module.exports.clientForbidden = 403;
module.exports.clientNotFound = 404;
module.exports.clientMethodNotAllowed = 405;
module.exports.clientConflict = 409;

// Server Problem status code
module.exports.serverInternalError = 500;
module.exports.serverBadGateway = 502;
module.exports.serverGatewayTimeout = 504;
// ----------------------------------------------------


// ------------ Signatures ----------------------------
// ----------------------------------------------------
module.exports.tokenSignature = 'Not implemented';
module.exports.encryptionSignature = 'Not implemented';
// -----------------------------------------------------


// ------------ Email Options -----------------------------------
// --------------------------------------------------------------
module.exports.emailAddress = 'filesharetestemail@gmail.com';
module.exports.emailPassword = 'Vasile.1010';
// --------------------------------------------------------------