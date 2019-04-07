'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Movies", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      vote_count: Sequelize.INTEGER,
      video: Sequelize.BOOLEAN,
      vote_average: Sequelize.DECIMAL,
      title: Sequelize.STRING(250),
      popularity: Sequelize.DECIMAL,
      poster_path: Sequelize.STRING(250),
      original_language: Sequelize.CHAR,
      original_title: Sequelize.STRING(250),
      backdrop_path: Sequelize.STRING(250),
      adult: Sequelize.BOOLEAN,
      overview: Sequelize.TEXT,
      release_date: Sequelize.TEXT,
      revenue: Sequelize.INTEGER,
      runtime: Sequelize.INTEGER,
      status: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Movies");
  }
};
