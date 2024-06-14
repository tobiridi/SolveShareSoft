const userRouter = require('express').Router();
const userController = require('../Controllers/user.controller');
const authMiddleware = require('../Middlewares/auth.middleware');

userRouter.post('/', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/softwarelist', authMiddleware.verifyToken, userController.getOwnerSoftList);


module.exports = userRouter;