
// starting of project file
const express = require('express');
const colors = require('colors');
const cors=require('cors');
const morgan=require('morgan');
const dotenv=require('dotenv');
const connectDb=require("./config/db");



// env configuration 
dotenv.config();

// db connection
connectDb();


// create  rest object to use the feature of express js
const app = express();

// cors are the middleware
app.use(cors()); 
app.use(express.json());

// morgan are also middleware
 app.use(morgan('dev'));

// create the route to use the app
//url=>http://localhost:8080

//routes import 
app.use('/api/v1/test',require('./routes/testRoutes'))

//auth routes import
app.use('/api/v1/auth',require('./routes/authRoutes'));
// user routes import
app.use('/api/v1/user',require('./routes/userRoutes'))
app.use('/api/v1/resturant',require('./routes/resturantRoutes'))
app.use('/api/v1/category',require('./routes/categoryRoutes'))
app.use('/api/v1/food',require('./routes/foodRoutes'))
app.get('/',(req,res)=>{
return res.status(200).send("<h1>welcome to the food  server");
});
// port 

const PORT=process.env.PORT ||5000 ;

//listen

app.listen(PORT, ()=>{
    console.log(` node server running on ${PORT}`.bgGreen.white)

})

//starting of project to here 
// to update server type ctrl c and then write node server.js