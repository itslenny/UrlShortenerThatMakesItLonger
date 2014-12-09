var models = require("./models");

models.Urls.findOrCreate({where:{url:"testurl654dfgdfgh"}}).done(function(err,myUrl,created){

    console.log('--------- WAS CREATED:',created);

    //if it was created CREATE HASH
    if(created){
        myUrl.hash="testhash";
        myUrl.save().done(function(err,savedObject){
            console.log('--------- GENERATED HASH!!',savedObject.hash);
            //res.render
        });
    }else{
        //res.render
        console.log('--------- ALREADY HAS HASH!!',myUrl.hash)
    }
});