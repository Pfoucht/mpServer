const express = require('express');
const router = express.Router();
const { List, User } = require('../models');

// Lists terminology is temporary
// Lists? Groups? Playlists? Watchlists? Will alter naming once we decide on a better name

router.route('/')

    // get all lists
    .get(async (req, res) => {
        let { id } = await User.findByPk(1)

        let lists = await List.findAll({
            where: {
                UserId: id,
                favorite: false
            }
        })

        console.log(lists);

        res.send(lists);
    })

    // create a list 
    .post(async (req, res) => {
        let { title, desc } = req.body;

        let { id: UserId } = await User.findByPk(1)

        const list = await List.create({
            UserId,
            title,
            desc,
            favorite: false
        });

        res.send(list);
    })

router.route('/:id')

    // get list by id
    .get(async (req, res) => {
        const id = req.params.id;

        const list = await List.findByPk(id);

        res.send(list);

    })

    // update list by id
    .put(async (req, res) => {
        let id = req.params.id;

        const list = await List.update(req.body, {
            where: {
                id
            }
        })
        
        res.send(list);

    })

    // delete list by id
    .delete(async (req, res) => {
        const id = req.params.id;

        try {
            const list = await List.destroy({ where: { id }});
            res.sendStatus(200);
        } catch(err) {
            res.send(err)
        }
    });

module.exports = router;