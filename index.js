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
    if(url.indexOf('://') < 3) url = 'http://'+url;
    models.Urls.findOrCreate({where:{url:url}}).done(function(err, theUrlRow, created){
        if(err) throw err;
        //generate a hash if the url is duplicate
        if(created){
            theUrlRow.generateHash(req.headers.host.length);
            theUrlRow.save().done(function(err,savedUrl){
                if(err) throw err;
                var locals = {url:savedUrl.url,hashedUrl:req.headers.host+'/'+savedUrl.hash};
                res.render('create',locals);                
            });
        }else{
            //reuse hashes for duplicate URLS
            var locals = {url:theUrlRow.url,hashedUrl:req.headers.host+'/'+theUrlRow.hash};
            res.render('create',locals);
        }

    });
});

app.get('/create',function(req,res){
    res.redirect('/');
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
  var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server listening on port ' + server.address().port);
  });
});
