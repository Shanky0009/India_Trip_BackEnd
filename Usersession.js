/* var session=require('express-session'),
cookieParser=require('cookie-parser'),
express=require('express'),
app=express(),
mongoose=require('mongoose');

const MongoStore = require('connect-mongo')(session);

app.use(cookieParser());

app.use(session({secret:'anystring',
                  store: new MongoStore({ mongooseConnection: mongoose.connection}),
                  saveUninitialized: true,
                  resave: true
              }));


//session
var UserSession = function(req,res){

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
module.exports=UserSession;
*/

/*
var express=require("express"),
app=express()

var Session={};

module.exports=function(app)
{
	app.get('/',Session.sessionCreate)
}


Session.sessionCreate = function(req,res){

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
*/