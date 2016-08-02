/*
Load all models here
*/
var express=require('express'),
	mongoose=require('mongoose'),
	bodyParser=require('body-parser'),
	fs=require('fs'),
	morgan = require('morgan'),
	cookieParser=require('cookie-parser'),
	expressValidator = require('express-validator'),
	cors = require('cors'),
	app=express(),
	router = express.Router();

/*
connects to local database
*/
var mongoURI = "mongodb://localhost:27017/test10000";
var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});


//Load cookie parser
app.use(cookieParser());

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//parse application/json
app.use(bodyParser.json())

//Load express validatore
app.use(expressValidator());

//Load HTTP access control(CROS)
app.use(cors());



app.get('/index.html',function(req,res)
{
	res.sendFile(__dirname+('/views/index.html'));
});

// fs.readdirSync(__dirname+"/views/lib").forEach(function(filename)
// {
// 	if(filename.indexOf('.js')) {
// 	require(__dirname+"/views/lib/"+filename);
// 	}
// });

// fs.readdirSync(__dirname+"/views/js").forEach(function(filename)
// {
// 	if(filename.indexOf('.js')) {
// 	require(__dirname+"/views/js/"+filename);
// 	}
// });

// fs.readdirSync(__dirname+"/views/js/controllers").forEach(function(filename)
// {
// 	if(filename.indexOf('.js')) {
// 	require(__dirname+"/views/js/controllers/"+filename);
// 	}
// });




/*************************************************
Reads models directory and requires all files
**************************************************/
fs.readdirSync(__dirname+"/models").forEach(function(filename)
{
	if(filename.indexOf('.js')) {
	require(__dirname+"/models/"+filename);
	}
});
/******************************************************
Reads models directory and requires all files ends here
*******************************************************/


/*************************************************
Reads controller directory and requires all files
**************************************************/
fs.readdirSync(__dirname+"/controllers").forEach(function(filename)
{
	if(filename.indexOf('.js')) {
		require("./controllers/"+filename)(router);	
	}
});
/**********************************************************
Reads controller directory and requires all files ends here
***********************************************************/


/**************************************************
Reads Destination directory and requires all files
**************************************************/
fs.readdirSync(__dirname+"/Destination").forEach(function(filename){ });
/**********************************************************
Reads Destination directory and requires all filesends here
**********************************************************/


/**************************************************
Reads Hotels directory and requires all files
*************************************************/
fs.readdirSync(__dirname+"/Hotel").forEach(function(filename){ });
/*****************************************************
Reads Hotels directory and requires all files ends here
*******************************************************/


//uses router module
app.use("/api",router);


//server connects to localhost at port 3000
var server=app.listen(3000,function () {
  console.log("Server connect at port:3000")
});