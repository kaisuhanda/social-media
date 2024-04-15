'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class follows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.accounts, { foreignKey: 'follower_id', as: 'follower' });
      this.belongsTo(models.accounts, { foreignKey: 'following_id', as: 'following' });
    }
  }
  follows.init({
    follower_id: DataTypes.INTEGER,
    following_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'follows',
  });
  return follows;
};