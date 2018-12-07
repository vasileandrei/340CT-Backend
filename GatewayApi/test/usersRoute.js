/* eslint-disable import/no-extraneous-dependencies */
const axios = require('axios');

module.exports = {
  usersBaseGet() {
    return axios
      .get('http://localhost:8080/GatewayApi/users')
      .then(res => res);
  },

  usersLoginPost() {
    return axios
      .post('http://localhost:8080/GatewayApi/users/login', {
        body: {
          username: 'mochaTest',
          password: 'mochaTest123',
        },
      })
      .then(res => res);
  },

  usersRegisterPost() {
    return axios
      .post('http://localhost:8080/GatewayApi/users/register', {
        body: {
          username: 'mochaTest',
          password: 'mochaTest123',
          first_name: 'mochaTest',
          last_name: 'mochaTest',
          email: 'mochaTest@mocha.com',
        },
      })
      .then(res => res);
  },

  usersCreateTablePost() {
    return axios
      .post('http://localhost:8080/GatewayApi/users/createTable', {
        body: {
          tableName: 'mochaTest',
        },
      }, {
        headers: {
          authorization: 'Bearer correctToken',
        },
      })
      .then(res => res);
  },

  forbiddenUsersCreateTablePost() {
    return axios
      .post('http://localhost:8080/GatewayApi/users/createTable', {
        body: {
          tableName: 'mochaTest',
        },
      }, {
        headers: {
          authorization: 'Bearer wrongToken',
        },
      })
      .then(res => res);
  },

  usersDropTableDelete() {
    return axios
      .post('http://localhost:8080/GatewayApi/users/dropTable', {
        body: {
          tableName: 'mochaTest',
        },
      }, {
        headers: {
          authorization: 'Bearer correctToken',
        },
      })
      .then(res => res);
  },

  forbiddenUsersDropTableDelete() {
    return axios
      .post('http://localhost:8080/GatewayApi/users/dropTable', {
        body: {
          tableName: 'mochaTest',
        },
      }, {
        headers: {
          authorization: 'Bearer wrongToken',
        },
      })
      .then(res => res);
  },
};
