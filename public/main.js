$(function(){
    console.log('Welcome to the UrlShortenerThatMakesItLonger where long is the new short.');

    //always select it
    $('#urlfield').on('click',function(e){
        $(this).select().focus();
        e.preventDefault();
    }).on('mouseup',function(e){
        e.preventDefault();
    })
    .on('keydown',function(e){
        console.log(e);
        if((e.metaKey || e.ctrlKey) && (e.which == 67 || e.which == 65)){
            return true;
        }
        e.preventDefault();
    }).select().focus();
});