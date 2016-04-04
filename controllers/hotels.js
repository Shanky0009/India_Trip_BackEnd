var mongoose=require("mongoose"),
	User=mongoose.model("User"),
	Hotel=mongoose.model("Hotel"),
	// UserPost=mongoose.model("UserPost"),
	// CommentPost=mongoose.model("CommentPost"),
	express=require("express"),
	app=express(),
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
  	// router.post("/users/delete",hotelMethod.deleteUser);
  	// router.get("/logout",hotelMethod.logout);
  	
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
    var userID=req.session.data._id;
    var typeOfRoom=req.body.typeOfRoom;
    var noOfRoom=req.body.noOfRoom;
    var offer=req.body.offer;
    var status=req.body.status;
    var payment=req.body.payment;
    var cookieData=req.body.cookieData;
	

	if(req.session.data)
	{
		User.findOne({_id:req.session.data._id}).exec(function(err,data)
		{
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
						console.log("data");
						console.log(data)
						
					})
				 
			}
		})
	}
	else
	{
		console.log(cookieData);
		res.json("Login First");
	}
}	
		
hotelMethod.details=function(req,res)
{
	Hotel.findOne({_id:req.body.id}).exec(function(err,data)
	{
		console.log(data);
		res.json("data",data);
	})
}

hotelMethod.allDetails=function(req,res)
{
	Hotel.find({}).exec(function(err,data)
	{
		console.log(data);
		res.json("data",data);
	})
}


hotelMethod.cancel=function(req,res)
{

	Hotel.findOneAndUpdate({_id:req.body.id},{$set:{status:"Cancelled"}}).exec(function(err,data)
	{	
		if(!data)
		{
			res.json("hotel doesnot exists");
		}
		else
		{
			res.json("hotel booking cancelled");
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
			res.json("hotel doesnot exists");
		}
		else
		{
			Hotel.remove({_id:data._id}).exec(function(err,data)
			{
				if(err) throw err;
				else 
				{
					res.json("hotel booking removed");
					console.log("hotel booking removed");
				}
			})
		
		}

	})
}