const router = require('express').Router();

router.get('/basic', (req, res) => {
    res.json({status: 'running'});
});

module.exports = router;