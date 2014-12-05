var express = require('express');
var app = express();
var models = require("./models");
var bodyParser = require('body-parser');


app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
    res.render('index');
});

app.post('/create',function(req,res){
    var url = req.body.url;
    models.Urls.create({url:url}).done(function(err,createdUrl){

        createdUrl.generateHash();
        createdUrl.save().done(function(err,savedUrl){
            if(err) throw err;
            var locals = {url:savedUrl.url,hash:savedUrl.hash};
            res.render('create',locals);                
        })

    });
});

app.get('/:hash',function(req,res){
    // models.Urls.create({url:'http://www.google.com',hash:'abcdefg'})
    models.Urls.find({where:{hash:req.params.hash}}).done(function(err,url){
        if(err) throw err;
        if(!url){
            res.send('URL NOT FOUND!');    
        }else{
            res.redirect(url.url);
        }
    })
    
});

models.sequelize.sync().success(function () {
  var server = app.listen(3000, function() {
    console.log('Express server listening on port ' + server.address().port);
  });
});
