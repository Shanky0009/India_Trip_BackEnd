// var fs = require("fs");

//  console.log("\n *STARTING* \n");
// // Get content from file

//  var destination = fs.readFileSync("destinations.json");
// // Define to JSON type

//  // var jsondestination = JSON.parse(destination);
// // Get Value from JSON

//  // console.log("Place:", jsondestination.place);
//  // console.log("Description:", jsondestination.description);
//  console.log("\n *EXIT* \n");

var mongoose=require("mongoose"),
   Schema=mongoose.Schema;

   var destinationSchema=Schema
	({
    filename:{type:String,default:''}
    // count:{type:Number,default:''}
   	});

//destination models
mongoose.model("UserDestination",destinationSchema);