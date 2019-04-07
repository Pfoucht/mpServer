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
            type: Sequelize.STRING(25),
            allowNull: false,
            validate: {
                len: {
                  args: [3, 25],
                  msg: "Password must be between 3 and 25 characters. Please try again."
                }
              }
        },
        bio: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    })
    
    User.associate = models => {
        User.hasMany(models.List);
    }

    return User;
}
