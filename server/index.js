const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/voteblock");

const express= require("express");
const app=express();
app.use(
    express.urlencoded({ extended: true })
);
    
app.use(express.json());
app.use( express.static( "public" ) );

//for user routes
const userRoute = require('./routes/userRoute');
app.use('/',userRoute);

//for admin routes
const adminRoute = require('./routes/adminRoute');
app.use('/admin',adminRoute)

app.listen(3002,function(){
    console.log("server is running..");
})

