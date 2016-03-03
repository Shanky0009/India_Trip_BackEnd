var mongoose=require("mongoose"),
   Schema=mongoose.Schema;


 
var userSchema=Schema({
 	username:{type:String,default:'',index:{unique:true}},
 	emailID:{type:String,default:'',index:{unique:true}},
 	salt:{type:String,default:''},	
	hashedPassword:{type:String,default:''},
	answer:{type:String,default:''},
	token:{type:String,default:''},
 	created:{type:Date,default:Date.now,index:true}
 });

mongoose.model("User",userSchema);