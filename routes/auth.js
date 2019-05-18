const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post('/signup', async (req, res, next) => {
    let { username, password, bio } = req.body;

    try{
        let existingUser = await User.findOne({ where: { username } });
        if(existingUser){
            throw new Error('That username is taken. Please try another.');
        }
        let user = await User.create({ username, password, bio: '' });
        let lists = await user.getLists();
        
        return res.status(201).json({ user, lists, token: 123456 });

    }catch(error){
        return res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res, next) => {

    console.log('login');
    let { username, password } = req.body;

    try{
        let user = await User.findOne({ where: { username }})
        if(!user || user.password !== password){
            throw new Error('Your username or password was incorrect. Please try again');
        }
        let lists = await user.getLists();

        return res.json({ user, lists });

    }catch(error){
        console.log(error);
        return res.status(400).json({ error: error.message });
    }
});

router.post('/bio', async (req, res) => {
    let { bio, userId } = req.body;
    
    try{
        let user = await User.findByPk(userId);
        await user.update({ bio });

        return res.status(201).json({ user });

    }catch(error){
        return res.status(401).json({ error: error.message });
    }

})

module.exports = router;