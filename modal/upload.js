var mongoose = require('mongoose')
const db = require("../db/db").mongoURL
mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{ 
    console.log('database is connected')
})
.catch((error)=>{
    console.log(error)
})
var uploadSchema = new mongoose.Schema({
    email : {
        type : String
    },
    file : {
         type : String
    },
    skill:[{
            title:{
                type:String
            }
        }]
    
})

const thisSchema = mongoose.model('upload',uploadSchema)
module.exports = thisSchema