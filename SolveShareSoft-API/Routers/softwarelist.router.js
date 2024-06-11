const softwareListRouter = require('express').Router();
const softwareListController = require('../Controllers/softwareList.controller');
const authMiddleware = require('../Middlewares/auth.middleware');

softwareListRouter.use(authMiddleware.verifyToken);

softwareListRouter.route('/')
    .get(softwareListController.getAllPublicSoftList)
    .post(softwareListController.createSoftList)

softwareListRouter.route('/:id')
    .put(softwareListController.updateSoftList)
    .delete(softwareListController.deleteSoftList)

module.exports = softwareListRouter;