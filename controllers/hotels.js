/*
Load all models here
*/
var mongoose=require("mongoose"),
	User=mongoose.model("User"),
	Hotel=mongoose.model("Hotel"),
	express=require("express"),
	app=express(),
	fs=require('fs'),
	Busboy = require('busboy'),
	bodyParser=require("body-parser"),
    router = express.Router();

/*
Empty HTTP method object.
*/
var hotelMethod={};

/*
Routings/controller goes here
*/
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
  	router.post("/hotels/create",hotelMethod.createHotel);	
}


/**************************************************************************************************************************/
/***************************************** All the HTTP methods goes here *************************************************/
/**************************************************************************************************************************/


/**************************************
  Users can book their favourite hotel.
***************************************/

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
    var userID;
    
    if(a=="admin")
    {
    	userID=a;
    } else {
    	var cookieData=JSON.parse(a);
    	userID=cookieData._id;
    }
	
	if(cookieData) {
		User.findOne({_id:cookieData._id}).exec(function(err,data) {
			console.log(cookieData);
			if(!data) {
				res.json("no user logged in");
			} else {
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
				})
			}
		})
	} else if(userID=="admin") {
		res.status(200).json("admin");	
	} else {
		res.status(200).json("Login First");
	}
}

/***********************************************
  Users can book their favourite hotel ends here.
************************************************/	
		

		
/***********************************
  Users can view their booked hotel.
************************************/

hotelMethod.details=function(req,res)
{	
	var id=req.body.UserID;
	Hotel.find({userID:id}).exec(function(err,data)
	{
		for(var i=0;i<data.length;i++)
		{
			if(data[i].status=="Not Active"||data[i].status=="not active"){
				Hotel.findOneAndUpdate({_id:data[i]._id},{$set:{cancelStatus:"Booking Cancelled"}}).exec(function(err,data){	})
			} else{
				Hotel.findOneAndUpdate({_id:data[i]._id},{$set:{cancelStatus:"Cancel Booking"}}).exec(function(err,data){	})
			}
		}
		res.status(200).json(data);
	})
}

/********************************************
  Users can view their booked hotel ends here.
*********************************************/




/*********************************
  Admin can view all hotel detail.
**********************************/
hotelMethod.allDetails=function(req,res)
{
	Hotel.find({}).exec(function(err,data) {
		res.status(200).json(data);
	})
}

/******************************************
  Admin can view all hotel detail ends here.
*******************************************/



/********************************
  Users can cancel their booking.
*********************************/
hotelMethod.cancel=function(req,res)
{
	Hotel.findOneAndUpdate({_id:req.body.id},{$set:{status:"Not Active"}}).exec(function(err,data) {	
		if(!data) {
			res.status(200).json("hotel doesnot exists");
		} else {
			res.status(200).json(data);
		}
	})
}

/*****************************************
  Users can cancel their booking ends here.
******************************************/




/*************************************
  Admin can delete users hotel booking.
**************************************/

hotelMethod.delete=function(req,res)
{
	Hotel.findOne({_id:req.body.id}).exec(function(err,data) {	
		if(!data) {
			res.status(200).json("hotel doesnot exists");
		} else {
			Hotel.remove({_id:data._id}).exec(function(err,data) {
				if(err) throw err;
				else {
					res.status(200).json("hotel booking removed");
				}
			})
		}
	})
}

/***********************************************
  Admin can delete users hotel booking ends here.
************************************************/




/***************************************
  Users can view searched hotel details.
****************************************/
hotelMethod.info=function(req,res)
{
	var count=null;
	var hotelData=[];
		fs.readdirSync(process.cwd()+"/Hotel/").forEach(function(filename)
		{	
			if(filename.indexOf('.json'))
			{
			hotelData.push(require(process.cwd()+"/Hotel/"+filename));
			}
		});
		res.status(200).json(hotelData);
}

/************************************************
  Users can view searched hotel details ends here.
*************************************************/


/***********************************************************
  Users can view details of a particular hotel while booking.
************************************************************/

hotelMethod.hotelData=function(req,res)
{
	var filename=req.body.filename;
	var hotel = require(process.cwd()+"/Hotel/"+filename);
	res.status(200).json(hotel);
}	

/*********************************************************************
  Users can view details of a particular hotel while booking ends here.
**********************************************************************/



/*****************************
  Users can search for hotels.
******************************/

hotelMethod.search=function(req,res)
{	
	var hotelData=[];
	var fileData;
	var place=req.body.place

		fs.readdirSync(process.cwd()+"/Hotel/").forEach(function(filename)
		{	
			if(filename.indexOf('.json')) {
				var hotel = require(process.cwd()+"/Hotel/"+filename);
				if(hotel.place==place){
					hotelData.push(require(process.cwd()+"/Hotel/"+filename));					
				}
				else if(hotel.State==place){
					hotelData.push(require(process.cwd()+"/Hotel/"+filename));
				}
				else{
				}
			}
		});	
		res.status(200).json(hotelData);
}
/**************************************
  Users can search for hotels ends here.
***************************************/



/********************************
  Admin can add new hotel images.
*********************************/

hotelMethod.uploadImage=function(req,res){
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) { 
      var fstream = fs.createWriteStream('/home/shanky/Project/app/images/hotel/' + filename); 
      file.pipe(fstream)	      
      file.on('data', function(data) {   });
      file.on('end', function() {   });
    });
  
    busboy.on('finish', function() {   
    });
    req.pipe(busboy);
    res.status(200).json("Image Uploaded");
    res.end();
}

/*****************************************
  Admin can add new hotel images ends here.
******************************************/


/**************************************
  Admin can add new hotel to database.
***************************************/

hotelMethod.createHotel=function(req,res)
{
	var hotelData = {
		  place:req.body.place,
		  Hotel_name:req.body.Hotel_name,
		  Address:req.body.Address,
		  Type_of_hotel:req.body.Type_of_hotel,
		  Room_price:req.body.Room_price,
		  priceDeluxe:req.body.priceDeluxe,
		  priceStandard:req.body.priceStandard,
		  Email_ID:req.body.Email_ID,
		  Phone_no:req.body.Phone_no,
		  Website:req.body.Website,
		  State:req.body.State,
		  url:req.body.url,
		  url1:req.body.url1,
		  url2:req.body.url2,
		  url3:req.body.url3,
		  url4:req.body.url4
		}

	var filename=req.body.place+".json";
	var outputFilename = process.cwd()+'/Hotel/'+filename;

	fs.writeFile(outputFilename, JSON.stringify(hotelData, null, 4), function(err) {
	    if(err) {
	      console.log(err);
	    } else {
	    	res.status(200).json("Hotel Created");
	    }
	});
}

/**********************************************
  Admin can add new hotel to database ends here.
***********************************************/