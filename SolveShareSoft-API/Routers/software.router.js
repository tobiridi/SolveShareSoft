const softwareRouter = require('express').Router();
const softwareController = require('../Controllers/software.controller');
const authMiddleware = require('../Middlewares/auth.middleware');

softwareRouter.use(authMiddleware.verifyToken);

softwareRouter.post('/', softwareController.createSoft);

module.exports = softwareRouter;