const userRouter = require('express').Router();
const userController = require('../Controllers/user.controller');

userRouter.post('/', userController.register);

module.exports = userRouter;