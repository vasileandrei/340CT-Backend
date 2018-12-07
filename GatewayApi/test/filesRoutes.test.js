/* eslint-disable max-lines */
/* eslint-disable max-statements */
/* eslint-disable max-lines */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-magic-numbers */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
const nock = require('nock');

const filesIndex = require('./filesRoute');
const response = require('./filesResponse');

describe('FilesAPI http://localhost:8080/GatewayApi/files/', () => {
  it('Success:   /GET 8080/GatewayApi/users/ => 8081/api/v1/users/', () => {
    nock('http://localhost:8080', {
      reqheaders: {
        authorization: 'Bearer correctToken',
      },
    })
      .get('/GatewayApi/files/')
      .reply(200, response.filesBaseGet);
    return filesIndex.filesBaseGet()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(200);
        expect(res.data.body.hasBeenSuccessful).to.equal(true);
        expect(res.data.body.errors).to.equal('');
        expect(res.data.body.redirect).to.equal('http://localhost:8082/api/v1/files/');
        expect(res.data.body.content.message).to.equal('Hello from baseGet, FilesController');
        expect(res.data.forbidden).to.equal(false);
        expect(res.config.headers.authorization).to.equal('Bearer correctToken');
      });
  });

  it('Forbidden: /GET 8080/GatewayApi/users/ => 8081/api/v1/users/', () => {
    nock('http://localhost:8080', {
      reqheaders: {
        authorization: 'Bearer wrongToken',
      },
    })
      .get('/GatewayApi/files/')
      .reply(200, response.forbiddenFilesBaseGet);
    return filesIndex.forbiddenFilesBaseGet()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(403);
        expect(res.data.body.hasBeenSuccessful).to.equal(false);
        expect(res.data.body.errors).to.equal('Not authorized. Token missing or wrong');
        expect(res.data.body.redirect).to.equal('http://localhost:8082/api/v1/files/');
        expect(res.data.forbidden).to.equal(true);
        expect(res.config.headers.authorization).to.equal('Bearer wrongToken');
      });
  });

  it('Success:   /POST 8080/GatewayApi/users/createCollection => 8081/api/v1/users/createCollection', () => {
    nock('http://localhost:8080', {
      reqheaders: {
        authorization: 'Bearer correctToken',
      },
    })
      .post('/GatewayApi/files/createCollection', {
        body: {
          colname: 'mochaTest',
        },
      })
      .reply(201, response.filesCreateCollectionPost);
    return filesIndex.filesCreateCollectionPost()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(201);
        expect(res.data.body.hasBeenSuccessful).to.equal(true);
        expect(res.data.body.errors).to.equal('');
        expect(res.data.body.redirect).to.equal('http://localhost:8082/api/v1/files/createCollection');
        expect(res.data.body.content.message).to.equal('Created a new collection mochaTest');
        expect(res.data.forbidden).to.equal(false);
        expect(res.config.headers.authorization).to.equal('Bearer correctToken');
      });
  });

  it('Forbidden: /POST 8080/GatewayApi/users/createCollection => 8081/api/v1/users/createCollection', () => {
    nock('http://localhost:8080', {
      reqheaders: {
        authorization: 'Bearer wrongToken',
      },
    })
      .post('/GatewayApi/files/createCollection', {
        body: {
          colname: 'mochaTest',
        },
      })
      .reply(201, response.forbiddenFilesCreateCollectionPost);
    return filesIndex.forbiddenFilesCreateCollectionPost()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(403);
        expect(res.data.body.hasBeenSuccessful).to.equal(false);
        expect(res.data.body.errors).to.equal('Not authorized. Token missing or wrong');
        expect(res.data.body.redirect).to.equal('http://localhost:8082/api/v1/files/createCollection');
        expect(res.data.forbidden).to.equal(true);
        expect(res.config.headers.authorization).to.equal('Bearer wrongToken');
      });
  });

  it('Success:   /DELETE 8080/GatewayApi/users/dropCollection => 8081/api/v1/users/dropCollection', () => {
    nock('http://localhost:8080', {
      reqheaders: {
        authorization: 'Bearer correctToken',
      },
    })
      .post('/GatewayApi/files/dropCollection', {
        body: {
          colname: 'mochaTest',
        },
      })
      .reply(204, response.filesDropCollectionDelete);
    return filesIndex.filesDropCollectionDelete()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(204); // 204 No Content
        expect(res.data.body.hasBeenSuccessful).to.equal(true);
        expect(res.data.body.errors).to.equal('');
        expect(res.data.body.redirect).to.equal('http://localhost:8082/api/v1/files/dropCollection');
        expect(res.data.body.content.message).to.equal('');
        expect(res.data.forbidden).to.equal(false);
        expect(res.config.headers.authorization).to.equal('Bearer correctToken');
      });
  });

  it('Forbidden: /DELETE 8080/GatewayApi/users/dropCollection => 8081/api/v1/users/dropCollection', () => {
    nock('http://localhost:8080', {
      reqheaders: {
        authorization: 'Bearer wrongToken',
      },
    })
      .post('/GatewayApi/files/dropCollection', {
        body: {
          colname: 'mochaTest',
        },
      })
      .reply(204, response.forbiddenFilesDropCollectionDelete);
    return filesIndex.forbiddenFilesDropCollectionDelete()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(403);
        expect(res.data.body.hasBeenSuccessful).to.equal(false);
        expect(res.data.body.errors).to.equal('Not authorized. Token missing or wrong');
        expect(res.data.body.redirect).to.equal('http://localhost:8082/api/v1/files/dropCollection');
        expect(res.data.forbidden).to.equal(true);
        expect(res.config.headers.authorization).to.equal('Bearer wrongToken');
      });
  });

  it('Success:   /POST 8080/GatewayApi/users/getDoc => 8081/api/v1/users/getDoc', () => {
    const expectedRes = {
      _id: '5be9ef05ebeb4807ecd8f82d',
      colname: 'mochaTest',
      fileTitle: 'mochaTest',
      fileLink: 'http://mochaTest.co.uk/',
      author: 'mochaTest',
      deleted: false,
    };
    nock('http://localhost:8080', {
      reqheaders: {
        authorization: 'Bearer correctToken',
      },
    })
      .post('/GatewayApi/files/getDoc', {
        body: {
          colname: 'mochaTest',
          author: 'mochaTest',
        },
      })
      .reply(200, response.filesGetDocPost);
    return filesIndex.filesGetDocPost()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(200); // 204 No Content
        expect(res.data.body.hasBeenSuccessful).to.equal(true);
        expect(res.data.body.errors).to.equal('');
        expect(res.data.body.redirect).to.equal('http://localhost:8082/api/v1/files/getDoc');
        expect(res.data.body.content[0]._id).to.equal(expectedRes._id);
        expect(res.data.body.content[0].colname).to.equal(expectedRes.colname);
        expect(res.data.body.content[0].fileTitle).to.equal(expectedRes.fileTitle);
        expect(res.data.body.content[0].fileLink).to.equal(expectedRes.fileLink);
        expect(res.data.body.content[0].author).to.equal(expectedRes.author);
        expect(res.data.body.content[0].deleted).to.equal(expectedRes.deleted);
        expect(res.data.forbidden).to.equal(false);
        expect(res.config.headers.authorization).to.equal('Bearer correctToken');
      });
  });

  it('Forbidden: /POST 8080/GatewayApi/users/getDoc => 8081/api/v1/users/getDoc', () => {
    nock('http://localhost:8080', {
      reqheaders: {
        authorization: 'Bearer wrongToken',
      },
    })
      .post('/GatewayApi/files/getDoc', {
        body: {
          colname: 'mochaTest',
          author: 'mochaTest',
        },
      })
      .reply(200, response.forbiddenFilesGetDocPost);
    return filesIndex.forbiddenFilesGetDocPost()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(403);
        expect(res.data.body.hasBeenSuccessful).to.equal(false);
        expect(res.data.body.errors).to.equal('Not authorized. Token missing or wrong');
        expect(res.data.body.redirect).to.equal('http://localhost:8082/api/v1/files/getDoc');
        expect(res.data.forbidden).to.equal(true);
        expect(res.config.headers.authorization).to.equal('Bearer wrongToken');
      });
  });

  it('Success:   /POST 8080/GatewayApi/users/addDoc => 8081/api/v1/users/addDoc', () => {
    nock('http://localhost:8080', {
      reqheaders: {
        authorization: 'Bearer correctToken',
      },
    })
      .post('/GatewayApi/files/addDoc', {
        body: {
          colname: 'mochaTest',
          fileTitle: 'mochaTest',
          fileLink: 'http://mochaTest.co.uk/',
          author: 'mochaTest',
        },
      })
      .reply(201, response.filesAddDocPost);
    return filesIndex.filesAddDocPost()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(201);
        expect(res.data.body.hasBeenSuccessful).to.equal(true);
        expect(res.data.body.errors).to.equal('');
        expect(res.data.body.redirect).to.equal('http://localhost:8082/api/v1/files/addDoc');
        expect(res.data.body.content.message).to.equal('Successfully uploaded');
        expect(res.data.forbidden).to.equal(false);
        expect(res.config.headers.authorization).to.equal('Bearer correctToken');
      });
  });

  it('Forbidden: /POST 8080/GatewayApi/users/addDoc => 8081/api/v1/users/addDoc', () => {
    nock('http://localhost:8080', {
      reqheaders: {
        authorization: 'Bearer wrongToken',
      },
    })
      .post('/GatewayApi/files/addDoc', {
        body: {
          colname: 'mochaTest',
          fileTitle: 'mochaTest',
          fileLink: 'http://mochaTest.co.uk/',
          author: 'mochaTest',
        },
      })
      .reply(201, response.forbiddenFilesAddDocPost);
    return filesIndex.forbiddenFilesAddDocPost()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(403);
        expect(res.data.body.hasBeenSuccessful).to.equal(false);
        expect(res.data.body.errors).to.equal('Not authorized. Token missing or wrong');
        expect(res.data.body.redirect).to.equal('http://localhost:8082/api/v1/files/addDoc');
        expect(res.data.forbidden).to.equal(true);
        expect(res.config.headers.authorization).to.equal('Bearer wrongToken');
      });
  });

  it('Success:   /PUT 8080/GatewayApi/users/delDoc => 8081/api/v1/users/delDoc', () => {
    nock('http://localhost:8080', {
      reqheaders: {
        authorization: 'Bearer correctToken',
      },
    })
      .put('/GatewayApi/files/delDoc', {
        body: {
          colname: 'mochaTest',
          fileTitle: 'mochaTest',
        },
      })
      .reply(204, response.filesDelDocPost);
    return filesIndex.filesDelDocPost()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(204); // 204 No Content
        expect(res.data.body.hasBeenSuccessful).to.equal(true);
        expect(res.data.body.errors).to.equal('');
        expect(res.data.body.redirect).to.equal('http://localhost:8082/api/v1/files/delDoc');
        expect(res.data.body.content.message).to.equal('');
        expect(res.data.body.content.deleted).to.equal(true);
        expect(res.data.forbidden).to.equal(false);
        expect(res.config.headers.authorization).to.equal('Bearer correctToken');
      });
  });

  it('Forbidden: /PUT 8080/GatewayApi/users/delDoc => 8081/api/v1/users/delDoc', () => {
    nock('http://localhost:8080', {
      reqheaders: {
        authorization: 'Bearer wrongToken',
      },
    })
      .put('/GatewayApi/files/delDoc', {
        body: {
          colname: 'mochaTest',
          fileTitle: 'mochaTest',
        },
      })
      .reply(204, response.forbiddenFilesDelDocPost);
    return filesIndex.forbiddenFilesDelDocPost()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(403);
        expect(res.data.body.hasBeenSuccessful).to.equal(false);
        expect(res.data.body.errors).to.equal('Not authorized. Token missing or wrong');
        expect(res.data.body.redirect).to.equal('http://localhost:8082/api/v1/files/delDoc');
        expect(res.data.forbidden).to.equal(true);
        expect(res.config.headers.authorization).to.equal('Bearer wrongToken');
      });
  });

  it('Success:   /POST 8080/GatewayApi/users/getAll => 8081/api/v1/users/getAll', () => {
    const expectedRes = [{
      _id: '5be9ef05ebeb4807ecd8f82d',
      colname: 'mochaTest',
      fileTitle: 'mochaTest',
      fileLink: 'http://mochaTest.co.uk/',
      author: 'mochaTest',
      deleted: false,
    }, {
      _id: '4be9ef05ebeb4807ecd8f82d',
      colname: 'mochaTest',
      fileTitle: 'mochaTest1',
      fileLink: 'http://mochaTest1.co.uk/',
      author: 'mochaTest',
      deleted: true,
    }];
    nock('http://localhost:8080', {
      reqheaders: {
        authorization: 'Bearer correctToken',
      },
    })
      .post('/GatewayApi/files/getAll', {
        body: {
          colname: 'mochaTest',
        },
      })
      .reply(200, response.filesGetAllPost);
    return filesIndex.filesGetAllPost()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(200);
        expect(res.data.body.hasBeenSuccessful).to.equal(true);
        expect(res.data.body.errors).to.equal('');
        expect(res.data.body.redirect).to.equal('http://localhost:8082/api/v1/files/getAll');
        expect(res.data.body.content[0]._id).to.equal(expectedRes[0]._id);
        expect(res.data.body.content[0].colname).to.equal(expectedRes[0].colname);
        expect(res.data.body.content[0].fileTitle).to.equal(expectedRes[0].fileTitle);
        expect(res.data.body.content[0].fileLink).to.equal(expectedRes[0].fileLink);
        expect(res.data.body.content[0].author).to.equal(expectedRes[0].author);
        expect(res.data.body.content[0].deleted).to.equal(expectedRes[0].deleted);
        expect(res.data.body.content[1]._id).to.equal(expectedRes[1]._id);
        expect(res.data.body.content[1].colname).to.equal(expectedRes[1].colname);
        expect(res.data.body.content[1].fileTitle).to.equal(expectedRes[1].fileTitle);
        expect(res.data.body.content[1].fileLink).to.equal(expectedRes[1].fileLink);
        expect(res.data.body.content[1].author).to.equal(expectedRes[1].author);
        expect(res.data.body.content[1].deleted).to.equal(expectedRes[1].deleted);
        expect(res.data.forbidden).to.equal(false);
        expect(res.config.headers.authorization).to.equal('Bearer correctToken');
      });
  });

  it('Forbidden: /POST 8080/GatewayApi/users/getAll => 8081/api/v1/users/getAll', () => {
    nock('http://localhost:8080', {
      reqheaders: {
        authorization: 'Bearer wrongToken',
      },
    })
      .post('/GatewayApi/files/getAll', {
        body: {
          colname: 'mochaTest',
        },
      })
      .reply(200, response.forbiddenFilesGetAllPost);
    return filesIndex.forbiddenFilesGetAllPost()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(403);
        expect(res.data.body.hasBeenSuccessful).to.equal(false);
        expect(res.data.body.errors).to.equal('Not authorized. Token missing or wrong');
        expect(res.data.body.redirect).to.equal('http://localhost:8082/api/v1/files/getAll');
        expect(res.data.forbidden).to.equal(true);
        expect(res.config.headers.authorization).to.equal('Bearer wrongToken');
      });
  });

  it('Success:   /DELETE 8080/GatewayApi/users/forceDelete => 8081/api/v1/users/forceDelete', () => {
    nock('http://localhost:8080', {
      reqheaders: {
        authorization: 'Bearer correctToken',
      },
    })
      .post('/GatewayApi/files/forceDelete', {
        body: {
          colname: 'mochaTest',
          fileTitle: 'mochaTest',
        },
      })
      .reply(204, response.filesForceDeleteDelete);
    return filesIndex.filesForceDeleteDelete()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(204); // 204 No Content
        expect(res.data.body.hasBeenSuccessful).to.equal(true);
        expect(res.data.body.errors).to.equal('');
        expect(res.data.body.redirect).to.equal('http://localhost:8082/api/v1/files/forceDelete');
        expect(res.data.body.content.message).to.equal('');
        expect(res.data.forbidden).to.equal(false);
        expect(res.config.headers.authorization).to.equal('Bearer correctToken');
      });
  });

  it('Forbidden: /DELETE 8080/GatewayApi/users/forceDelete => 8081/api/v1/users/forceDelete', () => {
    nock('http://localhost:8080', {
      reqheaders: {
        authorization: 'Bearer wrongToken',
      },
    })
      .post('/GatewayApi/files/forceDelete', {
        body: {
          colname: 'mochaTest',
          fileTitle: 'mochaTest',
        },
      })
      .reply(204, response.forbiddenFilesForceDeleteDelete);
    return filesIndex.forbiddenFilesForceDeleteDelete()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(403);
        expect(res.data.body.hasBeenSuccessful).to.equal(false);
        expect(res.data.body.errors).to.equal('Not authorized. Token missing or wrong');
        expect(res.data.body.redirect).to.equal('http://localhost:8082/api/v1/files/forceDelete');
        expect(res.data.forbidden).to.equal(true);
        expect(res.config.headers.authorization).to.equal('Bearer wrongToken');
      });
  });
});
