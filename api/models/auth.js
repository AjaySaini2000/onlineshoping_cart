const mongoose=require('mongoose')


const authSchema=mongoose.Schema({
    Email:{
        type:String,
        required:true,
        //unique:true
    },
    password:{
        type:String,
        required:true
    },
    postedDate:{
        type:Date,
        default:new Date()
    },
    role:{
        type:String,
        default:'User'
    }
})


module.exports=mongoose.model('authdata',authSchema)