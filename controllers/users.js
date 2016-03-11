var mongoose=require("mongoose"),
	User=mongoose.model("User"),
	Profile=mongoose.model("Profile"),
	UserPost=mongoose.model("UserPost"),
	CommentPost=mongoose.model("CommentPost"),
	express=require("express"),
	app=express(),
	crypto=require('crypto'),
	uuid=require('uuid'),
	bodyParser=require("body-parser");


var router = express.Router();
var userMethod={};


module.exports=function(router)
{
	
	router.post('/users',userMethod.create)
	router.get("/user",userMethod.show);
  	router.post("/login",userMethod.login);
  	router.post("/users/passwordreset",userMethod.passwordReset);
  	router.post("/users/updatepassword",userMethod.updatePassword);
  	router.post("/users/delete",userMethod.deleteUser);
  	router.get("/logout",userMethod.logout);
  	
}


//new user
userMethod.create=function(req,res)
{

	var username=req.body.username
	var password=req.body.password
	var emailID=req.body.emailID
    var answer=req.body.answer;

	console.log(username)

	var salt=Math.round(new Date().valueOf()*Math.random())+'';
	var hash=crypto.createHmac('sha256',salt);
	var hashedPassword=hash.update(password).digest('hex');


	var newUser=new User
	  ({
			username:username,
			emailID:emailID,
			salt:salt,
			hashedPassword:hashedPassword,
			answer:answer

		});

		
	newUser.save(function(err,data)
		{
			if(err)
			{
			console.log("err",err);
			}

			var newProfile=new Profile
			({
				UserID:data._id
			})

 		 	console.log("profile id is",newProfile.UserID)

			newProfile.save(function(err,data)
			{
		    	console.log("user",data);
				console.log("UserID saved");
			})

		res.json({success:true},data);
	})

}



//show users
userMethod.show=function(req,res)
{
	res.header("Access-Control-Allow-Origin", "http://localhost");

    res.header("Access-Control-Allow-Methods", "GET, POST");

	User.find({}).limit(20).skip(0).exec(function(err,data)
  {
      Profile.find({}).exec(function(err,datas)
      {
      	console.log("data is")
		res.json(data);
  	  })
  })
}



//user login
userMethod.login=function(req,res)
{

	

	var userPassword=req.body.password;
	

    User.findOne({username:req.body.username}).exec(function(err,data)	
    {

    	if (err) throw err;

    	if(!req.session.data)

	   	{
	    	if (!data) 
	    		    	{
	    		    	 	res.status(200).json("We Can't find the Person you are looking for.");
	    		    
	    		        } 
	    	else if (data) 
	    		    	{
	    		    	if(userPassword)
		    				{	
	    		          
		    		       		var id=data.id;
		    		       		var hash = crypto.createHmac('sha256', data.salt);
		    		       		userHash= hash.update(userPassword).digest('hex');
		    
		    		      
		    		     
		    		      		if (data.hashedPassword != userHash)
		    		       		{
		    
		    		      			res.status(200).json("Authentication failed. Wrong password.");
		    		        
		    		       		}
		    
		   		 				else
		    	       			{
		    	       				req.session.data=data;

		    		      			var id = data._id;
		    
		        					console.log("session started");
		    		        		res.status(200).json(data);
		    
		    	      			} 
	    		      		}
	    		      		else
	    		      		{
	    		      			res.status(200).json("Please enter your password");
	    		      		}
	    		    	}
		}

		   	 else
		   	 {

		   	 	res.status(200).json("A user is already logged in");
		   	 }

   }) 
}



//passwordReset
userMethod.passwordReset=function(req,res,next)
{
  User.findOne({emailID:req.body.emailID}).exec(function(err,data)
  {
    var answer=req.body.answer;
    console.log('answer',answer);

    if(!data)
    {
    	  res.status(200).json("Can't find the person you are looking for!");
    }

    else
    {
      var id=data._id;
      if (data.answer!=answer) 
      {
        res.status(200).json("Authentication failed. Wrong answer.");        
      }

      else 
      {

        var token = uuid.v4();
        User.findOneAndUpdate({_id:data._id},{$set:{token:token}}).exec(function(err,data)
        {
        console.log("token saved");
        })
        res.status(200).json("token",token);
      }
    }    
  })
} 



 

//update password
userMethod.updatePassword=function(req,res)
{
	var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.params.token;

    var password=req.body.password;
    var id=req.body.id;
    
    console.log("id",id)
    console.log("password",password)
    console.log("token",token)

	User.findOne({_id:id}).exec(function(err,data)
		{
			if(data)
				{	
						 if(token==data.token)
						 {
				    		var salt = Math.round(new Date().valueOf() * Math.random()) + '';
				    		var hash = crypto.createHmac('sha256', salt);
				    		var hashedPassword= hash.update(password).digest('hex');
			
				    
				  			User.findOneAndUpdate({_id:data.id},{$set:{salt:salt,hashedPassword:hashedPassword}}).exec(function(err,data)
				  			{
				    			console.log('password changed')
				    			res.json("Password:Changed")
				  			})
				  		 }
				  		 else
				  			{
				  				res.json("Wrong Token");
				  			}
				}
			else
				{
					res.status(200).json("Wrong ID");
				}	
		})
};


//remove user and there related data
userMethod.deleteUser=function(req,res)
{
  var id=req.body.id;
  console.log('id',id)

  User.remove({_id:id}).exec(function(err,data)
  {
  	if(data)
  	{
  		Profile.remove({UserID:id}).exec(function(err,data)
  		{
  	
  			UserPost.remove({postID:id}).exec(function(err,data)
  			{ 
  	  			CommentPost.remove({commentID:data._id}).exec(function(err,data)
  	  			{
  	  				console.log("User removed");
  	  				res.status(200).json("User is removed");
  	  			})
  	
  	     	})
  				
  		})
  	}
  	else
  	{
  		res.status(200).json("User Not Found");
  	}

  })
  
}


//close of session
userMethod.logout=function(req,res)
{
	if(req.session.data)
	{
	req.session.destroy();
	console.log("logged out");
	res.status(200).json("User logged out");
	}	
	else
	{
		res.status(200).json("No user logged in");
	}
}

