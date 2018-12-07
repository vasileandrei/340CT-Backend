/* eslint-disable no-console */
const axios = require('axios');

module.exports = {
  baseGet() {
    return axios
      .get('http://localhost:8081/api/v1/users/');
  },

  loginPost() {
    return axios
      .post('http://localhost:8081/api/v1/users/login', {
        body: {
          username: 'mochaTest',
          password: 'mochaTest123',
        },
      });
  },

  registerPost() {
    return axios
      .post('http://localhost:8081/api/v1/users/register', {
        body: {
          username: 'mochaTest',
          password: 'mochaTest123',
          firstname: 'mochaTest',
          lastname: 'mochaTest',
          email: 'mochaTest@mocha.com',
        },
      });
  },

  createTablePost() {
    return axios
      .post('http://localhost:8081/api/v1/users/createTable', {
        body: {
          tableName: 'mochaTest',
        },
      });
  },

  dropTableDelete() {
    return axios
      .post('http://localhost:8081/api/v1/users/dropTable', {
        body: {
          tableName: 'mochaTest',
        },
      });
  },
};
