/*
Load all models here
*/
var mongoose=require("mongoose"),
	Profile=mongoose.model("Profile"),
	User=mongoose.model("User"),
	express=require("express"),
	app=express(),
	bodyParser=require("body-parser"),
	router = express.Router();

/*
Empty HTTP method object.
*/
var userProfile={};


/*
Routings/controller goes here
*/
module.exports=function(router){
	router.post('/profile',userProfile.updateUser);
	router.get('/showprofile',userProfile.show);
	router.post('/userprofile',userProfile.showOne);
}


/**************************************************************************************************************************/
/***************************************** All the HTTP methods goes here *************************************************/
/**************************************************************************************************************************/



/********************************************
  Users can update their profile accordingly.
*********************************************/
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
	if (errors.length<10) {
		if(first_name!="") {
			Profile.findOneAndUpdate({UserID:id},{$set:{first_name:req.body.first_name}}).exec(function(err,data){})
		}
		if(last_name!="") {
			Profile.findOneAndUpdate({UserID:id},{$set:{last_name:req.body.last_name}}).exec(function(err,data){})
		}
		if(address!="") {
			Profile.findOneAndUpdate({UserID:id},{$set:{address:req.body.address}}).exec(function(err,data){})
		}
		if(city!="") {
			Profile.findOneAndUpdate({UserID:id},{$set:{city:req.body.city}}).exec(function(err,data){})
		}
		if(state!="") {
			Profile.findOneAndUpdate({UserID:id},{$set:{state:req.body.state}}).exec(function(err,data){})
		}
		if(gender!="") {
			Profile.findOneAndUpdate({UserID:id},{$set:{gender:req.body.gender}}).exec(function(err,data){})
		}
		if(pinCode!="") {
			Profile.findOneAndUpdate({UserID:id},{$set:{pinCode:req.body.pinCode}}).exec(function(err,data){})
		}
		if(country!="") {
			Profile.findOneAndUpdate({UserID:id},{$set:{country:req.body.country}}).exec(function(err,data){})
		}
		if(DOB!="") {
			Profile.findOneAndUpdate({UserID:id},{$set:{DOB:req.body.DOB}}).exec(function(err,data){})
		}
		if(phoneNo!="") {
			Profile.findOneAndUpdate({UserID:id},{$set:{phoneNo:req.body.phoneNo}}).exec(function(err,data){})
		}
	res.status(200).json("User Profile Updated");

	} else if(errors) {
		res.status(400).json('There have been validation errors: ' + errors);
		return;
	} else {
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
	  		res.json("Profile Updated");
		})
	}		 	
}
/*****************************************************
  Users can update their profile accordingly ends here.
******************************************************/



/*********************************
  Admin can view all users profile.
**********************************/
userProfile.show=function(req,res) {
	Profile.find({}).limit(20).skip(0).exec(function(err,data) {
		res.status(200).json(data);
  })
}
/******************************************
  Admin can view all users profile ends here.
********************************************/



/*****************************
  Users can view their profile
*******************************/
userProfile.showOne=function(req,res) {
	var userData=req.body.cookieData	
	var id=userData._id;
	Profile.findOne({UserID:id}).limit(20).skip(0).exec(function(err,data) {
		res.status(200).json(data);
  })
}
/***************************************
  Users can view their profile ends here.
****************************************/