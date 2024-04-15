'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.tweets, { foreignKey: 'user_id' });
      this.hasMany(models.comments, { foreignKey: 'user_id' });
      this.hasMany(models.follows, { foreignKey: 'follower_id', as: 'followers' });
      this.hasMany(models.follows, { foreignKey: 'following_id', as: 'followings' });
    }
  }
  accounts.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'accounts',
  });
  return accounts;
};