const userRouter = require('express').Router();
const userController = require('../Controllers/user.controller');
const authMiddleware = require('../Middlewares/auth.middleware');

userRouter.post('/', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/softwarelist', authMiddleware.verifyToken, userController.getOwnSoftLists);
//get user's software lists with softwares
userRouter.get('/softwarelist/software', authMiddleware.verifyToken, userController.getSoftwaresFromSoftLists);


module.exports = userRouter;