const express = require('express');
const router = express.Router();
const { List, User, Movie } = require('../models');


router.route('/:userId')
    
    // Get all favorited movies
    .get(async (req, res) => {
        try{
            const favoriteList = await List.findOne({ 
                where: {
                    UserId: req.params.userId || 1,
                    favorite: true
                }
            })
    
            const movies = await favoriteList.getMovies();

            res.send(movies);
    
        }catch(error){
            res.status(400).json({ error: error.message });
        }
    })


router.route('/movie')

    // Favorite a movie
    .post(async (req, res) => {
        const { id, userId } = req.body;
        const defaults = req.body;

        try{
            const favoriteList = await List.findOne({ 
                where: {
                    UserId: userId || 1,
                    favorite: true
                }
            });
            const movie = await Movie.findOrCreate({ where: { id }, defaults });
            const fave = await favoriteList.addMovie(movie[0]);
            
            res.send(movie);    

        }catch(error){
            res.status(400).json({ error: error.message });
        }

    })

module.exports = router;