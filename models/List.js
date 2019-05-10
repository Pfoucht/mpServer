module.exports = (sequelize, DataTypes) => {

    const List = sequelize.define("List", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: DataTypes.STRING(250),
        thumbnail: DataTypes.STRING(250),
        desc: DataTypes.STRING(250),
        favorite: DataTypes.BOOLEAN
    });

    List.associate = models => {
        List.belongsTo(models.User);
        List.belongsToMany(models.Movie, { through: "ListMovies" });
    }

    return List;
}
