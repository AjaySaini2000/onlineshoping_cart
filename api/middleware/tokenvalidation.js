const jwt=require('jsonwebtoken')
require('dotenv').config()

function tokenvalidation(req,res,next){
const authToken=req.headers['authorization']
if(authToken){
    const token=authToken.split('Bearer ')[1]
jwt.verify(token,process.env.KEY,(error,response)=>{
    if(error===null){
        next()
    }else{
        res.status(400).json({
            status:400,
            message:"Token not verified"
        })
    }
    
})

}else{
res.status(400).json({
status:400,
message:"You are not authorized to this data"
})
}

}

module.exports=tokenvalidation