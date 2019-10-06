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
            console.log(users.length);
            let arr = [];
            for(let i=0; i<users.length; i++){
                let followers = await users[i].getFollowers();
                arr.push({
                    ...users[i].dataValues,
                    followers
                });
            }
            console.log('finished');
            console.log(arr);
            res.status(201).json({ users: arr });

        }catch(error){
            console.log(error);
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



router.route('/profile/:username')

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
        const followers = await user.getFollowers()
        const following = await user.getFollowing();
        console.log(user.dataValues);
        res.status(201).json({ profile: { username: user.dataValues.username, lists: lists, userId: user.dataValues.id, followers: followers, following: following } });

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
    console.log('dodmdmdmmdmdmdmd');
    console.log(req.params.followerId);
    console.log(req.params.followingId);
    try{
        const user1 = await User.findOne({where: {id: req.params.followerId}});
        const user2 = await User.findOne({where: {id: req.params.followingId}});
        console.log(user1.dataValues.username);
        console.log(user2.dataValues.username);
    
        
        let bool = await user2.hasFollowing(user1.dataValues.id);
        console.log(bool);
        if(bool){
            await user2.removeFollowing(user1.dataValues.id);
        }else{
            console.log('hereeee');
            await user2.addFollowing(user1.dataValues.id);
        }

        // const followers = await user2.getFollowers();
        const following = await user2.getFollowing();
        const followers = await user1.getFollowers();
        console.log('---------');
        return res.json({ user: { userId: user1.dataValues.id, username: user1.dataValues.username, followers: followers} })
        
    }catch(error){
        console.log(error);
    }


});

router.route('/following/lists/username/:username')

.get(async(req, res) => {
    console.log(req.params.username);
    const user = await User.findOne({where: {username: req.params.username}});
    console.log(user);
    const following = await user.getFollowing();
    let arr = [];
    for(let i=0; i<following.length; i++){
        let followers = await following[i].getFollowers();
        arr.push({
            ...following[i].dataValues,
            followers
        })
    }
    return res.json({ following: arr }); 
});


router.route('/followers/lists/username/:username')

.get(async(req, res) => {
    console.log(req.params.username);
    const user = await User.findOne({where: {username: req.params.username}});
    const followers = await user.getFollowers();
    let arr = [];
    for(let i=0; i<followers.length; i++){
        let userFollowers = await followers[i].getFollowers();
        arr.push({
            ...followers[i].dataValues,
            followers: userFollowers
        })
    }
    return res.json({ followers: arr }); 
})


// GET FOLLOWERS & FOLLOWING

// router.route('/followers/:userId')
//     .get(async (req, res) => {
        
//     })



router.route('/following/lists/userId/:userId')
    
    .get(async (req, res) => {
        console.log(req.user);
        console.log(req.params.userId + ' lololol');
        try{
            const user = await User.findOne({where: {id: req.params.userId}});
            console.log(user);
            const following = await user.getFollowing();
            const lists = [];
            for(let i=0; i<following.length; i++){
                let userLists = await following[i].getLists();
                for(let j=0; j<userLists.length; j++){
                    lists.push(userLists[j]);
                }
            }
            return res.json({
                user,
                following,
                lists
            })
        }catch(error){
            console.log(error);
        }
    })




module.exports = router;