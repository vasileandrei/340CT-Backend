// eslint-disable-next-line import/no-extraneous-dependencies
const rp = require('request-promise');
const responseUtil = require('../serviceModels/ResponseUtil');

// localhost:8080/GatewayApi/files/getAll
module.exports.getAllPost = function (req, res) {
  const uriPath = 'http://localhost:8082/api/v1/files/getAll';
  let formatedResponse = '';
  const options = {
    method: 'POST',
    uri: uriPath,
    body: req.body,
    headers: req.headers,
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

// localhost:8080/GatewayApi/files/forceDelete
module.exports.forceDeleteDel = function (req, res) {
  const uriPath = 'http://localhost:8082/api/v1/files/forceDelete';
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
