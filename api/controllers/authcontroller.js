const authTable=require('../models/auth')

const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()




exports.createAccount=async(req,res)=>{
    try{
    const{email,password}=req.body
    let data=await authTable.findOne({Email:email})
   if(data!=null){
    throw new Error("Email is already exists")
   }
  const convertpassword=await bcrypt.hash(password,10)
 
    const newAuth=new authTable({Email:email,password:convertpassword})
    newAuth.save()
    res.status(201).json({
        status:201,
        message:"New user successfully inserted"

    })
    }catch(error){
        res.status(400).json({
            status:400,
            message:error.message
        })
    }
}
exports.logincheck=async(req,res)=>{
    // console.log(req.body)
    try{
    const{email,password}=req.body
    const data=await authTable.findOne({Email:email})
    if(data!=null){
        const checkpass=await bcrypt.compare(password,data.password)
       if(checkpass){
        let payload={username:email}
        const token=jwt.sign(payload,process.env.KEY)
        // console.log(token)
        res.status(200).json({
            status:200,
            username:email,
            token:token,
            role:data.role
        })

       }else{
        throw new Error("Wrong password")

       }

    }else{
        throw new Error("email not ragistered")

    }
}catch(error){
    res.status(400).json({
        status:400,
        message:error.message
    })
}
}