// eslint-disable-next-line import/no-extraneous-dependencies
const rp = require('request-promise');
const responseUtil = require('../serviceModels/ResponseUtil');

// localhost:8080/GatewayApi/files -- Test route
module.exports.usersBaseGet = (req, res) => {
  const uriPath = 'http://localhost:8082/api/v1/files/';
  let formatedResponse = '';
  const options = {
    method: 'GET',
    uri: uriPath,
    headers: req.headers,
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

// localhost:8080/GatewayApi/files/createCollection
module.exports.userCreateCollPost = (req, res) => {
  const uriPath = 'http://localhost:8082/api/v1/files/createCollection';
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

// localhost:8080/GatewayApi/files/dropCollection
module.exports.userDropCollPost = (req, res) => {
  const uriPath = 'http://localhost:8082/api/v1/files/dropCollection';
  let formatedResponse = '';
  const options = {
    method: 'DELETE',
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
