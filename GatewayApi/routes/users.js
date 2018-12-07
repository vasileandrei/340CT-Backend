
const NewRouter = require('restify-router').Router;

const router = new NewRouter();
const usersController = require('./../controllers/usersController');
const authCheck = require('../middlewares/tokenMiddleware').AuthToken; // Disabled for testing
const checkLevelAdmin = require('../middlewares/tokenMiddleware').checkAdminRole;

// Test Route
router.get('/', usersController.usersBaseGet);
// Register an user
router.post('/register', usersController.userRegisterPost);
// Login existing user
router.post('/login', usersController.userLoginPost);

// Sign a token
router.post('/signToken', usersController.signTokenPost);
// Re-sign a token/ Update token
router.post('/tokenUpdate', usersController.tokenUpdate);

// Create a new database table
router.post('/createTable', authCheck, checkLevelAdmin, usersController.userCreateTablePost);
// Delete a table
router.del('/dropTable', authCheck, checkLevelAdmin, usersController.userDropTablePost);

module.exports = router;
