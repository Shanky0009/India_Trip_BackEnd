var mongoose=require("mongoose"),
User=mongoose.model("User"),
express=require("express"),
app=express(),
crypto=require('crypto'),
uuid=require('uuid'),

bodyParser=require("body-parser");





var userMethod={};


module.exports=function(app)
{
	app.get('/',userMethod.sessionCreate)
	app.post('/users',userMethod.create)
	app.get("/user",userMethod.show);
  	app.post("/login",userMethod.login);
  	app.post("/users/passwordreset",userMethod.passwordReset);
  	
  	app.post("/users/updatepassword",userMethod.updatePassword);
}


//new user
userMethod.create=function(req,res)
{

	var username=req.body.username
	var password=req.body.password
	var emailID=req.body.emailID

	console.log(username)

	var salt=Math.round(new Date().valueOf()*Math.random())+'';
	var hash=crypto.createHmac('sha256',salt);
	var hashedPassword=hash.update(password).digest('hex');


		var newUser=new User({
		username:username,
		emailID:emailID,
		salt:salt,
		hashedPassword:hashedPassword,
		answer:answer

	});
		
	newUser.save(function(err,data)
	{
		if(err){
			console.log("err",err);
		}
		
		console.log(err,data);
		res.json({success:true});
	})

}

//show users
userMethod.show=function(req,res)
{
	User.find({}).limit(20).skip(0).exec(function(err,data)
  {

		res.status(200).json(data);
  
  })
}

//user login
userMethod.login=function(req,res)
{
	var userPassword=req.body.password;
   console.log("password",req.body.password)
   console.log("Username",req.body.username)

    User.findOne({username:req.body.username}).exec(function(err,data)	
    {

    if (err) throw err;

    if (!data) {
    	 	res.status(200).json("We Can't find the Person you are looking for.");
    
    } 
    else if (data) {
    	


          
       var id=data.id;
       var hash = crypto.createHmac('sha256', data.salt);
       userHash= hash.update(userPassword).digest('hex');

      
     
      if (data.hashedPassword != userHash) {
      	res.status(200).json("Authentication failed. Wrong password.");
        
      }

      else {

        res.status(200).json("You are logged in");

      } 
      
    }

   }) 
}

//passwordReset
userMethod.passwordReset=function(req,res,next)
{
  console.log('name',req.body.username)

  User.findOne({username:req.body.username}).exec(function(err,data)
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

      else {

        var token = uuid.v4();
        User.findOneAndUpdate({_id:data._id},{$set:{token:token}}).exec(function(err,data)
        {
        console.log("token saved")
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
    console.log('password',password)
	User.findOne({_id:id}).exec(function(err,data)
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

		 })
};



//session
var sessionCreate = function(data,callback){

  if(req.session.data)
    {
       console.log(req.session.data)
      res.json("In Session")
    }

    else
    {
     res.json("Not in Session")
    }
}


			//forgot_password
			//userMethod.forgot_password=function(req,res)
			//{

			//}