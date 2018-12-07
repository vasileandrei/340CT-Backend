
const NewRouter = require('restify-router').Router;

const router = new NewRouter();
const authCheck = require('../middlewares/tokenMiddleware').AuthToken; // Disabled for testing
const checkLevelAdmin = require('../middlewares/tokenMiddleware').checkAdminRole;

const dbController = require('./../controllers/filesDbController');
const userController = require('./../controllers/filesUserController');
const adminController = require('./../controllers/filesAdminController');

// Test route
router.get('/', dbController.usersBaseGet);
// Create a new collection
router.post('/createCollection', authCheck, checkLevelAdmin, dbController.userCreateCollPost);
// Drop a collection
router.del('/dropCollection', authCheck, checkLevelAdmin, dbController.userDropCollPost);

// Get document
router.post('/getDoc', userController.getDocPost);
// Add a document
router.post('/addDoc', userController.addDocPost);
// Soft-delete a document by id
router.put('/delDoc/:id', userController.delDocPut);

// Get all documents (including soft-deleted ones)
router.post('/getAll', checkLevelAdmin, adminController.getAllPost);
// Delete document
router.del('/forceDelete', checkLevelAdmin, adminController.forceDeleteDel);

module.exports = router;
