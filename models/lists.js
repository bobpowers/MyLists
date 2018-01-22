module.exports = function(sequelize, DataTypes) {
  var Lists = sequelize.define("Lists", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    list_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  }, {
    timestamps: false
      });



  Lists.associate = function(models) {
    Lists.hasMany(models.Items, {
      onDelete: "cascade"
    });
  };

  return Lists;
};