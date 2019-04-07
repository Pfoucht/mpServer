module.exports = (sequelize, DataTypes) => {

    const Movie = sequelize.define("Movie", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        vote_count: DataTypes.INTEGER,
        video: DataTypes.BOOLEAN,
        vote_average: DataTypes.DECIMAL,
        title: DataTypes.STRING(250),
        popularity: DataTypes.DECIMAL,
        poster_path: DataTypes.STRING(250),
        original_language: DataTypes.CHAR,
        original_title: DataTypes.STRING(250),
        backdrop_path: DataTypes.STRING(250),
        adult: DataTypes.BOOLEAN,
        overview: DataTypes.TEXT,
        release_date: DataTypes.TEXT,
        revenue: DataTypes.INTEGER,
        runtime: DataTypes.INTEGER,
        status: DataTypes.STRING
    })

    Movie.associate = models => {
        Movie.belongsToMany(models.List, { through: "ListMovies" });
    }

    return Movie;
}
