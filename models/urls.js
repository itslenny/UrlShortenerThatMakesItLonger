"use strict";

module.exports = function(sequelize, DataTypes) {
  var Urls = sequelize.define("Urls", {
    url: DataTypes.STRING,
    hash: DataTypes.STRING
  }, {
    instanceMethods: {

      // used to generate a unique hash
      // a really long unique hash.........
      generateHash: function(hostlength){
        var Hashids = require('hashids');
        var hasher = new Hashids("this is my salt");
        var baseHash = hasher.encode(this.id);

        //make sure the new url is longer (within reason)
        var lenghtLimit = 1024;
        var myChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        //add random chars until the url is long enough or too long
        while(baseHash.length+hostlength <= this.url.length && baseHash.length+hostlength < 1024){
          baseHash+=myChars.charAt(Math.floor(Math.random() * myChars.length));
        }

        //set the hash
        this.hash=baseHash;
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
