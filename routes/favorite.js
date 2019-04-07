const express = require('express');
const router = express.Router();
const { List, User, Movie } = require('../models');


router.route('/list')
    
    // Get all favorited movies
    .get(async (req, res) => {
        const favoriteList = await List.findOne({ 
            where: {
                UserId: 1,
                favorite: true
            }
        })

        const movies = await favoriteList.getMovies();

        res.send(movies);
    })


router.route('/movie/:id')

    // Favorite a movie
    .post(async (req, res) => {
        const { id } = req.body;
        const defaults = req.body;

        const favoriteList = await List.findOne({ 
            where: {
                UserId: 1,
                favorite: true
            }
        })

        const movie = await Movie.findOrCreate({ where: { id }, defaults });
        const fave = await favoriteList.addMovie(movie[0]);

        res.send(movie);

    })

module.exports = router;