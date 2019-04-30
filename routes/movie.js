const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get('/test', (req, res, next) => {
    // JUST TESTING REDUX WITH EXPRESS SERVER
    console.log('testing');
    return res.json({
        movie: {
            title: 'batman',
            description: 'description',
            id: 1,
        }
    })
})

router.post('/favorite/:id', (req, res, next) => {
    console.log('running favorite movie ' + req.params.id);
});

router.post('/seen/:id', (req, res, next) => {
    console.log('running seen movie ' + req.params.id);
});




module.exports = router;