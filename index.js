var express = require('express');
var app = express();
var models = require("./models");
var bodyParser = require('body-parser');

// THIS IS A NEW COMMENT

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));

//home page (with create box)
app.get('/',function(req,res){
    res.render('index',{err:req.query.err||false});
});

//create post route
app.post('/create',function(req,res){
    var url = req.body.url;

    //cheap attempt at normalizing
    if(url.indexOf('www.')===0) url.substr(4);

    //cheap attemt at validating the url
    if(url.indexOf('.') < 0 || url.length < 4) {
        res.redirect('/?err=bad_url')
        return;
    }

    //cheap attempt at normalizing - part 2
    if(url.indexOf('://') < 3) url = 'http://'+url;

    models.Urls.findOrCreate({where:{url:url}}).done(function(err, theUrlRow, created){
        if(err) throw err;
        //generate a hash if the url is duplicate
        if(created){
            //model method to produce hash
            //...see models/urls.js
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

//create get route (just a placeholder. redirects home)
app.get('/create',function(req,res){
    res.redirect('/');
});

//redirect route (used to redirect to urls)
app.get('/:hash',function(req,res){
    models.Urls.find({where:{hash:req.params.hash}}).done(function(err,url){
        if(err) throw err;

        if(!url){
            // load error page if we can't find the url
            res.render('error_notfound');
        }else{
            // redirect them to the URL if we found it
            res.redirect(url.url);
        }
    })
});


var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server listening on port ' + server.address().port);
});
