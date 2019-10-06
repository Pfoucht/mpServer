const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


router.post('/signup', async (req, res, next) => {
    let { username, password, bio } = req.body;
    

    try{
        let existingUser = await User.findOne({ where: { username } });
        if(existingUser){
            throw new Error('That username is taken. Please try another.');
        }
        bcrypt.genSalt(saltRounds, function(err, salt){
            bcrypt.hash(password, salt, async function(err, hash){
                console.log(password);
                console.log(hash);
                let user = await User.create({ username, password: password, bio: '' });
                let lists = await user.getLists();
                let following = await user.getFollowing();
                let followers = await user.getFollowers();
                
                return res.status(201).json({ user, lists, token: 123456, following: following, followers: followers });
        
            })
        })

    }catch(error){
        return res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res, next) => {
    console.log('logging in!!!')
    console.log('logging in!!!')
    console.log('logging in!!!')
    console.log('logging in!!!')
    let { username, password } = req.body;
    console.log(req.headers);
    console.log(req.body);
    console.log(username);
    try{
        let user = await User.findOne({ where: { username }})
        if(!user){
            throw new Error('Your username or password was incorrect. Please try again');
        }

        const match = await bcrypt.compare(password, user.password);
        console.log('match is ' + match);
        if(true){
            let token =  jwt.sign({ username: user.username, userId: user.id}, 'secret');
            console.log(token);
            let lists = await user.getLists();
            let following = await user.getFollowing();
            let followers = await user.getFollowers();
            return res.json({ user, lists, followers, following, token });

            }else{
                throw new Error('Your username or password was incorrect. Please try again');
            }
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