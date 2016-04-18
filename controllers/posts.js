/*
Load all models here
*/
var mongoose=require("mongoose"),
	Profile=mongoose.model("Profile"),
	UserPost=mongoose.model("UserPost"),
	CommentPost=mongoose.model("CommentPost"),
	express=require("express"),
	app=express(),
	bodyParser=require("body-parser")
	router = express.Router();


/*
Empty HTTP method object.
*/
userPost={};


/*
Routings/controller goes here
*/
module.exports=function(router) {

	router.post('/post',userPost.UPost);
	router.post('/postlike',userPost.PLike);
	router.get('/showpost',userPost.SPost);
	router.post('/postcomment',userPost.UComment);
	router.get('/showcomment',userPost.SComment);
	router.post('/commentlike',userPost.CLike);
	router.post('/deletepost',userPost.DelPost);
}

/**************************************************************************************************************************/
/***************************************** All the HTTP methods goes here *************************************************/
/**************************************************************************************************************************/


/******************************
  Users can POST their reviews.
*******************************/
userPost.UPost=function(req,res)
{
	var userdata={};
	var userData=req.body.userdata;
	if(userData!=null) {	
		var postBody=req.body.postBody;
		var sessionid=userData._id;
		var newPost=new UserPost ({
			postID:sessionid,
			postBody:postBody
		
		})
		newPost.save(function(err,data) {	
			res.status(200).json(data);

		})
	} else {
		res.status(200).json("No user logeed in");
	}

}

/****************************************
  Users can POST their reviews ends here.
*****************************************/


/********************************************
  Other Users can like posts of other users.
*********************************************/
userPost.PLike=function(req,res)
{

	UserPost.findOneAndUpdate({_id:req.body.id},{$push:{postLike:req.body.postLike}},function(err,data)
	{ 
		if(!data) res.status(200).json("no data found");
		else {
			var u=data.postLike.length;
			res.status(200).json("No. of Users that Liked the Post"+" "+u);
		}
	})
}

/****************************************************
  Other Users can like posts of other users ends here.
*****************************************************/



/*******************************************
  Displays Users posts below respective post
********************************************/
userPost.SPost=function(req,res)
{
    if(req.body.userdata!=null) {
    	UserPost.find({postID:req.body.userdata._id}).exec(function(err,data) {
    		if(!data) res.status(200).json("no data found");
    		else {
    			CommentPost.find({commentID:data._id}).exec(function(err,datas){
    				res.status(200).json(data);
    			})
    		}
    	})
    } else {
    	res.status(200).json("no id present");
    }
}

/*****************************************************
  Displays Users posts below respective post ends here
******************************************************/



/*********************************************
  Other Users can comment on other users posts
**********************************************/

userPost.UComment=function(req,res)
{	
	UserPost.findOne({postID:req.body.id}).exec(function(err,data)
	{
		var newCommentPost=new CommentPost ({
			commentID:data._id,
			postComment:req.body.postComment
		})
		newCommentPost.save(function(err,data) {
			res.status(200).json(data);
		})
	})
}

/******************************************************
  Other Users can comment on other users posts ends here
********************************************************/


/*************************************************
  Displays Other Users comment on respective posts
***************************************************/
userPost.SComment=function(req,res)
{	
	CommentPost.find({}).exec(function(err,data)
	{
		res.status(200).json(data)
	})

}
/**********************************************************
  Displays Other Users comment on respective posts ends here
************************************************************/



/*********************************************
  Other Users can like comment on users posts
**********************************************/

userPost.CLike=function(req,res)
{
	CommentPost.findOneAndUpdate({_id:req.body.id},{$push:{commentLike:req.body.commentLike}}).exec(function(err,data)
	{	
		var l=data.commentLike.length;
		res.status(200).json("No of people that liked your comment"+" "+l);

	})
}

/********************************************************
  Other Users can like comment on users  posts ends here
*********************************************************/



/************************************
  Users can their posts and comments.
*************************************/

userPost.DelPost=function(req,res)
{   
   if(req.body.id) {
	  	UserPost.remove({_id:req.body.id}).exec(function(err,data) {   	  
			CommentPost.remove({commentID:data._id}).exec(function(err,data) {
			  			res.status(200).json("Post is removed");
			})
	  	 })
  	} else {	
		res.status(404).json("Worng ID")
  	}   
}
  
/*********************************************
  Users can their posts and comments ends here
**********************************************/