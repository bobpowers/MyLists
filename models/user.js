module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
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
  }, {
timestamps: false
  })

  User.associate = function(models) {
    User.hasMany(models.Items, {
      onDelete: "cascade"
    });
  };
  User.associate = function(models) {
    User.hasMany(models.Lists, {
      onDelete: "cascade"
    });
  };

  return User;
};
