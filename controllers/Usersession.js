//modules required
var session=require('express-session'),
    cookieParser=require('cookie-parser'),
    express=require('express'),
    app=express();

    

var router = express.Router();

 UserSession={};

//exporting modules
module.exports=function(router)
{
    router.get('/',UserSession.sessionCreate) 
    router.get('/deletesession',UserSession.sessionDelete)

}


//session
UserSession.sessionCreate = function(req,res){

  if(req.session.data)
    {
       console.log(req.session.data)
      res.redirect('/api/Angular.html');
    }

    else
    {
     res.redirect('/api/Angular.html');
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

