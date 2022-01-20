'use strict';

module.exports = (sequelize, DataTypes) => {

  const Vote = sequelize.define('Vote', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    type: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    postId: { type: DataTypes.INTEGER, allowNull: false }
  },
  { timestamps: false }
  );
  
  Vote.associate = function(models) {

    Vote.belongsTo(models.User, {
        target: 'id',
        as: 'user',
        foreignKey: 'userId'
    });
    Vote.belongsTo(models.Post, {
        target: 'id',
        as: 'post',
        foreignKey: 'postId'
    });
  };

  return Vote;
};