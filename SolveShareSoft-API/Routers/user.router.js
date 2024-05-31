const userRouter = require('express').Router();
const userController = require('../Controllers/user.controller');

userRouter.post('/', userController.register);
userRouter.post('/login', userController.login);

module.exports = userRouter;