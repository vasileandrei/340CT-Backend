/* eslint-disable max-len */
/* eslint-disable no-magic-numbers */
const expect = require('chai').expect;
const nock = require('nock');

const usersIndex = require('./routes');
const response = require('./routesResponse');

describe('UsrersAPI http://localhost:8081', () => {
  it('/GET /api/v1/users/', () => {
    nock('http://localhost:8081')
      .get('/api/v1/users/')
      .reply(200, response.baseGet);
    return usersIndex.baseGet()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(200);
        expect(res.data.body.message).to.equal('Hello from baseGet, UserController');
        expect(res.data.redirect).to.equal(false);
      });
  });

  it('/POST /api/v1/users/login', () => {
    nock('http://localhost:8081')
      .post('/api/v1/users/login', {
        body: {
          username: 'mochaTest',
          password: 'mochaTest123',
        },
      })
      .reply(201, response.loginPost);
    return usersIndex.loginPost()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(202);
        expect(res.data.body.firstname).to.equal('mochaTest');
        expect(res.data.body.lastname).to.equal('mochaTest');
        expect(res.data.body.email).to.equal('mochaTest@mocha.com');
        expect(res.data.body.username).to.equal('mochaTest');
        expect(res.data.body.message).to.equal('Successfuly generated Token');
        expect(res.data.body.token).to.equal('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNoVG9rZW4iOiI1NjQ0N2ZmNWQ4NjJjNGFiYmQzZDNhZDc3ZGM1YjJjNzZlNmQyOWU5NWU4YzE3N2IzNTYxZjdkM2M4ZGZiZjNmIiwiaWF0IjoxNTQyMTQzNDM0LCJleHAiOjE1NDIxNDUyMzR9.XFncaoADuruUorJOllrjK7qe0iZaDSHPy17I7ZxAoK4');
        expect(res.data.redirect).to.equal(false);
      });
  });

  it('/POST /api/v1/users/register', () => {
    nock('http://localhost:8081')
      .post('/api/v1/users/register', {
        body: {
          username: 'mochaTest',
          password: 'mochaTest123',
          firstname: 'mochaTest',
          lastname: 'mochaTest',
          email: 'mochaTest@mocha.com',
        },
      })
      .reply(204, response.registerPost);
    return usersIndex.registerPost()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(201);
        expect(res.data.body.message).to.equal('User mochaTest successfully registered');
        expect(res.data.redirect).to.equal(false);
      });
  });

  it('/POST /api/v1/users/createTable', () => {
    nock('http://localhost:8081')
      .post('/api/v1/users/createTable', {
        body: {
          tableName: 'mochaTest',
        },
      })
      .reply(201, response.createTablePost);
    return usersIndex.createTablePost()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(201);
        expect(res.data.body.message).to.equal('Succesfully created table mochaTest');
        expect(res.data.redirect).to.equal(false);
      });
  });

  it('/DELETE /api/v1/users/dropTable', () => {
    nock('http://localhost:8081')
      .post('/api/v1/users/dropTable', {
        body: {
          tableName: 'mochaTest',
        },
      })
      .reply(204, response.dropTableDelete);
    return usersIndex.dropTableDelete()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(204); // 204 No Content
        expect(res.data.body.message).to.equal('');
        expect(res.data.redirect).to.equal(false);
      });
  });
});
