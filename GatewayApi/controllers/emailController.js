
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
const rp = require('request-promise');
const responseUtil = require('../serviceModels/ResponseUtil');

// localhost:8080/GatewayApi/email -- Test route
module.exports.emailBaseGet = function (req, res) {
  const uriPath = 'http://localhost:8083/api/v1/email';
  let formatedResponse = '';
  const options = {
    method: 'GET',
    uri: uriPath,
  };
  rp(options)
    .then((responseFromMicro) => {
      // Create successful reponse
      formatedResponse = responseUtil.CreateDataReponse(true, '', uriPath, responseFromMicro);
      res.send(formatedResponse);
    })
    .catch((err) => {
      // Create failed reponse
      formatedResponse = responseUtil.CreateBaseReponse(false, err, uriPath);
      res.send(formatedResponse);
    });
};

// localhost:8080/GatewayApi/email/customer
module.exports.customerPost = function (req, res) {
  const uriPath = 'http://localhost:8083/api/v1/email/customer';
  let formatedResponse = '';
  const options = {
    method: 'POST',
    uri: uriPath,
    body: req.body,
    json: true, // Automatically stringifies the body to JSON
  };
  rp(options)
    .then((responseFromMicro) => {
    // Create successful reponse
      formatedResponse = responseUtil.CreateDataReponse(true, '', uriPath, responseFromMicro);
      res.send(formatedResponse);
    })
    .catch((err) => {
    // Create failed reponse
      formatedResponse = responseUtil.CreateBaseReponse(false, err, uriPath);
      res.send(formatedResponse);
    });
};

// localhost:8080/GatewayApi/email/feedback
module.exports.feedbackPost = function (req, res) {
  const uriPath = 'http://localhost:8083/api/v1/email/feedback';
  let formatedResponse = '';
  const options = {
    method: 'POST',
    uri: uriPath,
    body: req.body,
    json: true, // Automatically stringifies the body to JSON
  };
  rp(options)
    .then((responseFromMicro) => {
    // Create successful reponse
      formatedResponse = responseUtil.CreateDataReponse(true, '', uriPath, responseFromMicro);
      res.send(formatedResponse);
    })
    .catch((err) => {
    // Create failed reponse
      formatedResponse = responseUtil.CreateBaseReponse(false, err, uriPath);
      res.send(formatedResponse);
    });
};
