"use strict";

module.exports = function(sequelize, DataTypes) {
  var Urls = sequelize.define("Urls", {
    url: DataTypes.STRING,
    hash: DataTypes.STRING
  }, {
    instanceMethods: {
      generateHash: function(){
        var Hashids = require('hashids');
        var hasher = new Hashids("this is my salt");
        this.hash=hasher.encode(this.id);
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Urls;
};
