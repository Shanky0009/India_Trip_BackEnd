var mongoose=require("mongoose"),
   Schema=mongoose.Schema;
// var ObjectId = mongoose.Schema.Types.ObjectId;

//profile schema 
var profileSchema=Schema({
 	first_name:{type:String,default:''},
 	last_name:{type:String,default:''},
 	city:{type:String,default:''},
 	state:{type:String,default:''},
 	country:{type:String,default:''},
 	gender:{type:String,default:''},
 	address:{type:String,default:''},
 	phoneNo:{type:String,default:'',index:{unique:true}},
 	DOB:{type:String,default:''},
 	UserID:{type:String,default:''},
 	pinCode:{type:String,default:''},	
 	created:{type:Date,default:Date.now,index:true}
 });

//profile model
mongoose.model("Profile",profileSchema);