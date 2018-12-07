/* eslint-disable max-lines */
/* eslint-disable max-statements */
/* eslint-disable max-lines */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-magic-numbers */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
const nock = require('nock');

const emailIndex = require('./emailIndex');
const response = require('./response');

describe('EmailApi http://localhost:8083', () => {
  it('/GET /api/v1/email/', () => {
    nock('http://localhost:8083')
      .get('/api/v1/email/')
      .reply(200, response.baseGet);
    return emailIndex.baseGet()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(200);
        expect(res.data.body.message).to.equal('Hello from baseGet, EmailController');
        expect(res.data.redirect).to.equal(false);
      });
  });

  it('/POST /api/v1/email/customer', () => {
    nock('http://localhost:8083')
      .post('/api/v1/email/customer', {
        body: {
          email: 'mochaTest',
          id: 'mochaTest'
        },
      })
      .reply(200, response.customerPost);
    return emailIndex.customerPost()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(202);
        expect(res.data.body.message).to.equal('Email successfully sent to mochaTest');
        expect(res.data.redirect).to.equal(false);
      });
  });

  it('/POST /api/v1/email/feedback', () => {
    nock('http://localhost:8083')
      .post('/api/v1/email/feedback', {
        body: {
          email: 'mochaTest',
          id: 'mochaTest'
        },
      })
      .reply(200, response.feedbackPost);
    return emailIndex.feedbackPost()
      .then((res) => {
        expect(typeof res).to.equal('object');
        expect(res.data.status).to.equal(202);
        expect(res.data.body.message).to.equal('Feedback received');
        expect(res.data.redirect).to.equal(false);
      });
  });
});
