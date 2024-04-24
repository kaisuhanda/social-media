'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class accounts extends Model {
    static associate(models) {
      // A user has many tweets (as per your existing code)
      this.hasMany(models.tweets, { foreignKey: 'user_id' });

      // A user has many comments
      this.hasMany(models.comments, { foreignKey: 'user_id' });

      // A user can follow many others (account follows other accounts)
      this.hasMany(models.follows, { 
        foreignKey: 'follower_id', 
        as: 'followings' // Represents whom this user follows
      });

      // A user is followed by many others (account is followed by other accounts)
      this.hasMany(models.follows, { 
        foreignKey: 'following_id', 
        as: 'followers' // Represents who follows this user
      });
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
