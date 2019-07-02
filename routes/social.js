const express = require('express');
const router = express.Router();
const { List, User, Movie, Follow } = require('../models');
const Sequelize = require('sequelize');



    router.route('/searchUsers/:query')

    // get all lists
    .get(async (req, res) => {
        try{
            let Op = Sequelize.Op;
            console.log(req.params)
            console.log('here');
            const users = await User.findAll({ where: { username: { [Op.iLike]: '%' + req.params.query + '%' } } });
            res.status(201).json({ users: users });

        }catch(error){
            console.log('failure');
            res.status(400).json({ error: error.message });
        }
    });


    router.route('/test')

    .get(async(req, res) => {
        try{
            console.log('test')
            let users = await User.findOne({where: {
                id: 14
            }});
            const jacob = await User.findOne({where: {id: 1}})
            // await users.follow(jacob);
            await users.follow(jacob)
            
            return res.json({users: users})
        }catch(error){
            console.log(error)
            return res.json({error: error})
            
        }
    })



router.route('/:username')

// get all lists
.get(async (req, res) => {
    try{
        const user = await User.findOne({where: { username: req.params.username } })
        const lists = await List.findAll({
            where: {
                UserId: user.dataValues.id,
                favorite: false
            }
        });
        console.log('here success');
        console.log(user);
        res.status(201).json({ profile: { username: user.dataValues.username, lists: lists } });

    }catch(error){
        console.log('failure');
        res.status(400).json({ error: error.message });
    }
});



router.route('/test/user')

.get(async (req, res) => {
    try{
        let user = await User.findOrCreate({
            where: {
                username: "Banana"
            }, 
            defaults: {
                password: "pw123",
                bio: "And your next line will be..."
            }
        });

        const jacob = await User.findOne({where: {id: 14}});
        console.log(user[0])

        //A USER WITH ID 15 IS FOLLOWING A USER WITH ID 13
        // await Follow.create({
        //     follower_id: 13,
        //     following_id:15,
        // });

        //TO CREATE A FOLLOWER FOR ID 13 THAT HAS A FOLLOWER WITH USERID 15
        // USERID 13 GETS NEW FOLLOWER WITH ID 15


        // await Follow.findOrCreate({where:{
        //     follower_id: 13, //THE PERSON BEING FOLLOWED
        //     following_id: 4 //THE NEW FOLLOWER
        // }});


        // 

        const cam = await User.findOne({where: {id: 15}})
        // cam.addFollower(15);
        let following1 = await cam.hasFollowing(14);
        let following2 = await cam.hasFollower(14);

        let f2 = await cam.getFollowers();
        let f1= await cam.getFollowing();

        console.log('start');
        console.log(f2)
        console.log('end');
        return res.json({cam, following: f1, followers: f2, hasFollower: following2, isFollowing: following1})
        


    }catch(error){
        console.log(error);
    }

    return res.json({user: newUser});
});



router.route('/follow/:followerId/:followingId')

// FOLLOWERID IS THE PERSON WHO IS GOING TO BE FOLLOWED
//FOLLOWINGID IS THE PERSON WHO IS FOLLOWING THE NEW USER
.get(async (req, res) => {
    try{
        const user1 = await user.findOne({where: {id: req.params.followerId}})
        const user2 = await user.findOne({where: {id: req.params.followingId}});
    
        
        let bool = user2.hasFollowing(user1.dataValues.id);
        if(bool){
            user2.removeFollowing(user1.dataValues.id);
        }else{
            user2.addFollowing(user1.dataValues.id);
        }
    
    }catch(error){
        console.log(error);
    }


})

module.exports = router;