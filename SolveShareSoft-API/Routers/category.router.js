const categoryRouter = require('express').Router();
const categoryController = require('../Controllers/category.controller');
const authMiddleware = require('../Middlewares/auth.middleware');

categoryRouter.use(authMiddleware.verifyToken);

categoryRouter.route('/')
    .get(categoryController.getAllCategory)
    .post(categoryController.createCategory)

categoryRouter.delete('/:id', categoryController.deleteCategory);

module.exports = categoryRouter;