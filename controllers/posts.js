//modules required
var mongoose=require("mongoose"),
	Profile=mongoose.model("Profile"),
	UserPost=mongoose.model("UserPost"),
	CommentPost=mongoose.model("CommentPost"),
	express=require("express"),
	app=express(),
	bodyParser=require("body-parser");

userPost={};
var router = express.Router();

module.exports=function(router) {

	router.post('/post',userPost.UPost);
	router.post('/postlike',userPost.PLike);
	router.get('/showpost',userPost.SPost);
	router.post('/postcomment',userPost.UComment);
	router.get('/showcomment',userPost.SComment);
	router.post('/commentlike',userPost.CLike);
	router.post('/deletepost',userPost.DelPost);
}


//user posts
userPost.UPost=function(req,res)
{
	if(req.session.data)
	{	
		var postBody=req.body.postBody;
		var sessionid=req.session.data._id;
		console.log("session",sessionid);

		var newPost=new UserPost
		({
					postID:sessionid,
					postBody:postBody
		
				})

		newPost.save(function(err,data)
		{	
			console.log("new post created");
			res.status(200).json(data);

		})
	}
	else
	{
			console.log("post not executed");
			res.status(200).json("No user logeed in");
	}

}

//post likes
userPost.PLike=function(req,res)
{

	UserPost.findOneAndUpdate({_id:req.body.id},{$push:{postLike:req.body.postLike}},function(err,data)
	{ 
		if(!data) res.status(200).json("no data found");
		else
		{
			console.log("You liked the post");
			console.log("liked",data.postLike.length);
			var u=data.postLike.length;
			res.status(200).json("No. of Users that Liked the Post"+" "+u);
		}
	})
}


//show posts and there comments
userPost.SPost=function(req,res)
{
	res.header("Access-Control-Allow-Origin", "http://localhost");

    res.header("Access-Control-Allow-Methods", "GET, POST");

	UserPost.find({postID:req.session.data._id}).exec(function(err,data)
	{
		if(!data) res.status(200).json("no data found");

		else
		{
			CommentPost.find({commentID:data._id}).exec(function(err,datas)
			{
			res.status(200).json(data);
			})
		}
	})
}

//post comments
userPost.UComment=function(req,res)
{	
	UserPost.findOne({postID:req.body.id}).exec(function(err,data)
	{
		var newCommentPost=new CommentPost
		({
			commentID:data._id,
			postComment:req.body.postComment
		})
		newCommentPost.save(function(err,data)
		{
			console.log("comment save");
			res.status(200).json(data);
		})
	})

}

//show all comments for all users
userPost.SComment=function(req,res)
{	
	CommentPost.find({}).exec(function(err,data)
	{
		res.status(200).json(data)
	})

}


//comment likes
userPost.CLike=function(req,res)
{
	CommentPost.findOneAndUpdate({_id:req.body.id},{$push:{commentLike:req.body.commentLike}}).exec(function(err,data)
	{	
		console.log("comment liked")
		var l=data.commentLike.length;
		res.status(200).json("No of people that liked your comment"+" "+l);

	})
}


//delete post and there comments
userPost.DelPost=function(req,res)
{
    
   if(req.body.id)
  	{
	  UserPost.remove({_id:req.body.id}).exec(function(err,data)
	  { 
	  	  
		  		console.log(req.body.id);
		  		CommentPost.remove({commentID:data._id}).exec(function(err,data)
		  		{
		  			console.log("data removed");
		  			res.status(200).json("Post is removed");
		  		})
	  		
	  })
  	}
  	else
  	{	
		console.log("No ID Defined")
		res.status(404).json("Worng ID")
  	}
    
}
  