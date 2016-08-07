/*
Load all models here
*/
var mongoose=require("mongoose"),
	User=mongoose.model("User"),
	Profile=mongoose.model("Profile"),
	Hotel=mongoose.model("Hotel"),
	express=require("express"),
	app=express(),
	crypto=require('crypto'),
	uuid=require('uuid'),
	bodyParser=require("body-parser");
	router = express.Router();

/*
Empty HTTP method object.
*/
var userMethod={};


/*
Routings/controller goes here
*/

module.exports=function(router)
{
    router.post('/users',userMethod.create);
	router.get("/user",userMethod.show);
  	router.post("/login",userMethod.login);
  	router.post("/beforeLogin",userMethod.emailPassLen);
  	router.post("/users/passwordreset",userMethod.passwordReset);
  	router.post("/users/updatepassword",userMethod.updatePassword);
  	router.post("/users/delete",userMethod.deleteUser);
}


/**************************************************************************************************************************/
/***************************************** All the HTTP methods goes here *************************************************/
/**************************************************************************************************************************/


/*******************************
  New User get registered here .
********************************/
userMethod.create=function(req,res)
{
	var username=req.body.username;
	var password=req.body.password;
	var emailID=req.body.emailID;
    var answer=req.body.answer;
    console.log(password.length);
    var passLength=password.length;
	var salt=Math.round(new Date().valueOf()*Math.random())+'';
	var hash=crypto.createHmac('sha256',salt);
	var hashedPassword=hash.update(password).digest('hex');
	
	User.findOne({username:req.body.username}).exec(function(err,data) {	
		if(data) {
			res.json("User already exists")
		} else {   	
			var newUser=new User
			({
				username:username,
				emailID:emailID,
				salt:salt,
				hashedPassword:hashedPassword,
				answer:answer,
				passLength:passLength
			});
		
			newUser.save(function(err,data) {
				if(err) {
				console.log("err",err);
				}
				var newProfile=new Profile ({
					UserID:data._id
				})
				newProfile.save(function(err,data){
					res.status(200).json("User created");						
				})	
			})
		}
	})			
}
/***********************************
  New User get registered ends here.
***********************************/


/***********************************
  Admin can get deatils of all users.
***********************************/
userMethod.show=function(req,res)
{
	User.find({}).limit(20).skip(0).exec(function(err,data) {
      Profile.find({}).exec(function(err,datas) {
		res.status(200).json(data);
  	  })
  	})
}
/*********************************************
  Admin can get deatils of all users ends here.
**********************************************/

/*********************************************
  Gives password length for authentication.
**********************************************/
userMethod.emailPassLen=function(req,res){
	User.findOne({emailID:req.body.emailID}).exec(function(err,data) {
    	if(data){
    		res.status(200).json(data.passLength);
    	}
    });	
}
/***************************************************
  Gives password length for authentication ends here.
****************************************************/

/*******************************
  User login and authentication.
********************************/
userMethod.login=function(req,res)
{
	var userPassword=req.body.password;

	if(req.body.emailID=="Admin@indiaTrip.com"||req.body.emailID=="admin@indiaTrip.com") {
		if(userPassword=="Password"||userPassword=="password") {
			res.status(200).json("admin");		
		} else {
				res.status(200).json("Authentication failed. Wrong password.");
		}
	} else {
	    User.findOne({emailID:req.body.emailID}).exec(function(err,data) {
			if (err) throw err;

	    	if (!data) {
	    		res.status(200).json("Please enter correct Email ID");
	        } 
	    	else if (data) {
    			if(userPassword) {	
		       	    var id=data.id;
		       		var hash = crypto.createHmac('sha256', data.salt);
		       		userHash= hash.update(userPassword).digest('hex');

		      		if (data.hashedPassword != userHash) {
		      			res.status(200).json("Authentication failed. Wrong password.");		        
		       		} else {
		      			var id = data._id;
		        		res.status(200).json(data);
	      			} 
	      		} else {
	      			res.status(200).json("Please enter your password");
	      		}
	    	}
	   }) 
	}
}
/******************************************
   User login and authentication ends here.
*******************************************/



/***********************************
   User requests for password reset.
*************************************/
userMethod.passwordReset=function(req,res,next)
{
  	User.findOne({emailID:req.body.emailID}).exec(function(err,data) {
    var answer=req.body.answer;
	    if(!data) {
	    	  res.status(200).json("Can't find the person you are looking for!");
	    } else {
		    var id=data._id;
		    if (data.answer!=answer) {
		        res.status(200).json("Authentication failed. Wrong answer.");        
		    } else {
		        var token = uuid.v4();
		        User.findOneAndUpdate({_id:data._id},{$set:{token:token}}).exec(function(err,data) {  })
		        res.status(200).json(token);
		    }
	    }    
    })
} 
/********************************************
   User requests for password reset ends here.
*********************************************/


 

/************************
   User updates password
*************************/
userMethod.updatePassword=function(req,res)
{
	var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.params.token;
    var password=req.body.password;
    var id=req.body.id;  
	User.findOne({emailID:req.body.emailID}).exec(function(err,data) {
		if(data) {	
			 if(token==data.token) {
	    		var salt = Math.round(new Date().valueOf() * Math.random()) + '';
	    		var hash = crypto.createHmac('sha256', salt);
	    		var hashedPassword= hash.update(password).digest('hex');
  
	  			User.findOneAndUpdate({_id:data.id},{$set:{salt:salt,hashedPassword:hashedPassword}}).exec(function(err,data) {
	    			res.json("Password:Changed")
	  			})
	  		 } else {
	  				res.json("Wrong Token");
	  			}
		} else {
				res.status(200).json("Wrong ID");
		}	
	})
};
/**********************************
   User updates password ends here.
***********************************/



/*****************************************
   User deletes their account and profile.
******************************************/
userMethod.deleteUser=function(req,res)
{
	var id=req.body.UserID;
	User.remove({_id:id}).exec(function(err,data) {
	  	if(data) {
	  		Profile.remove({UserID:id}).exec(function(err,data) {
	  			Hotel.remove({UserID:id}).exec(function(err,data) { 
	  	  				res.status(200).json("User is removed");
	  	     	})
	  				
	  		})
	  	} else {
	  		res.status(200).json("User Not Found");
	  	}
	}) 
}
/**************************************************
   User deletes their account and profile ends here.
***************************************************/


