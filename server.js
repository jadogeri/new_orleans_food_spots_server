const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

connectDB();
const app = express();

app.use(express.json())
app.use(cors(corsOptions)) // Use this after the variable declaration


app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler)


const port = process.env.PORT ;

app.listen(port,()=>{
console.log('listening on port '+ port);
});


module.exports = app;