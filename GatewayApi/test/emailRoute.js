/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-lines */
/* eslint-disable no-console */
/* eslint-disable max-lines */

const axios = require('axios');

module.exports = {
  baseGet() {
    return axios
      .get('http://localhost:8080/GatewayApi/email/')
      .then(res => res);
  },

  customerPost() {
    return axios
      .post('http://localhost:8080/GatewayApi/email/customer', {
        body: {
          email: 'mochaTest',
          id: 'mochaTest',
        },
      })
      .then(res => res);
  },

  feedbackPost() {
    return axios
      .post('http://localhost:8080/GatewayApi/email/feedback', {
        body: {
          email: 'mochaTest',
          id: 'mochaTest',
        },
      })
      .then(res => res);
  },
};
