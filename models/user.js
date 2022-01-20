'use strict';

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    credits: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    username: { type: DataTypes.STRING(16), allowNull: false },
    tag: { type: DataTypes.STRING(4), allowNull: false },
    avatar: DataTypes.STRING(300),
    email: { type: DataTypes.STRING(36), allowNull: false },
    resetToken: DataTypes.STRING,
    resetExpiry: DataTypes.BIGINT,
    firstName: DataTypes.STRING(36),
    lastName: DataTypes.STRING(36),
    bio: DataTypes.STRING(500),
    password: { type: DataTypes.STRING(128), allowNull: false },
    roleId: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    locale: { type: DataTypes.STRING(36), allowNull: false, defaultValue: 'en' },
    secret: DataTypes.STRING,
    socket: DataTypes.STRING
  }, {
    updatedAt: false
  });

  User.associate = function(models) {

    User.hasMany(models.Post, {
      onDelete: 'cascade',
      foreignKey: 'userId',
      as: 'posts'
    });

    User.hasMany(models.Vote, {
      foreignKey: 'userId',
      as: 'votes'
    });
  };

  return User;
};