const mongoose=require('mongoose')


const categorySchema=mongoose.Schema({
    Category:{
        type:String,
        required:true,
        //unique:true
    }
    
})


module.exports=mongoose.model('category',categorySchema)