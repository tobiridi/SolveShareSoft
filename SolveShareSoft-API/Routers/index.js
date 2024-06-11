const router = require('express').Router();
const categoryRouter = require('./category.router');
const softwareListRouter = require('./softwarelist.router');
const userRouter = require('./user.router');

router.use('/user', userRouter);
router.use('/softwarelist', softwareListRouter);
router.use('/category', categoryRouter);

module.exports = router;