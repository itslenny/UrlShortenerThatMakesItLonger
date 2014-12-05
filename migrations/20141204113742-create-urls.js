"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Urls", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      url: {
        type: DataTypes.STRING
      },
      hash: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Urls").done(done);
  }
};