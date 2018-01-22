module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
              type: DataTypes.STRING,
              allowNull: false
          }
  });


  Users.associate = function(models) {
    Users.hasMany(models.Items, {
      onDelete: "cascade"
    });
  };
  Users.associate = function(models) {
    Users.hasMany(models.Lists, {
      onDelete: "cascade"
    });
  };

  return Users;
};
