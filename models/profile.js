var mongoose=require("mongoose"),
   Schema=mongoose.Schema;


 
var profileSchema=Schema({
 	first_name:{type:String,default:'',index:{unique:true}},
 	last_name:{type:String,default:''},
 	city:{type:String,default:''},
 	state:{type:String,default:''},
 	education:{type:String,default:''},
 	job:{type:String,default:''},
 	gender:{type:String,default:''},
 	address:{type:String,default:''},
 	phoneNo:{type:String,default:''},
 	age:{type:String,default:''},
 	UserID:{type:String,default:''},
	
 	created:{type:Date,default:Date.now,index:true}
 });

mongoose.model("Profile",profileSchema);