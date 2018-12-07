/* eslint-disable max-lines */
/* eslint-disable import/no-extraneous-dependencies */
const axios = require('axios');

module.exports = {
  filesBaseGet() {
    return axios
      .get('http://localhost:8080/GatewayApi/files/', {
        headers: {
          authorization: 'Bearer correctToken',
        },
      })
      .then(res => res);
    /* istanbul ignore next */
  },

  forbiddenFilesBaseGet() {
    return axios
      .get('http://localhost:8080/GatewayApi/files/', {
        headers: {
          authorization: 'Bearer wrongToken',
        },
      })
      .then(res => res);
    /* istanbul ignore next */
  },

  filesCreateCollectionPost() {
    return axios
      .post('http://localhost:8080/GatewayApi/files/createCollection', {
        body: {
          colname: 'mochaTest',
        },
      }, {
        headers: {
          authorization: 'Bearer correctToken',
        },
      })
      .then(res => res);
    /* istanbul ignore next */
  },

  forbiddenFilesCreateCollectionPost() {
    return axios
      .post('http://localhost:8080/GatewayApi/files/createCollection', {
        body: {
          colname: 'mochaTest',
        },
      }, {
        headers: {
          authorization: 'Bearer wrongToken',
        },
      })
      .then(res => res);
    /* istanbul ignore next */
  },

  filesDropCollectionDelete() {
    return axios
      .post('http://localhost:8080/GatewayApi/files/dropCollection', {
        body: {
          colname: 'mochaTest',
        },
      }, {
        headers: {
          authorization: 'Bearer correctToken',
        },
      })
      .then(res => res);
    /* istanbul ignore next */
  },

  forbiddenFilesDropCollectionDelete() {
    return axios
      .post('http://localhost:8080/GatewayApi/files/dropCollection', {
        body: {
          colname: 'mochaTest',
        },
      }, {
        headers: {
          authorization: 'Bearer wrongToken',
        },
      })
      .then(res => res);
    /* istanbul ignore next */
  },

  filesGetDocPost() {
    return axios
      .post('http://localhost:8080/GatewayApi/files/getDoc', {
        body: {
          colname: 'mochaTest',
          author: 'mochaTest',
        },
      }, {
        headers: {
          authorization: 'Bearer correctToken',
        },
      })
      .then(res => res);
    /* istanbul ignore next */
  },

  forbiddenFilesGetDocPost() {
    return axios
      .post('http://localhost:8080/GatewayApi/files/getDoc', {
        body: {
          colname: 'mochaTest',
          author: 'mochaTest',
        },
      }, {
        headers: {
          authorization: 'Bearer wrongToken',
        },
      })
      .then(res => res);
    /* istanbul ignore next */
  },

  filesAddDocPost() {
    return axios
      .post('http://localhost:8080/GatewayApi/files/addDoc', {
        body: {
          colname: 'mochaTest',
          fileTitle: 'mochaTest',
          fileLink: 'http://mochaTest.co.uk/',
          author: 'mochaTest',
        },
      }, {
        headers: {
          authorization: 'Bearer correctToken',
        },
      })
      .then(res => res);
    /* istanbul ignore next */
  },

  forbiddenFilesAddDocPost() {
    return axios
      .post('http://localhost:8080/GatewayApi/files/addDoc', {
        body: {
          colname: 'mochaTest',
          fileTitle: 'mochaTest',
          fileLink: 'http://mochaTest.co.uk/',
          author: 'mochaTest',
        },
      }, {
        headers: {
          authorization: 'Bearer wrongToken',
        },
      })
      .then(res => res);
    /* istanbul ignore next */
  },

  filesDelDocPost() {
    return axios
      .put('http://localhost:8080/GatewayApi/files/delDoc', {
        body: {
          colname: 'mochaTest',
          fileTitle: 'mochaTest',
        },
      }, {
        headers: {
          authorization: 'Bearer correctToken',
        },
      })
      .then(res => res);
    /* istanbul ignore next */
  },

  forbiddenFilesDelDocPost() {
    return axios
      .put('http://localhost:8080/GatewayApi/files/delDoc', {
        body: {
          colname: 'mochaTest',
          fileTitle: 'mochaTest',
        },
      }, {
        headers: {
          authorization: 'Bearer wrongToken',
        },
      })
      .then(res => res);
    /* istanbul ignore next */
  },

  filesGetAllPost() {
    return axios
      .post('http://localhost:8080/GatewayApi/files/getAll', {
        body: {
          colname: 'mochaTest',
        },
      }, {
        headers: {
          authorization: 'Bearer correctToken',
        },
      })
      .then(res => res);
    /* istanbul ignore next */
  },

  forbiddenFilesGetAllPost() {
    return axios
      .post('http://localhost:8080/GatewayApi/files/getAll', {
        body: {
          colname: 'mochaTest',
        },
      }, {
        headers: {
          authorization: 'Bearer wrongToken',
        },
      })
      .then(res => res);
    /* istanbul ignore next */
  },

  filesForceDeleteDelete() {
    return axios
      .post('http://localhost:8080/GatewayApi/files/forceDelete', {
        body: {
          colname: 'mochaTest',
          fileTitle: 'mochaTest',
        },
      }, {
        headers: {
          authorization: 'Bearer correctToken',
        },
      })
      .then(res => res);
    /* istanbul ignore next */
  },

  forbiddenFilesForceDeleteDelete() {
    return axios
      .post('http://localhost:8080/GatewayApi/files/forceDelete', {
        body: {
          colname: 'mochaTest',
          fileTitle: 'mochaTest',
        },
      }, {
        headers: {
          authorization: 'Bearer wrongToken',
        },
      })
      .then(res => res);
    /* istanbul ignore next */
  },
};
