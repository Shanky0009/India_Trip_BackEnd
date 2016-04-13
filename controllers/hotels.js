var mongoose=require("mongoose"),
	User=mongoose.model("User"),
	Hotel=mongoose.model("Hotel"),
	// UserPost=mongoose.model("UserPost"),
	// CommentPost=mongoose.model("CommentPost"),
	express=require("express"),
	app=express(),
	fs=require('fs'),
	Busboy = require('busboy'),
	bodyParser=require("body-parser"),
    router = express.Router();

var hotelMethod={};

module.exports=function(router)
{
	router.post('/hotels/book',hotelMethod.book)
	router.post("/hotels/details",hotelMethod.details);
  	router.post("/hotels/CancelBooking",hotelMethod.cancel);
  	router.get("/hotels/allDetails",hotelMethod.allDetails);
  	router.post("/hotels/delete",hotelMethod.delete);
  	router.get("/hotels/info",hotelMethod.info);
  	router.post("/hotels/data",hotelMethod.hotelData);
  	router.post("/hotels/search",hotelMethod.search); 
  	router.post("/hotels/upload",hotelMethod.uploadImage);	
}

hotelMethod.book=function(req,res)
{
	var hotelName=req.body.hotelName;
	var hotelemail=req.body.hotelemail;
	var hotelPhone=req.body.hotelPhone;
    var hotelPrice=req.body.hotelPrice;
    var hotelType=req.body.hotelType;
    var startDate=req.body.startDate;
    var endDate=req.body.endDate;
    var typeOfRoom=req.body.typeOfRoom;
    var noOfRoom=req.body.noOfRoom;
    var offer=req.body.offer;
    var status=req.body.status;
    var payment=req.body.payment;
    var a=req.body.cookieData;
    var cookieData=JSON.parse(a);
    var userID=cookieData._id;
	

	if(cookieData)
	{
		User.findOne({_id:cookieData._id}).exec(function(err,data)
		{
			console.log(cookieData);
			if(!data)
			{
				res.json("no user logged in");
			}
			else
			{
				var newHotel=new Hotel
				  ({
						hotelName:hotelName,
						hotelemail:hotelemail,
						hotelPhone:hotelPhone,
						hotelPrice:hotelPrice,
						hotelType:hotelType,
						startDate:startDate,
						endDate:endDate,
						userID:userID,
						typeOfRoom:typeOfRoom,
						noOfRoom:noOfRoom,
						offer:offer,
						payment:payment,
						status:status
			
					});
				  newHotel.save(function(err,data)
					{
						res.json("new hotel booked");
						console.log("error",err);
						console.log("data",data);
						
						
					})
				 
			}
		})
	}
	else
	{
		console.log(cookieData);
		res.status(200).json("Login First");
	}
}	
		

		
hotelMethod.details=function(req,res)
{	
	var id=req.body.UserID;

	Hotel.find({userID:id}).exec(function(err,data)
	{
		for(var i=0;i<data.length;i++)
		{
			if(data[i].status=="Not Active"||data[i].status=="not active"){
				Hotel.findOneAndUpdate({_id:data[i]._id},{$set:{cancelStatus:"Booking Cancelled"}}).exec(function(err,data)
				{
					console.log("cancelStatus",data.cancelStatus)
					console.log("cancelled")
				})
			}
			else{
				Hotel.findOneAndUpdate({_id:data[i]._id},{$set:{cancelStatus:"Cancel Booking"}}).exec(function(err,data)
				{
					console.log("active")
				})

			}
		}
		res.status(200).json("data",data);
	})
}



hotelMethod.allDetails=function(req,res)
{
	Hotel.find({}).exec(function(err,data)
	{
		console.log(data);
		res.status(200).json("data",data);
	})
}




hotelMethod.cancel=function(req,res)
{

	Hotel.findOneAndUpdate({_id:req.body.id},{$set:{status:"Not Active"}}).exec(function(err,data)
	{	
		if(!data)
		{
			res.status(200).json("hotel doesnot exists");
			console.log("hotel doesnot exists");
		}
		else
		{
			res.status(200).json(data);
			console.log("data",data.status);
		}

	})
}

hotelMethod.delete=function(req,res)
{

	Hotel.findOne({_id:req.body.id}).exec(function(err,data)
	{	
		if(!data)
		{
			res.status(200).json("hotel doesnot exists");
		}
		else
		{
			Hotel.remove({_id:data._id}).exec(function(err,data)
			{
				if(err) throw err;
				else 
				{
					res.status(200).json("hotel booking removed");
					console.log("hotel booking removed");
				}
			})
		
		}

	})
}

hotelMethod.info=function(req,res)
{
	var count=null;
	var hotelData=[];
		fs.readdirSync("/home/shanky/Desktop/new_project/Hotel/").forEach(function(filename)
		{
			
			
			if(filename.indexOf('.json'))
			{
			count++;
			hotelData.push(require("/home/shanky/Desktop/new_project/Hotel/"+filename));
			}
		});
		console.log(count);
		res.status(200).json(hotelData);
}

hotelMethod.hotelData=function(req,res)
{
	var filename=req.body.filename;
	var hotel = require("/home/shanky/Desktop/new_project/Hotel/"+filename);
			console.log("hotel",hotel);
			res.status(200).json(hotel);
}	


hotelMethod.search=function(req,res)
{
	
	var hotelData=[];
	var fileData;
	var place=req.body.place
	console.log(place)

		fs.readdirSync("/home/shanky/Desktop/new_project/Hotel/").forEach(function(filename)
		{	
			if(filename.indexOf('.json'))
			{
				var hotel = require("/home/shanky/Desktop/new_project/Hotel/"+filename);
				console.log(hotel.place);
				if(hotel.place==place){
					hotelData.push(require("/home/shanky/Desktop/new_project/Hotel/"+filename));					
				}
				else if(hotel.State==place){
					hotelData.push(require("/home/shanky/Desktop/new_project/Hotel/"+filename));
				}
				else{
					console.log(hotel.place+" Not Found")
				}

			}
			
		});
	
		res.status(200).json(hotelData);
}

hotelMethod.uploadImage=function(req,res){


	  var busboy = new Busboy({ headers: req.headers });
	  for(var i=0;i<4;i++){
	  	    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
	  
	  	      var fstream = fs.createWriteStream('/home/shanky/Project/app/images/' + filename); 
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
	  	      
	  	    });
	  	    req.pipe(busboy);
	  	  }
	    res.status(200).json("Image Uploaded");
	     res.end();

}