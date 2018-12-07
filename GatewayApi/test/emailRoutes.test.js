/* eslint-disable max-lines */
/* eslint-disable max-statements */
/* eslint-disable max-lines */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-magic-numbers */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
const nock = require('nock');

const emailIndex = require('./emailRoute');
const response = require('./emailResponse');

describe('EmailApi http://localhost:8080', () => {
  it('/GET /GatewayApi/email/', () => {
    nock('http://localhost:8080')
      .get('/GatewayApi/email/')
      .reply(200, response.baseGet);
    return emailIndex.baseGet()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(200);
        expect(res.data.body.hasBeenSuccessful).to.equal(true);
        expect(res.data.body.errors).to.equal('');
        expect(res.data.body.redirect).to.equal('http://localhost:8083/api/v1/email/');
        expect(res.data.body.content.message).to.equal('Hello from baseGet, EmailController');
      });
  });

  it('/POST /GatewayApi/email/customer', () => {
    nock('http://localhost:8080')
      .post('/GatewayApi/email/customer', {
        body: {
          email: 'mochaTest',
          id: 'mochaTest',
        },
      })
      .reply(200, response.customerPost);
    return emailIndex.customerPost()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(200);
        expect(res.data.body.hasBeenSuccessful).to.equal(true);
        expect(res.data.body.errors).to.equal('');
        expect(res.data.body.redirect).to.equal('http://localhost:8083/api/v1/email/customer');
        expect(res.data.body.content.message).to.equal('Email successfully sent to mochaTest');
      });
  });

  it('/POST /GatewayApi/email/feedback', () => {
    nock('http://localhost:8080')
      .post('/GatewayApi/email/feedback', {
        body: {
          email: 'mochaTest',
          id: 'mochaTest',
        },
      })
      .reply(200, response.feedbackPost);
    return emailIndex.feedbackPost()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(200);
        expect(res.data.body.hasBeenSuccessful).to.equal(true);
        expect(res.data.body.errors).to.equal('');
        expect(res.data.body.redirect).to.equal('http://localhost:8083/api/v1/email/feedback');
        expect(res.data.body.content.message).to.equal('Feedback received');
      });
  });
});
