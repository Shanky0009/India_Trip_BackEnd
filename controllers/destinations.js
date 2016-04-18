/*
Load all models here
*/
var mongoose=require("mongoose"),
	userDestination=mongoose.model("UserDestination"),
	express=require("express"),
	app=express(),
	fs=require('fs'),    
    Busboy = require('busboy'),
    cors = require('cors'),
	bodyParser=require("body-parser"),
	router = express.Router();

/*
Empty HTTP method object.
*/
var	userDestination={};

/*
Load HTTP access control(CROS)
*/
app.use(cors());

/*
Routings/controller goes here
*/
module.exports=function(router) {
	router.post('/destination/info',userDestination.destinationData);
	router.get('/destination/number',userDestination.destinationCount);
	router.post('/destination/create',userDestination.createDestination);
	router.post('/destination/upload',userDestination.uploadImage);	
}


/**************************************************************************************************************************/
/***************************************** All the HTTP methods goes here *************************************************/
/**************************************************************************************************************************/


/*************************************************
  Users can data about particular destination .
**************************************************/

userDestination.destinationData=function(req,res)
{
	var filename=req.body.filename;
	var destination = require(process.cwd()+"/Destination/"+filename);
	res.json(destination);	
}	

/******************************************************
  Users can data about particular destination ends here.
*******************************************************/



/************************************************
  HTTP method loads all destination from database.
*************************************************/
userDestination.destinationCount=function(req,res)
{
	var count=null;
	var placeData=[];
	fs.readdirSync(process.cwd()+"/Destination/").forEach(function(filename)
	{	
		if(filename.indexOf('.json')) {
		placeData.push(require(process.cwd()+"/Destination/"+filename));
		}
	});
	res.status(200).json(placeData);
}

/**********************************************************
  HTTP method loads all destination from database ends here.
***********************************************************/



/*******************************************
  Admin can add respective destination image .
********************************************/

userDestination.uploadImage=function(req,res) 
{
  	var busboy = new Busboy({ headers: req.headers });
	busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
	  var fstream = fs.createWriteStream('home/shanky/Project/app/images/destination/' + filename); 
	  file.pipe(fstream)	      	      
	  file.on('data', function(data) {   });
	  file.on('end', function() {    });
	});
	busboy.on('finish', function() {    
	  res.status(200).json("Image Uploaded");
	  res.end();
	});
	req.pipe(busboy);
}

/**********************************************************
  Admin can add respective destination image here ends here.
***********************************************************/



/*********************************
  Admin can add new destionation.
***********************************/		
userDestination.createDestination=function(req,res)
{
	var destinationData = {
		  Place:req.body.Place,
		  Description:req.body.Description,
		  Altitude:req.body.Altitude,
		  Temperature:req.body.Temperature,
		  Clothing:req.body.Clothing,
		  Season:req.body.Season,
		  Language_Spoken:req.body.Language_Spoken,
		  Tourism_Office:req.body.Tourism_Office,
		  state:req.body.state,
		  url:req.body.url
	}:
	var filename=req.body.Place+".json";
	var outputFilename = process.cwd()+'/Destination/'+filename;
	fs.writeFile(outputFilename, JSON.stringify(destinationData, null, 4), function(err) {
	    if(err) {
	      console.log(err);
	    } else {
	    	res.status(200).json("Destination Created");
	    }
	});
}

/**********************************************
  Admin can add new destionation here ends here.
***********************************************/
