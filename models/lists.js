module.exports = function(sequelize, DataTypes) {
  var Lists = sequelize.define("Lists", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    users_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    list_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    listed_item: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    task_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at:  DataTypes.DATE,
    deleted_at: DataTypes.DATE
  });

  Lists.associate = function(models) {
    Lists.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Lists;
};