// this file is essentially responsible for establishing a connection betwwen your nodejs and mongodb using the mongoose library
const mongoose= require('mongoose');
// define mongodb connection url
const mongoURL='mongodb://localhost:27017/hotels'; // where hotels is database name

// set up mongodb connection
  mongoose.connect(mongoURL,{
  useNewUrl:true,   // both are required [parameter to establish connection]
  useUnifiedUrl:true
  })

  const db=mongoose.connection;

  // define event listener for datavbase connection

  db.on('connected',() => {
    console.log("connection established");
  })
  db.on('error',(err) => {
    console.log("connection established",err);
  })
  db.on('disconnected',() => {
    console.log("connection disconnected");
  })

  // export database connection

  module.exports =db; 