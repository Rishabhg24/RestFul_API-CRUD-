const express = require("express");
require("./db/conn");
const Student = require("./models/students");
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());

//app.post("/students" ,(req,res)=>{
    //console.log(req.body);
    //const user = new Student(req.body);

   // user.save().then(()=>{
     //   res.status(201).send(user);
    //}).catch((e)=>{
      //  res.status(400).send(e);
    //})
//})

// CREATE API
app.post("/students",async(req,res)=>{
    try{ const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }catch(e){ res.status(400).send(e);}
   
})

// READ API 1
 app.get("/students", async(req,res)=>{
    try{
        const studentsData = await Student.find();
        res.send(studentsData);
    }catch(e){
        res.send(e);
    }
 })

 // READ API 2
  app.get("/students/:id",async(req,res)=>{
    try{
      const _id = req.params.id;
      const studentData = await Student.findById(_id);
         if(!studentData){
            return res.status(404).send();
        }else{
            res.send(studentData);
        }
    }catch(e){
      res.status(500).send(e);
    }
    })

    // UPDATE API
app.patch("/students/:id" ,async (req,res)=>{
  try{
     const _id = req.params.id;
     const updateStudents = await Student.findByIdAndUpdate(_id, req.body ,{
      new : true
     });
     res.send(updateStudents);
  }catch(e){
      res.status(404).send(e);
  }
})
   
// DELETE API
app.delete("/students/:id", async(req,res)=>{
 try{
       const id = req.params.id;
     const deleteStudent = await Student.findByIdAndDelete(id);
     if(!id){
     return res.status(400).send();
     }
     res.send(deleteStudent);
 }catch(e){
      res.status(500).send(e);
 } 
})
app.listen(port ,()=>{
    console.log(`connection is setup at ${port}`)
})