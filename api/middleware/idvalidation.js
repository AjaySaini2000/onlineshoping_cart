const mongoose=require('mongoose')
const productTable=require('../models/products')


async function handleid(req,res,next){
    try{
      const id=req.params.id
      if(!mongoose.Types.ObjectId.isValid(id)){
          throw new Error("Invalid Id")
      }
      const idcheck=await productTable.find({_id:id})
      if(idcheck.length==0){
          throw new Error("Invalid Id")
      }
      next()
  }catch(error){
    res.status(400).json({
        status:400,
        message:error.message
    })
}
}

module.exports=handleid