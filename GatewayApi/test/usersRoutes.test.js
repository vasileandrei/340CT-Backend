/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable max-statements */
/* eslint-disable max-lines */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-magic-numbers */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
const nock = require('nock');

const usersIndex = require('./usersRoute');
const response = require('./usersResponse');

describe('UsrersAPI http://localhost:8080/GatewayApi/users/', () => {
  it('Success:   /GET 8080/GatewayApi/users/ => 8081/api/v1/users/', () => {
    nock('http://localhost:8080')
      .get('/GatewayApi/users')
      .reply(200, response.usersBaseGet);
    return usersIndex.usersBaseGet()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(200);
        expect(res.data.body.hasBeenSuccessful).to.equal(true);
        expect(res.data.body.errors).to.equal('');
        expect(res.data.body.redirect).to.equal('http://localhost:8081/api/v1/users/');
        expect(res.data.body.content.message).to.equal('Hello from baseGet, UserController');
      });
  });

  it('Success:   /POST 8080/GatewayApi/users/login => 8081/api/v1/users/login', () => {
    nock('http://localhost:8080')
      .post('/GatewayApi/users/login', {
        body: {
          username: 'mochaTest',
          password: 'mochaTest123',
        },
      })
      .reply(201, response.usersLoginPost);
    return usersIndex.usersLoginPost()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(202);
        expect(res.data.body.hasBeenSuccessful).to.equal(true);
        expect(res.data.body.errors).to.equal('');
        expect(res.data.body.redirect).to.equal('http://localhost:8081/api/v1/users/login');
        expect(res.data.body.content.message).to.equal('Successfuly generated Token');
        expect(res.data.body.content.token).to.equal('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNoVG9rZW4iOiI1NjQ0N2ZmNWQ4NjJjNGFiYmQzZDNhZDc3ZGM1YjJjNzZlNmQyOWU5NWU4YzE3N2IzNTYxZjdkM2M4ZGZiZjNmIiwiaWF0IjoxNTQyMTQzNDM0LCJleHAiOjE1NDIxNDUyMzR9.XFncaoADuruUorJOllrjK7qe0iZaDSHPy17I7ZxAoK4');
      });
  });

  it('Success:   /POST 8080/GatewayApi/users/register => 8081/api/v1/users/register', () => {
    nock('http://localhost:8080')
      .post('/GatewayApi/users/register', {
        body: {
          username: 'mochaTest',
          password: 'mochaTest123',
          first_name: 'mochaTest',
          last_name: 'mochaTest',
          email: 'mochaTest@mocha.com',
        },
      })
      .reply(204, response.usersRegisterPost);
    return usersIndex.usersRegisterPost()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(201);
        expect(res.data.body.hasBeenSuccessful).to.equal(true);
        expect(res.data.body.errors).to.equal('');
        expect(res.data.body.redirect).to.equal('http://localhost:8081/api/v1/users/register');
        expect(res.data.body.content.message).to.equal('User mochaTest successfully registered');
      });
  });

  it('Success:   /POST 8080/GatewayApi/users/createTable => 8081/api/v1/users/createTable', () => {
    nock('http://localhost:8080', {
      reqheaders: {
        authorization: 'Bearer correctToken',
      },
    })
      .post('/GatewayApi/users/createTable', {
        body: {
          tableName: 'mochaTest',
        },
      })
      .reply(201, response.usersCreateTablePost);
    return usersIndex.usersCreateTablePost()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(201);
        expect(res.data.body.hasBeenSuccessful).to.equal(true);
        expect(res.data.body.errors).to.equal('');
        expect(res.data.body.redirect).to.equal('http://localhost:8081/api/v1/users/createTable');
        expect(res.data.body.content.message).to.equal('Succesfully created table mochaTest');
        expect(res.data.forbidden).to.equal(false);
        expect(res.config.headers.authorization).to.equal('Bearer correctToken');
      });
  });

  it('Forbidden: /POST 8080/GatewayApi/users/createTable => 8081/api/v1/users/createTable', () => {
    nock('http://localhost:8080', {
      reqheaders: {
        authorization: 'Bearer wrongToken',
      },
    })
      .post('/GatewayApi/users/createTable', {
        body: {
          tableName: 'mochaTest',
        },
      })
      .reply(201, response.forbiddenUsersCreateTablePost);
    return usersIndex.forbiddenUsersCreateTablePost()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(403);
        expect(res.data.body.hasBeenSuccessful).to.equal(false);
        expect(res.data.body.errors).to.equal('Not authorized. Token missing or wrong');
        expect(res.data.body.redirect).to.equal('http://localhost:8081/api/v1/users/createTable');
        expect(res.data.forbidden).to.equal(true);
        expect(res.config.headers.authorization).to.equal('Bearer wrongToken');
      });
  });

  it('Success:   /DELETE 8080/GatewayApi/users/dropTable => 8081/api/v1/users/dropTable', () => {
    nock('http://localhost:8080', {
      reqheaders: {
        authorization: 'Bearer correctToken',
      },
    })
      .post('/GatewayApi/users/dropTable', {
        body: {
          tableName: 'mochaTest',
        },
      })
      .reply(204, response.usersDropTableDelete);
    return usersIndex.usersDropTableDelete()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(204); // 204 No Content
        expect(res.data.body.hasBeenSuccessful).to.equal(true);
        expect(res.data.body.errors).to.equal('');
        expect(res.data.body.redirect).to.equal('http://localhost:8081/api/v1/users/dropTable');
        expect(res.data.body.content.message).to.equal('');
      });
  });

  it('Forbidden: /DELETE 8080/GatewayApi/users/dropTable => 8081/api/v1/users/dropTable', () => {
    nock('http://localhost:8080', {
      reqheaders: {
        authorization: 'Bearer wrongToken',
      },
    })
      .post('/GatewayApi/users/dropTable', {
        body: {
          tableName: 'mochaTest',
        },
      })
      .reply(201, response.forbiddenUsersDropTableDelete);
    return usersIndex.forbiddenUsersDropTableDelete()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(403);
        expect(res.data.body.hasBeenSuccessful).to.equal(false);
        expect(res.data.body.errors).to.equal('Not authorized. Token missing or wrong');
        expect(res.data.body.redirect).to.equal('http://localhost:8081/api/v1/users/dropTable');
        expect(res.data.forbidden).to.equal(true);
        expect(res.config.headers.authorization).to.equal('Bearer wrongToken');
      });
  });
});
