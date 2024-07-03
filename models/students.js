const mongoose = require('mongoose');
const schema = mongoose.Schema;

     // Creating Schema
const studentSchema = new schema ({

    firstname:{
        type:String,
        required: [true,'Firstname is required']
    },

    
    lastname:{
        type:String,
        required: [true,'Lastname is required']
    },

    gender:{
        type:String,
        
    }
});

const Student = mongoose.model('Student',studentSchema); //create a model that is going to represent our collection in the DB.
    module.exports = Student; //here we are exporting this file so that we can use it in other files.