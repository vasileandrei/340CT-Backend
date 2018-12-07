// eslint-disable-next-line import/no-extraneous-dependencies
const rp = require('request-promise');
const responseUtil = require('../serviceModels/ResponseUtil');

// localhost:8080/GatewayApi/files/getDoc
module.exports.getDocPost = (req, res) => {
  req.body.id = req.params.id;
  const uriPath = 'http://localhost:8082/api/v1/files/getDoc';
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

// localhost:8080/GatewayApi/files/addDoc
module.exports.addDocPost = (req, res) => {
  const uriPath = 'http://localhost:8082/api/v1/files/addDoc';
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

// localhost:8080/GatewayApi/files/delDoc/:id
module.exports.delDocPut = (req, res) => {
  const uriPath = 'http://localhost:8082/api/v1/files/delDoc';
  let formatedResponse = '';
  req.body.id = req.params.id;
  const options = {
    method: 'PUT',
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
