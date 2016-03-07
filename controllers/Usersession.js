//modules required
var session=require('express-session'),
    cookieParser=require('cookie-parser'),
    express=require('express'),
    app=express(),
    


 UserSession={};

//exporting modules
module.exports=function(app)
{
    app.get('/',UserSession.sessionCreate) 
    app.get('/deletesession',UserSession.sessionDelete)

}


//session
UserSession.sessionCreate = function(req,res){

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

//close session
UserSession.sessionDelete=function(req,res)
{
  req.session.destroy();
  res.status(200).json("User logged out");
  console.log("session closed");
}


//show session data
// UserSession.show=function(req,res)
// {
//   USession.find({}).exec(function(err,data)
//   {
//     res.json(data)
//     console.log("data",data)
//   })
// }

