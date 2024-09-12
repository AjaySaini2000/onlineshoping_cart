const mongoose=require('mongoose')


const userOrderSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
        
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    images:{
        image1:{
        type:String,
        // required:true
        },
        image2:{
            type:String,
            // required:true
        },
        image3:{
            type:String,
            // required:true
        }
    },
    quantity:{
        type:Number,

    },
    status:{
        type:String,
        default:"purchase"
    },
    username:{
        type:String,

    },
    checkoutDate:{
        type:Date,
        default:new Date()
    }
})


module.exports=mongoose.model('userorder',userOrderSchema)