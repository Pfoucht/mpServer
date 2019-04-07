const express = require('express');
const router = express.Router();

router.post('/signup', async (req, res, next) => {
    console.log('SIGNUP');
    console.log(req.body);

});

router.post('/login', async (req, res, next) => {
    console.log('LOGIN');
    console.log(req.body);
});

module.exports = router;