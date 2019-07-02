'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      referenceces: {
        model: 'User',
        key: 'userId'
      }
    },
    following_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      referenceces: {
        model: 'User',
        key: 'userId'
      }
    }
  }, {});
  Follow.associate = function(models) {
    // associations can be defined here
  };
  return Follow;
};

// module.exports = function(sequelize, DataTypes) {
//     var Follow = sequelize.define('follow', {
//       follower_id: {
        // type: DataTypes.INTEGER,
        // allowNull: true,
        // referenceces: {
        //   model: 'User',
        //   key: 'userId'
        // }
//       },
//       following_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         referenceces: {
//           model: 'User',
//           key: 'userId'
//         }
//       }
//     }, {
//       classMethods: {
//         // associate: function(models) {
//         //   followers.belongsTo(models.user, {
//         //     onDelete: "CASCADE",
//         //     foreignKey: {
//         //       allowNull: false
//         //     }
//         //   });
//         // },
//       },
//       freezeTableName: true // Model tableName will be the same as the model name
//     });
  
//     return Follow;
//   }