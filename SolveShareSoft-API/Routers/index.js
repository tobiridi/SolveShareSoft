const router = require('express').Router();
const categoryRouter = require('./category.router');
const softwareRouter = require('./software.router');
const softwareListRouter = require('./softwarelist.router');
const userRouter = require('./user.router');

router.use('/user', userRouter);
router.use('/softwarelist', softwareListRouter);
router.use('/category', categoryRouter);
router.use('/software', softwareRouter);

module.exports = router;