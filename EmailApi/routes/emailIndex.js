const NewRouter = require('restify-router').Router;

const emailRouter = new NewRouter();
const emailController = require('./../controllers/emailController');

// Base Directory test Get
emailRouter.get('/', emailController.baseGet);

// Send basic customer email
emailRouter.post('/customer', emailController.customerSendPost);
// Send basic feedback email
emailRouter.post('/feedback', emailController.feedbackSendPost);

module.exports = emailRouter;
