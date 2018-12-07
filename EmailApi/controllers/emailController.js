// email Controller

const constants = require('./../globalConstants');
const emailUtil = require('./../modules/email');
const util = require('./../modules/util');

// localhost:8083/api/v1/email - test route
module.exports.baseGet = function (req, res) {
  res.status(constants.successOK);
  res.send({ message: 'Hello from baseGet, EmailController' });
};

// localhost:8083/api/v1/email/customer - Sending an email to customer
module.exports.customerSendPost = async function (req, res) {

  res.setHeader('content-type', 'application/json');
  res.setHeader('accepts', 'POST');

  // Check if request is faulty
  util.checkField('email', req.body.email, false, res);
  util.checkField('id', req.body.id, false, res);

  const email = req.body.email;
  const id = req.body.id;

  console.log(`Doing email for ${email}, id ${id}`)

  // Initiate emailing
  const response = await emailUtil.customerSendEmail(email, id);
  const successBool = response[0];
  const dataResponse = response[1];

  if (!successBool) {
    // Failed to send the email - Internal Server Problem
    res.status(constants.serverInternalError);
    res.send({ message: dataResponse });
  } else {
    // Sending successful response
    res.status(constants.successAccepted);
    res.send({
      message: `Email successfully sent to ${email}`,
      preview: dataResponse,
    });
  }
};

// localhost:8083/api/v1/email/customer - Sending an email from customer
module.exports.feedbackSendPost = async function (req, res) {
  
  res.setHeader('content-type', 'application/json');
  res.setHeader('accepts', 'POST');

  // Check if request is faulty
  util.checkField('email', req.body.fullName, false, res);
  util.checkField('id', req.body.email, false, res);
  util.checkField('id', req.body.message, false, res);

  const fullName = req.body.fullName;
  const email = req.body.email;
  const message = req.body.message;

  // Initiate emailing
  const response = await emailUtil.feedbackEmail(fullName, email, message);
  const successBool = response[0];
  const dataResponse = response[1];

  if (!successBool) {
    // Failed to send the email - Internal Server Problem
    res.status(constants.serverInternalError);
    res.send({ message: dataResponse });
  } else {
    // Sending successful response
    res.status(constants.successAccepted);
    res.send({
      message: `Feedback received`,
      preview: dataResponse,
    });
  }
};
