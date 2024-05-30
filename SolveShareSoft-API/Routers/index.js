const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.status(200).json({message : 'default route ok'});
});

module.exports = router;