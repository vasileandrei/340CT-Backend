const NewRouter = require('restify-router').Router;

const usersRouter = new NewRouter();
const usersController = require('../controllers/usersController');

// Base Directory test Get
usersRouter.get('/', usersController.baseGet);

// Add a user to the SQL database
usersRouter.post('/login', usersController.loginPost);
// Add a user to the SQL database
usersRouter.post('/register', usersController.registerPost);
// // Add a user to the SQL database

usersRouter.post('/tokenUpdate', usersController.deleteFileFromUserPost);
// usersRouter.del('/deleteUser', usersController.de);
usersRouter.post('/signToken', usersController.signTokenPost);

// Create a custom table in the SQL database
usersRouter.post('/createTable', usersController.createTablePost);
// Drop/Delete a custom table in the SQL database
usersRouter.del('/dropTable', usersController.dropTablePost);

module.exports = usersRouter;
