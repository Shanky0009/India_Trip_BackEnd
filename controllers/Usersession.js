/*
Load HTTP access control(CROS)
*/
var session=require('express-session'),
    cookieParser=require('cookie-parser'),
    express=require('express'),
    app=express();
    router = express.Router();

/*
Empty HTTP method object.
*/
var UserSession={};

/*
Routings/controller goes here
*/
module.exports=function(router)
{
    router.get('/',UserSession.sessionCreate) 
    router.get('/deletesession',UserSession.sessionDelete)
}



/**************************************************************************************************************************/
/***************************************** All the HTTP methods goes here *************************************************/
/**************************************************************************************************************************/


/********************************
  Checks for any logged-in user .
*********************************/
UserSession.sessionCreate = function(req,res){
  if(req.session.data) {
      res.redirect('/api/Angular.html');
    } else {
     res.redirect('/api/Angular.html');
    }
}
/*****************************************
  Checks for any logged-in user ends here .
*******************************************/


/*****************************
  User session gets destroyed .
******************************/
UserSession.sessionDelete=function(req,res)
{
  req.session.destroy();
  res.status(200).json("User logged out");
  console.log("session closed");
}
/**************************************
  User session gets destroyed ends here .
***************************************/

