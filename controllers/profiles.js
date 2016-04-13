//modules required
var mongoose=require("mongoose"),
	Profile=mongoose.model("Profile"),
	User=mongoose.model("User"),
	express=require("express"),
	app=express(),

	bodyParser=require("body-parser");

var router = express.Router();

var userProfile={};



module.exports=function(router){

	router.post('/profile',userProfile.updateUser);
	router.get('/showprofile',userProfile.show);
	router.post('/userprofile',userProfile.showOne);
}


//update profile
userProfile.updateUser=function(req,res)
{

	var first_name=req.body.first_name;
	var last_name=req.body.last_name;
	var address=req.body.address;
	var city=req.body.city;
	var state=req.body.state;
	var DOB=req.body.DOB;
	var gender=req.body.gender;
	var pinCode=req.body.pinCode;
	var phoneNo=req.body.phoneNo;
	var country=req.body.country;
	var id=req.body.UserID;
	

	console.log("F",first_name)
	console.log("L",last_name)
	console.log("A",address)
	console.log("C",city)
	console.log("S",state)
	console.log("G",gender)
	console.log("P",pinCode)
	console.log("P",phoneNo)
	console.log("D",DOB)
	console.log("C",country)
	console.log("I",id)
	
	req.checkBody({
 		'address': {notEmpty: true},
  		'city': {notEmpty: true},
  		'first_name': { notEmpty: true},
  		'last_name': {notEmpty:true},
  		'DOB': {notEmpty:true},
  		'pinCode': {notEmpty:true},
  		'state': {notEmpty:true},
		'gender': {notEmpty:true},
		'phoneNo': {notEmpty:true},
		'country': {notEmpty:true}									
	});

	var errors = req.validationErrors();

  		if (errors.length<10) 
  		{
				if(first_name!="")
				{
					Profile.findOneAndUpdate({UserID:id},{$set:{first_name:req.body.first_name}}).exec(function(err,data)
					{
					console.log(err)
					console.log("first name updated");
					})
				}

				if(last_name!="")
				{
					Profile.findOneAndUpdate({UserID:id},{$set:{last_name:req.body.last_name}}).exec(function(err,data)
					{
					console.log("last name updated");
					})
				}

				if(address!="")
				{
					Profile.findOneAndUpdate({UserID:id},{$set:{address:req.body.address}}).exec(function(err,data)
					{
					console.log("address updated");
					})
				}

				if(city!="")
				{
					Profile.findOneAndUpdate({UserID:id},{$set:{city:req.body.city}}).exec(function(err,data)
					{
					console.log("city updated");
					})
				}

				if(state!="")
				{
					Profile.findOneAndUpdate({UserID:id},{$set:{state:req.body.state}}).exec(function(req,res)
					{
					console.log("state updated");
					})
				}

				if(gender!="")
				{
					Profile.findOneAndUpdate({UserID:id},{$set:{gender:req.body.gender}}).exec(function(req,res)
					{
					console.log("gender updated");
					})
				}

				if(pinCode!="")
				{
					Profile.findOneAndUpdate({UserID:id},{$set:{pinCode:req.body.pinCode}}).exec(function(err,data)
					{
					console.log("pinCode updated");
					})
				}

				if(country!="")
				{
					Profile.findOneAndUpdate({UserID:id},{$set:{country:req.body.country}}).exec(function(err,data)
					{
					console.log("country updated");
					})
				}

				if(DOB!="")
				{
					Profile.findOneAndUpdate({UserID:id},{$set:{DOB:req.body.DOB}}).exec(function(req,res)
					{
					console.log("DOB updated");
					})
				}

				if(phoneNo!="")
				{
					Profile.findOneAndUpdate({UserID:id},{$set:{phoneNo:req.body.phoneNo}}).exec(function(err,data)
					{
					console.log("phoneNo updated");
					})
				}

			res.status(200).json("User Profile Updated");
		}

  		else if(errors)
  		{
  			res.send('There have been validation errors: ' + errors, 400);
    		return;

  		}
 
  		else{
			Profile.findOneAndUpdate({UserID:id},
				{$set:{
					first_name:first_name,
					last_name:last_name,
					address:address,
					city:city,
					state:state,
					gender:gender,
					DOB:DOB,
					pinCode:pinCode,
					country:country,
					phoneNo:phoneNo
				}}).exec(function(err,data)
				{
					if(err) throw err;
				  		console.log("profile updated")
				  		res.json("Profile Updated");
				})
			}
			 	
}


//show users profile
userProfile.show=function(req,res)
{
	Profile.find({}).limit(20).skip(0).exec(function(err,data)
  {

		res.status(200).json(data);
  
  })
}

userProfile.showOne=function(req,res)
{
	var userData=req.body.cookieData
	console.log(userData);
	
	var id=userData._id;
	console.log(id);
	Profile.findOne({UserID:id}).limit(20).skip(0).exec(function(err,data)
  {
  		console.log("data",data);
		res.status(200).json(data);
  
  })
}