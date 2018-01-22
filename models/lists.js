module.exports = function(sequelize, DataTypes) {
  var Lists = sequelize.define("Lists", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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