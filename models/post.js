//modules required
var mongoose=require("mongoose"),
   Schema=mongoose.Schema;

//post schema
var postSchema=Schema
	({
    postID:{type:String,default:''},
   	postBody:{type:String,default:''},
   	postLike:{type:Array,default:[]}

   	});

//comment schema
 var commentSchema=Schema
	({
    commentID:{type:String,default:''},
   	postComment:{type:String,default:''},
   	commentLike:{type:Array,default:[]}

   	});

//post and comment models
mongoose.model("CommentPost",commentSchema);
mongoose.model("UserPost",postSchema);
 	

