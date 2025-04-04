const multer=require('multer')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'../shopingcart/public/uploads')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})


const upload=multer({
    storage:storage,
    limits:{fieldsize:4*1024*1024}
})

module.exports=upload