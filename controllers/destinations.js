var mongoose=require("mongoose"),
	userDestination=mongoose.model("UserDestination"),
	express=require("express"),
	app=express(),
	fs=require('fs'),    
    Busboy = require('busboy'),
    cors = require('cors'),
	bodyParser=require("body-parser");

	userDestination={};


var router = express.Router();

app.use(cors());

module.exports=function(router) {

	router.post('/destination/info',userDestination.destinationData);
	router.get('/destination/number',userDestination.destinationCount);
	router.post('/destination/create',userDestination.createDestination);
	router.post('/destination/upload',userDestination.uploadImage);
	
}

userDestination.destinationData=function(req,res)
{
	var filename=req.body.filename;
	var destination = require("/home/shanky/Desktop/new_project/Destination/"+filename);
			console.log("destination",destination);
			res.json(destination);	
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

userDestination.uploadImage=function(req,res){


	  var busboy = new Busboy({ headers: req.headers });
	    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

	      var fstream = fs.createWriteStream('/home/shanky/Project/app/images/destination/' + filename); 
	        file.pipe(fstream)
	      
	      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
	      
	      file.on('data', function(data) {
	        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
	        
	      });

	      file.on('end', function() {
	        console.log('File [' + fieldname + '] Finished');
	        
	      });
	    });
	  
	    busboy.on('finish', function() {
	      console.log('Done parsing form!');
	      res.status(200).json("Image Uploaded");
	      // res.writeHead(303, { Connection: 'close' });
	      res.end();
	    });
	    req.pipe(busboy);

}
		
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
			}
			console.log(req.body.url);

			var filename=req.body.Place+".json";
			var outputFilename = '/home/shanky/Desktop/new_project/Destination/'+filename;

			fs.writeFile(outputFilename, JSON.stringify(destinationData, null, 4), function(err) {
			    if(err) {
			      console.log(err);
			    } else {
			    	res.status(200).json("Destination Created");
			      console.log("JSON saved to " + outputFilename);
			    }
			});
}

