var express=require('express'),
 mongoose=require('mongoose'),
 bodyParser=require('body-parser'),
 fs=require('fs'),
 session=require('express-session'),
cookieParser=require('cookie-parser'),
expressValidator = require('express-validator'),
app=express();



const MongoStore = require('connect-mongo')(session);



mongoose.connect('mongodb://localhost/test10009');



app.use(cookieParser());


app.use(session({secret:'anystring',
                  store: new MongoStore({ mongooseConnection: mongoose.connection}),
                  saveUninitialized: true,
                  resave: true
              }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json())

app.use(expressValidator());



fs.readdirSync(__dirname+"/models").forEach(function(filename)
{
	console.log(filename)
	if(filename.indexOf('.js'))
	{
	require(__dirname+"/models/"+filename);

	}
});



fs.readdirSync(__dirname+"/controllers").forEach(function(filename)
{
	console.log(filename)
	if(filename.indexOf('.js'))
	{
		require("./controllers/"+filename)(app);
		
	}
});


/*app.get('/',function(req,res){

  if(req.session.data)
    {
       console.log(req.session.data)
      res.json("In Session")
    }

    else
    {
     res.json("Not in Session")
    }
})
*/





 app.listen(3000)