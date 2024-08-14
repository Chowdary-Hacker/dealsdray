const express = require("express");
const server = express();
const cors = require("cors")
server.use(cors());
const { v4: uuidv4 } = require('uuid');
server.use(express.json());   
const multer = require('multer'); 
const fs = require('fs'); 
const path = require('path');

const port = 3333;
server.listen(port, () => {
    console.log("Server listening..");
});
const mongoose = require('mongoose');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = 'uploads/';
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });
  server.use('/uploads', express.static('uploads'));

  mongoose.connect('mongodb://localhost:27017/mydata', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const employeeSchema = new mongoose.Schema({
    uniqueId: { type: String, required: true, unique: true, default: uuidv4 },
    image: String,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    designation: { type: String, required: true },
    gender: { type: String, required: true },
    course: [String],
    createDate: { type: Date, default: Date.now },
  });
  
  const Employee = mongoose.model('Employee', employeeSchema);
  
  server.post('/api/employees', upload.single('image'), async (req, res) => {
    try {
      const employeeData = req.body;
      if (req.file) {
        employeeData.image = req.file.path.replace(/\\/g, '/');
      }
      const employee = new Employee(employeeData);
      await employee.save();
      res.status(201).send(employee);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
let arr=[{Name:"Mohan",Username:"admin",Email:"vaddemsai@gmail.com",Password:"admin"},];

server.get('/adminInfo/:username/:password', (req,res)=>{
    let record = req.params.username ;
    let pass = req.params.password;
    try{
           let find = arr.filter(obj => obj['Username']===record && obj['Password']===pass);
           if(find.length>0){res.status(200).json(find[0]);}
           else{res.status(222).json(record);}
          
   }
    catch(e){
          console.log(e);
    }
});

server.get('/emplist', async(req,res)=>{
    try{
        let EmployeeList = await  Employee.find();
        res.status(200).json(EmployeeList);}catch(e){res.status(200).json()}
          
   });

   server.put('/api/employees/:id', upload.single('image'), async (req, res) => {
    try {
      let employeeData = req.body;
  
      if (req.file) {
        const normalizedPath = req.file.path.replace(/\\/g, '/');
        employeeData.image = normalizedPath;
      }
  
      const updatedEmployee = await Employee.findOneAndUpdate(
        { uniqueId: req.params.id },
        employeeData,
        { new: true }
      );
  
      if (!updatedEmployee) {
        return res.status(404).send('Employee not found');
      }
  
      res.send(updatedEmployee);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  server.get('/api/employees/:id', async (req, res) => {
    try {
      const employee = await Employee.findOne({ uniqueId: req.params.id });
      if (!employee) {
        return res.status(404).send('Employee not found');
      }
      res.send(employee);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  server.delete('/api/employees/:uniqueId', async (req, res) => {
    try {
      const deletedEmployee = await Employee.findOneAndDelete({ uniqueId: req.params.uniqueId });
  
      if (!deletedEmployee) {
        return res.status(404).send('Employee not found');
      }
  
      res.send({ message: 'Employee deleted successfully', employee: deletedEmployee });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  