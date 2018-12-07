
const NewRouter = require('restify-router').Router;

const router = new NewRouter();
// const authCheck = require('../middlewares/tokenMiddleware').AuthToken; // Disabled for testing
const checkLevelAdmin = require('../middlewares/tokenMiddleware').checkAdminRole;

const emailController = require('./../controllers/emailController');

// Testing basic connection through gateway
router.get('/', checkLevelAdmin, emailController.emailBaseGet);

// send email server -> customer
router.post('/customer', emailController.customerPost);
// send email customer -> server
router.post('/feedback', emailController.feedbackPost);


module.exports = router;
