const Student = require('../models/students');
const createError =require('http-errors')

module.exports= {

    // Adding data to the DB

    addstudent:async(req,res,next)=>{
        //console.log(req.body);
        //res.send(req.body);
        try{
            const student = new Student(req.body)
            const result = await student.save();
            res.send(result)
        } catch(error) {
            console.log(error.message);

            if(error.name ==="ValidationError") {
                next(createError(422, error.message))
                return;
        }
        next(error)
    }
    
    },

//geting specific student by ID from the DB

getStudentById: async (req, res, next) => {

const id = req.params.id;
try {
    const student = await Student.findById(id)
    if(!student) {
        throw (createError (404, "student does not exist"))
    }
    res.send(student)
}catch (error) {
    console.log(error.message);
    if(error instanceof mongoose.CastError){
        next(createError(400,"Invalid student ID"));
        return;
    }
    next(error)
}

},




    // Getting all data FROM the DB

    getAllstudents: async (req,res,next)=>{
        
        try{

            Student.find({}).then((student)=>{
                res.send(student)
            });

        } catch(error) {
            console.log(error.message);

        }

    },

    // Updating data FROM  the DB

    updateStudent:async(req,res,next)=> {
        try{
            const id = req.params.id;
            const update = req.body;
            const options ={new: true}
            const result = await Student.findByIdAndUpdate(id,update,options)

            if(!result){
                throw (createError(404, "student does not exist"))
            }

             res.send(result);
        }catch(error){
    
            console.log(error.message)
            if(error instanceof mongoose.CastError){
                return next(createError(400, "Invalid student id"));
            }
        }
        next(error);
    },

// deleting data FROM  the DB

    /*deleteStudent:async(req,res,next)=> {
        try{
            const id = req.params.id;
            const update= req.body;
            const options ={new: true}
            const result = await Student.findByIdAndDelete(id,update,options)

             res.send(result);
        }catch(error){
    
            console.log(error.message);
        }
    }*/


        deleteStudent : async (req,res,next) => {
            const id = req.params.id
            try{
                const student = await Student.FindByIdAndRemove(id)
                if(!student){
                    throw (createError(404,"student does not exist"))
                   
                } 
                res.send(student);
            }catch(error){
                    console.log(error.message)
                    if(error instanceof mongoose.CastError){
                        next(createError (400, "Invalid student Id"));
                        return;
                }
            }
        }
    
}