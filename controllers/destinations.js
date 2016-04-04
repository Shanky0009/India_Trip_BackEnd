var mongoose=require("mongoose"),
	userDestination=mongoose.model("UserDestination"),
	express=require("express"),
	app=express(),
	fs=require('fs'),
	bodyParser=require("body-parser");

	userDestination={};

var router = express.Router();

module.exports=function(router) {

	router.post('/destination/info',userDestination.destinationData);
	router.get('/destination/number',userDestination.destinationCount);
	
}

userDestination.destinationData=function(req,res)
{
	var filename=req.body.filename;
	var destination = require("/home/shanky/Desktop/new_project/Destination/"+filename);
		// {
			console.log("destination",destination);
			res.json(destination);
		// });
}	

userDestination.destinationCount=function(req,res)
{
	var count=null;
	var placeData=[];
		fs.readdirSync("/home/shanky/Desktop/new_project/Destination/").forEach(function(filename)
		{
			
			
			if(filename.indexOf('.json'))
			{
			count++;
			placeData.push(require("/home/shanky/Desktop/new_project/Destination/"+filename));
			}
		});
		console.log(count);
		res.status(200).json(placeData);
}

