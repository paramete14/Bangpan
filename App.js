const express=require('express');
const mongoose = require('mongoose')
require("dotenv").config();
//import routes
const userRoutes =require('./routes/user');

//app
const app =express();

//database
mongoose.connect(process.env.DATABASE, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useCreateIndex: true 
}).then(()=>console.log("DB connected"));

//routes middleware
app.use('/api',userRoutes)

const port = process.env.PORT || 7000;

app.listen(port,()=>{
    console.log('Server is running on port '+port);
});