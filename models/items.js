module.exports = function(sequelize, DataTypes) {
    var Items = sequelize.define("Items", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
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
      task_importance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });
  
    Items.associate = function(models) {
      Items.belongsTo(models.user, {
        foreignKey: {
          allowNull: false
        }
      });
    };

    Items.associate = function(models) {
      Items.belongsTo(models.Lists, {
        foreignKey: {
          allowNull: false
        }
      });
    };

    return Items;
  };