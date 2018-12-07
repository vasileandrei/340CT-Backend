/* eslint-disable no-magic-numbers */

// Integration Testin email module

const emailUtil = require('./../modules/email');

const customerReq = {
  body: {
    email: 'testEmail@fileShare.co.uk',
    id: 'testId',
  },
};

const feedbackReq = {
  body: {
    fullName: 'File Share',
    email: 'testEmail@fileShare.co.uk',
    message: 'someMessage',
  },
};

describe('customerSendEmail', () => {
  test('Succesffuly send an email from customer', async () => {
    expect.assertions(1);
    const email = customerReq.body.email;
    const id = customerReq.body.id;
    const response = await emailUtil.customerSendEmail(email, id);
    expect(response[0]).toBe(true);
  });

  test('Fail to send an email from customer', async () => {
    expect.assertions(2);
    const email = undefined;
    const id = undefined;
    const response = await emailUtil.customerSendEmail(email, id);
    expect(response[0]).toBe(false);
    expect(response[1]).toEqual('No recipients defined');
  });
});

describe('feedbackdEmail', () => {
  test('Succesffuly send feedback from customer', async () => {
    expect.assertions(1);
    const fullName = feedbackReq.body.fullName;
    const email = feedbackReq.body.email;
    const message = feedbackReq.body.message;
    const response = await emailUtil.feedbackEmail(fullName, email, message);
    expect(response[0]).toBe(true);
  });

  test('Succeed with unusual feedback from customer', async () => {
    expect.assertions(1);
    const fullName = undefined;
    const email = undefined;
    const message = undefined;
    const response = await emailUtil.feedbackEmail(fullName, email, message);
    expect(response[0]).toBe(true);
  });
});
