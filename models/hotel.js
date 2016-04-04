var mongoose=require("mongoose"),
   Schema=mongoose.Schema;


 
var hotelSchema=Schema({
 	hotelName:{type:String,default:'',index:{unique:true}},
 	hotelemail:{type:String,default:'',index:{unique:true}},
 	hotelPhone:{type:String,default:''},	
	hotelPrice:{type:String,default:''},
	hotelType:{type:String,default:''},
	startDate:{type:String,default:''},
	endDate:{type:String,default:''},
	userID:{type:String,default:''},
	typeOfRoom:{type:Array,default:[]},
	noOfRoom:{type:Array,default:[]},
	offer:{type:String,default:''},
	status:{type:String,default:''},
	payment:{type:String,default:''},
	// cookieData:{type:String,default:''},
 	created:{type:Date,default:Date.now,index:true}
 });

mongoose.model("Hotel",hotelSchema);