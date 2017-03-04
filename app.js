var express = require('express');
var app     = express();

app.all('*', function(req, res){
    var data = {};
    
    if(req.headers['x-forwarded-for']) {
        data.ipaddress = req.headers['x-forwarded-for'];
    }
    if(req.headers['accept-language']) {
        data.language = req.headers['accept-language'].split(',')[0];
    }
    if(req.headers['user-agent']) {
        var val = req.headers['user-agent'];
        
        // http://www-archive.mozilla.org/build/revised-user-agent-strings.html
        var match = val.match(/\([^)]+\)/);
        if(match) {
            data.software = match[0].substr(1, match[0].length-2);
        } else {
            data.software = val;
        }
    }
    res.end(JSON.stringify(data));
});
app.listen(process.env.PORT || 8080, function(){
    console.log('The server is listening on port 8080');
});