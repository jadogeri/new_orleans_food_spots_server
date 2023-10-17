const express = require('express');
const dotenv = require('dotenv').config();
const error = require('./middleware/errorHandler');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');



connectDB();
const app = express();

//old implementation of routes
// app.get('/api/contacts', function(req, res){
//     res.status(200).json({message:'get all contacts'});
// })

app.use(express.json())

app.use('/api/contacts', require('./routes/contactRoutes'));
app.use(errorHandler)
app.use('/api/users', require('./routes/userRoutes'));


const port = process.env.PORT ;

app.listen(port,()=>{
console.log('listening on port '+ port);
});