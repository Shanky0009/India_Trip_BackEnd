//modules required
var mongoose=require("mongoose"),
	Profile=mongoose.model("Profile"),
	User=mongoose.model("User"),
	express=require("express"),
	app=express(),

	bodyParser=require("body-parser");


var userProfile={};


module.exports=function(app) {

	app.post('/profile',userProfile.updateUser);
	app.get('/userprofile',userProfile.show);
}


//update profile
userProfile.updateUser=function(req,res)
{

	var first_name=req.body.first_name;
	var last_name=req.body.last_name;
	var address=req.body.address;
	var city=req.body.city;
	var state=req.body.state;
	var gender=req.body.gender;
	var education=req.body.education;
	var job=req.body.job;
	var age=req.body.age;
	var phoneNo=req.body.phoneNo;
	var id=req.body.id;
	
	req.checkBody({
 		'address': {notEmpty: true},
  		'city': {notEmpty: true},
  		'first_name': { notEmpty: true},
  		'last_name': {notEmpty:true},
  		'education': {notEmpty:true},
  		'state': {notEmpty:true},
  		'job': {notEmpty:true},
		'gender': {notEmpty:true},
		'age': {notEmpty:true},
		'phoneNo': {notEmpty:true}									
	});

	var errors = req.validationErrors();

  		if (errors.length<10) 
  		{
				if(first_name!=null)
				{
					Profile.findOneAndUpdate({UserID:id},{$set:{first_name:req.body.first_name}}).exec(function(req,res)
					{
					console.log("first name updated");
					})
				}

				if(last_name!=null)
				{
					Profile.findOneAndUpdate({UserID:id},{$set:{last_name:req.body.last_name}}).exec(function(req,res)
					{
					console.log("last name updated");
					})
				}

				if(address!=null)
				{
					Profile.findOneAndUpdate({UserID:id},{$set:{address:req.body.address}}).exec(function(req,res)
					{
					console.log("address updated");
					})
				}

				if(city!=null)
				{
					Profile.findOneAndUpdate({UserID:id},{$set:{city:req.body.city}}).exec(function(req,res)
					{
					console.log("city updated");
					})
				}

				if(state!=null)
				{
					Profile.findOneAndUpdate({UserID:id},{$set:{state:req.body.state}}).exec(function(req,res)
					{
					console.log("state updated");
					})
				}

				if(gender!=null)
				{
					Profile.findOneAndUpdate({UserID:id},{$set:{gender:req.body.gender}}).exec(function(req,res)
					{
					console.log("gender updated");
					})
				}

				if(education!=null)
				{
					Profile.findOneAndUpdate({UserID:id},{$set:{education:req.body.education}}).exec(function(req,res)
					{
					console.log("education updated");
					})
				}

				if(job!=null)
				{
					Profile.findOneAndUpdate({UserID:id},{$set:{job:req.body.job}}).exec(function(req,res)
					{
					console.log("job updated");
					})
				}

				if(age!=null)
				{
					Profile.findOneAndUpdate({UserID:id},{$set:{age:req.body.age}}).exec(function(req,res)
					{
					console.log("age updated");
					})
				}

				if(phoneNo!=null)
				{
					Profile.findOneAndUpdate({UserID:id},{$set:{phoneNo:req.body.phoneNo}}).exec(function(req,res)
					{
					console.log("phoneNo updated");
					})
				}

			res.status(200).json("user profile updated");
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
					education:education,
					job:job,
					age:age,
					phoneNo:phoneNo
				}}).exec(function(err,data)
				{
					if(err) throw err;
				  		console.log("profile updated")
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