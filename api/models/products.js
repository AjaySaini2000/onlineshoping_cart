const mongoose=require('mongoose')


const productSchema=mongoose.Schema({
    Name:{
        type:String,
        required:true
        
    },
    Desc:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        default:'In-Stock'
    },
    Images:{
        Image1:{
        type:String,
        // required:true
        },
        Image2:{
            type:String,
            // required:true
        },
        Image3:{
            type:String,
            // required:true
        }
    },
    LounchDate:{
        type:Date,
        default:new Date()
    }
})


module.exports=mongoose.model('product',productSchema)