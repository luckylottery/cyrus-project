'use strict';

module.exports = (sequelize, DataTypes) => {

  const Saves = sequelize.define('Saves', {
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING(196), allowNull: false },
    question: { type: DataTypes.STRING(2048), allowNull: false },
    slug: { type: DataTypes.STRING(255), allowNull: false },
    upvotes: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    downvotes: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    score: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    visibility: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1},
    edits: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}
  });
  
  Saves.associate = function(models) {
  };

  return Saves;
};