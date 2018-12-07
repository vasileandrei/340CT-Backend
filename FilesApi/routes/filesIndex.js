const NewRouter = require('restify-router').Router;

const filesRouter = new NewRouter();

const dbController = require('./../controllers/filesController');
const usersController = require('./../controllers/usersController');
const adminController = require('./../controllers/adminController');

// Base Directory test Get
filesRouter.get('/', dbController.baseGet);
// Create Mongo collection on mLab
filesRouter.post('/createCollection', dbController.createCollectionPost);
// Create Mongo collection on mLab
filesRouter.del('/dropCollection', dbController.dropCollectionDel);

// Get Document
filesRouter.post('/getDoc', usersController.GetOne);
// Add document to the DB
filesRouter.post('/addDoc', usersController.AddOne);
// Soft Delete Document
filesRouter.put('/delDoc', usersController.SoftDelete);

// Get all document from the DB (including soft-deleted ones)
filesRouter.post('/getAll', adminController.getAll);
// Force delete document
filesRouter.del('/forceDelete', adminController.ForceDelete);

module.exports = filesRouter;
