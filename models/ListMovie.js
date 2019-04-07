module.exports = (sequelize, DataTypes) => {

    const ListMovie = sequelize.define("ListMovies", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
    })

    return ListMovie;
}
