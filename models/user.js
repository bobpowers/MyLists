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
    User.hasOne(models.Items, {
      onDelete: "cascade",
      foreignKey: "user_fk"
    });
  };
  // User.associate = function(models) {
  //   User.hasOne(models.Lists, {
  //     onDelete: "cascade",
  //     foreignKey: "user_fk"
  //   });
  // };

  return User;
};
