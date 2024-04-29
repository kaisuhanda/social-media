'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.accounts, { foreignKey: 'user_id', as: 'commenter' });
      this.belongsTo(models.tweets, { foreignKey: 'tweet_id' });
    }
  }
  comments.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'accounts',
        key: 'id'
      }
    },
    tweet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tweets',
        key: 'id'
      }
    },
    comment: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};