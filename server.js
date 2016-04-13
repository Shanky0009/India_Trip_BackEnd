 var express=require('express'),
 mongoose=require('mongoose'),
 bodyParser=require('body-parser'),
 fs=require('fs'),
 morgan = require('morgan'),
 session=require('express-session'),
cookieParser=require('cookie-parser'),
expressValidator = require('express-validator'),
cors = require('cors'),
app=express();



const MongoStore = require('connect-mongo')(session);



mongoose.connect('mongodb://localhost/test10012');


 
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

app.use(cors());

var router = express.Router();

app.set('view engine','ejs');



router.get('/Angular.html',function(req,res)
{
  res.sendFile(__dirname+('/Angular.html'));
})

router.get('/home.html',function(req,res)
{
  res.sendFile(__dirname+('/home.html'));
})

router.get('/mithrilJS.html',function(req,res)
{
  res.sendFile(__dirname+('/mithrilJS.html'));
})


router.get('/new.html',function(req,res)
{
  res.sendFile(__dirname+('/new.html'));
})





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
		require("./controllers/"+filename)(router);
		
	}
});



 fs.readdirSync(__dirname+"/Destination").forEach(function(filename)
{
  console.log(filename)
});
fs.readdirSync(__dirname+"/Hotel").forEach(function(filename)
{
  console.log(filename)
});

app.use("/api",router);
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