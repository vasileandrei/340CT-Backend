/* eslint-disable max-lines */
/* eslint-disable import/no-extraneous-dependencies */

const rp = require('request-promise');
const responseUtil = require('../serviceModels/ResponseUtil');

// localhost:8080/GatewayApi/users -- Test Route
module.exports.usersBaseGet = function (req, res) {
  const uriPath = 'http://localhost:8081/api/v1/users/';
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

// localhost:8080/GatewayApi/users/register
module.exports.userRegisterPost = (req, res) => {
  const uriPath = 'http://localhost:8081/api/v1/users/register';
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

// localhost:8080/GatewayApi/users/login
module.exports.userLoginPost = (req, res) => {
  const uriPath = 'http://localhost:8081/api/v1/users/login';
  let formatedResponse = '';
  const options = {
    method: 'POST',
    uri: uriPath,
    body: req.body,
    json: true,
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

// localhost:8080/GatewayApi/users/signToken
module.exports.signTokenPost = (req, res) => {
  const uriPath = 'http://localhost:8081/api/v1/users/signToken';
  let formatedResponse = '';
  const options = {
    method: 'POST',
    uri: uriPath,
    body: req.body,
    json: true,
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

// localhost:8080/GatewayApi/users/tokenUpdate
module.exports.tokenUpdate = (req, res) => {
  const uriPath = 'http://localhost:8081/api/v1/users/tokenUpdate';
  let formatedResponse = '';
  const options = {
    method: 'POST',
    uri: uriPath,
    body: req.body,
    json: true,
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

// localhost:8080/GatewayApi/users/createTable
module.exports.userCreateTablePost = (req, res) => {
  const uriPath = 'http://localhost:8081/api/v1/users/createTable';
  let formatedResponse = '';
  const options = {
    method: 'POST',
    uri: uriPath,
    body: req.body,
    json: true,
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

// localhost:8080/GatewayApi/users/dropTable
module.exports.userDropTablePost = (req, res) => {
  const uriPath = 'http://localhost:8081/api/v1/users/dropTable';
  let formatedResponse = '';
  const options = {
    method: 'DELETE',
    uri: uriPath,
    body: req.body,
    json: true,
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
