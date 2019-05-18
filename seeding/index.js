const express = require('express');
const router = express.Router();
const { List, User } = require('../models');

// Creates a user, favorites list, and normal lists

module.exports = async () => {
    try{
        let user = await User.findOrCreate({
            where: {
                username: "Jojo"
            }, 
            defaults: {
                password: "pw123",
                bio: "And your next line will be..."
            }
        });

        let id = user[0].dataValues.id;
        
        List.findOrCreate({
            where: {
                title: "Late night comedies",  
            },
            defaults: {
                UserId: 1,
                favorite: false,
                desc: "My favorite comedies to binge over late nights"
            }
        })

        List.findOrCreate({
            where: {
                title: "Underrated sports movies",  
            },
            defaults: {
                UserId: 1,
                favorite: false,
                desc: "Remember the Kyojins"
            }
        })

            
        List.findOrCreate({
            where: {
                title: "Best dark animes",  
            },
            defaults: {
                UserId: 1,
                favorite: false,
                desc: "Dark animes that will depress you"
            }
        })

        // Favorite list
        List.findOrCreate({
            where: {
                title: "Favorites",
                favorite: true  
            },
            defaults: {
                UserId: 1,
            }
        })
    }catch(error){
        console.log('in seeding error');
    }
}