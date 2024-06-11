const softwareListRouter = require('express').Router();
const softwareListController = require('../Controllers/softwareList.controller');
const authMiddleware = require('../Middlewares/auth.middleware');

//TODO: don't forget to uncomment
//softwareListRouter.use(authMiddleware.verifyToken);

softwareListRouter.route('/')
    .get(softwareListController.getAllSoftList)
    .post(softwareListController.createSoftList)

softwareListRouter.route('/:id')
    .put(softwareListController.updateSoftList)
    .delete(softwareListController.deleteSoftList)

module.exports = softwareListRouter;