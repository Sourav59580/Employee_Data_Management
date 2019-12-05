const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');


const app = express();
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(bodyParser.json());
//port connection
app.listen(3000,(req,res)=>{
    console.log("server is running at port 3000");
})

//configure database
const db = require('./db/db').mongoURL
mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{ 
    console.log('database is connected')
})
.catch((error)=>{
    console.log(error)
})

//create user collection
const User = require('./modal/employee')


//routing pages
app.get("/",(req,res)=>{
    var data = User.find({})
    data.exec((err,data)=>{
        if(err) throw err;
        res.render('home',{record : data});
    })  
 })
app.get("/service",(req,res)=>{
    res.render('service');
})
app.get("/profile",(req,res)=>{
    let file = ''
    Upload.find({},function(err,data){
        if(err) throw err;
        res.render('profile',{record : data,file:file});
    }) 
})
app.post("/employee",(req,res)=>{
    console.log(req.body);
    const newUser = new User({
        fullName : req.body.fullName,
        email : req.body.email,
        mobile : req.body.mobile,
        city : req.body.city
    })
    newUser.save()
     .then((user)=>{
        res.render("home");  
       })
     .catch((error)=>{        
        console.log(error)
     })
     
    }) 




// app.get('/',(res,req)=>{
    

// })
//photo upload using multer
var Upload = require('./modal/upload.js')
var storage = multer.diskStorage({
    destination:"./public/images/",
    filename : (req,file,cb)=>{
        cb(null,Date.now()+file.originalname);
    }
})

var upload = multer({
    storage:storage
}).single('file');


app.post('/upload',upload,(req,res,next)=>{
    var email = req.body.email;
    var file_name = req.file.filename;
 const newUpload = new Upload({
    email :email,
    file : file_name
 })
newUpload.save()
.then((file)=>{
 console.log(file);
 res.render('profile',{file})
})
.catch((err)=>{
    console.log(err);
})
    
})

app.post('/abc',(req,res)=>{
 var p_id = req.body.previous_id;
 var P_name = req.body.previous_name;
 var p_email = req.body.previous_email;
 var p_mobile  = req.body.previous_mobile;
 var p_city = req.body.previous_city;

 var c_name = req.body.c_name;
 var c_email = req.body.c_email;
 var c_mobile  = req.body.c_mobile;
 var c_city = req.body.c_city;
User.findByIdAndUpdate(p_id,
    {$set:{ fullName : c_name ,email :  c_email,mobile : c_mobile,city : c_city}},{new:true})
    .then((user)=>{
        console.log(user);
        res.send({success:true});
    
    })
    .catch((err)=>{
        console.log(err);
    })


})

app.post("/delete",(req,res)=>{
var id = req.body.id;
User.findByIdAndDelete(id)
.then((user)=>{
res.send({key : success})
})
.catch((err)=>{
    console.log(err);
})
})














// app.post('/user',(req, res)=>{

//     const newUser = new User({
//         name:"",
//         username:"1234e"
//     })
//     newUser.save()
//     .then((user)=>{
//         console.log(user)
//     })
//     .catch((error)=>{
//         console.log(error)
//     })
// })

