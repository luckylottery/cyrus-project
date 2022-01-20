'use strict';

module.exports = (sequelize, DataTypes) => {

  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    bounty: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    replyCount: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING(196), unique: true },
    content: { type: DataTypes.STRING(2048), allowNull: false },
    slug: { type: DataTypes.STRING(255), allowNull: false },
    upvotes: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    downvotes: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    score: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    visibility: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1},
    edits: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}
  });
  
  Post.associate = function(models) {

    Post.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId'
    });
    Post.hasMany(models.Vote, {
      foreignKey: 'postId',
      as: 'votes'
    });
  };

  // sequelize-hierarchy flag
  Post.isHierarchy({through: 'PostAncestors', throughTable: 'PostAncestors'});

  return Post;
};