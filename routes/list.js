const express = require('express');
const router = express.Router();
const { List, User, Movie } = require('../models');


// Get all lists by userId instead of using default public key of 1
router.route('/user/:userId')

    // get all lists
    .get(async (req, res) => {
        try{
            const { id } = await User.findByPk(req.params.userId || 1)
            const lists = await List.findAll({
                where: {
                    UserId: id,
                    favorite: false
                }
            });

            res.status(201).json({ lists });

        }catch(error){
            res.status(400).json({ error: error.message });
        }
    })

    // create a list 
    .post(async (req, res) => {
        let { title, desc, privacy } = req.body;
        try{
            const user = await User.findByPk(req.params.userId || 1)
            const list = await List.create({
                UserId: user.dataValues.id, 
                title,
                desc,
                privacy,
                favorite: false
            });

            res.status(201).json({ list });

        }catch(error){
            // console.log(error);
            res.status(400).json({ error: error.message });
        }
    });

router.route('/:id')

    // get list by id
    .get(async (req, res) => {
        const id = req.params.id;

        try{
            const list = await List.findByPk(id);
            const movies = await list.getMovies();

            res.status(201).json({ list: list, results: movies });

        }catch(error){
            res.status(400).json({ error })
        }
    })

    // update list by id
    .put(async (req, res) => {
        const id = req.params.id;
        const { title, desc } = req.body;
        
        try{
            let list = await List.findByPk(id);
            await list.update({ title, desc });

            return res.status(201).json({ list });

        }catch(error){
            return res.status(401).json({ error: error });
        }
    })


    // delete list by id
    .delete(async (req, res) => {
        const id = req.params.id;

        try {
            const list = await List.destroy({ where: { id } });

            res.sendStatus(200).json({ list });

        } catch(err) {
            res.send(err)
        }
    });


    router.route('/user/:userId/list/:listId')

        // Add movie to list | input: listId, { movie } | output:  movie: { id, listId } 
        .post(async (req, res) => {
            const id = req.params.listId;
            const reqMovie = req.body.movie;

            try{
                const movie = await Movie.findOrCreate({where: { id: reqMovie.id }, defaults: { ...reqMovie }});
                const list = await List.findByPk(id);
                if(!list.dataValues.thumbnail){
                    await list.update({ thumbnail: reqMovie.backdrop_path || reqMovie.poster_path })
                }
                await list.addMovie(movie[0].dataValues.id);

                return res.status(201).json({ movie: movie, success: true})

            }catch(error){
                console.log(error.message);
                return res.json({error: error})
            }
        })

        // Delete movie from list | input: listId, movieId | output: { rowsDeleted: 1 }
        .delete(async (req, res) => {
            try{
                const list = await List.findByPk(req.params.listId);
                const rowsDeleted = await list.removeMovie(req.params.movieId); 
            
                return res.status(201).json({ rowsDeleted });

            }catch(error){
                return res.status(400).json({ error });
            }
        });


module.exports = router;