const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newSchema = new Schema({
    fullName:{
        type:String,
        required : "This field is required."
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    city:{
       type:String
    }
})

//mongoose.model('Employees',newSchema)


const thisSchema = mongoose.model('Employee',newSchema)
module.exports = thisSchema