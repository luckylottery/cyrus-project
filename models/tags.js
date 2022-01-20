'use strict';

module.exports = async (sequelize, DataTypes) => {

  const Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: { type: DataTypes.STRING(196), allowNull: false },
    slug: { type: DataTypes.STRING(255), allowNull: false },
  });

  Tag.associate = function (models) {

    Tag.belongsToMany(models.Post, {
      through: 'PostTag',
    });
  };
  
  Tag.isHierarchy({through: 'TagAncestors', throughTable: 'TagAncestors'});
  //await sequelize.models.TagAncestors.sync();

  return Tag;
};