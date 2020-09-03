var express  =require('express');
var cookieParser =require('cookie-parser');
const { response } = require('express');

var app = express()
app.use(cookieParser())

app.get('/', function(req,res){
    console.log('Cookies:', req.cookies);
})

app.listen(8080);

