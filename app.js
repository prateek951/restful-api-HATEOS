var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db;
if(process.env.ENV == 'Test'){
	db = mongoose.connect('mongodb://localhost/bookAPI_test');
}else{
	db = mongoose.connect('mongodb://localhost/bookAPI');
}

var Book = require('./models/bookModel');
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.join());

bookRouter = require('./routes/bookRoutes')(Book);
app.use('/api/books',bookRouter);

app.get('/',(req,res)=>{
	res.send('Welcome to my REST API!!');
});

app.listen(port,()=>{
	console.log('Gulp is running my app on PORT : ' + port);
});

module.exports = app;
