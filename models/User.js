const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true,
            validate: {
                len: {
                  args: [3, 20],
                  msg: "Username must be between 3 and 20 characters. Please try again."
                }
              }
        },
        password: {
            type: Sequelize.STRING(75),
            allowNull: false,
            validate: {
                len: {
                  args: [3, 75],
                  msg: "Password must be between 3 and 25 characters. Please try again."
                }
              }
        },
        bio: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        // isDiscoverable: {
        //     type: Sequelize.BOOLEAN,
        //     allowNull: false
        // }
    });
     
    User.associate = models => {
        User.hasMany(models.List);
        User.belongsToMany(models.User, {as: "Following", foreignKey: "following_id", through: 'Follow'})
        User.belongsToMany(models.User, {as: "Followers", foreignKey: "follower_id", through: 'Follow'})
    }

    return User;
}


// {
//     instanceMethods: {
//         follow: function(user){
//             return ModelSync(this.addFollowing(user))
//         },
//         unfollow: function(user){
//             return ModelSync(this.removeFollowing(user))
//         },
//         following: function(user){
//             return ModelSync(this.hasFollowing(user))
//         }
//     }
// })