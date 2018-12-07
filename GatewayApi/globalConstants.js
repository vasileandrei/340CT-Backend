const SimpleNodeLogger = require('simple-node-logger');

// ------------ Log file ------------------------------
// ----------------------------------------------------
const opts = {
  logFilePath: './logs/serverLogs.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
};

// Usage
// <export>.fileLog.info('An informational message!');
// <export>.fileLog.info('A warning!');
// <export>.fileLog.info('An error!');

module.exports.fileLog = SimpleNodeLogger.createSimpleLogger(opts);
// ----------------------------------------------------

// ------------ Signatures ----------------------------
// ----------------------------------------------------
module.exports.tokenSignature = 'Not implemented';
module.exports.tokenSignatureAdmin = 'Not implemented - admin';
module.exports.encryptionSignature = 'Not implemented';
// -----------------------------------------------------

// ------------ File Options ------------------------------------
// --------------------------------------------------------------
const biteSize = 1024;
const tenMbLimit = 10;

module.exports.fileExpire = '7 days';
module.exports.fileSizeLimit = biteSize * biteSize * tenMbLimit;
// --------------------------------------------------------------
