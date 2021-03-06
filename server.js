//___________________
//Dependencies
//___________________
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express();
const session = require('express-session')
const db = mongoose.connection;
const env = require('dotenv').config()
TITLE = 'Reciplease!'
page = 'partials/nav-login.ejs'
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;
//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ 'PROJECT-2';
// set secret thru heroku or seperate file
const SECRET = process.env.SECRET 
// Connect to Mongo
mongoose.connect(MONGODB_URI , { 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
});
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Middleware
//___________________
//use public folder for static assets
app.set('view engine', 'ejs');
app.use(express.static('public'));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
app.use(expressLayouts);

app.use(
    session({
      secret: SECRET, //a random string do not copy this value or your stuff will get hacked
      resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
      saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
    })
)



// Controllers
const usersController = require('./controllers/users_controller.js')
app.use('/users', usersController)

const ingredientsController = require('./controllers/ingredients_controller.js')
app.use('/ingredients', ingredientsController)

const recipesController = require('./controllers/recipes_controller.js')
app.use('/recipes', recipesController)

const sessionsController = require('./controllers/sessions_controller.js');
const User = require('./models/user.js');


User.findById
app.use('/sessions', sessionsController)


//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , async (req, res) => {
  res.redirect('/ingredients');
});
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));



