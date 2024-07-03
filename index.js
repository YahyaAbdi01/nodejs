require('dotenv').config();
require('./helpers/init_mongodb');
require('./helpers/validationSchema');
const express = require('express');
const studentroutes = require('./routes/studentRoute');

const authroutes = require('./routes/authRoute');

const app = express();
app.use(express.json());

app.use(studentroutes);

app.use(authroutes);

app.listen(process.env.port || 4000, function (){
    console.log('Now listening for requests on:http://localhost:4000');
});

//handling 404 error
app.use((req, res, next)=>{
    const err= new Error("Not Found");
    err.status = 404
    next(err)
})

//Error handler
app.use((err, req, res, next)=>{
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status|| 500,
            message:err.message

        }
    })
})