const mongoose=require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL).then(()=>{console.log("connected to DB")}).catch((error)=>{
    console.log(error.message)
})


module.exports=mongoose