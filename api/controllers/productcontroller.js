const productTable=require('../models/products')
const categoryTable=require('../models/category')
const userOrderTable=require('../models/usercarts')


exports.addproduct=(req,res)=>{
    try{
    const{name,desc,price,qty,category}=req.body
    // console.log(req.files)
    const file=req.files
    var image1=file.image[0].filename
    var image2=file.image2[0].filename
    var image3=file.image3[0].filename

    if(file){
    var newProduct=new productTable({Name:name,Desc:desc,Price:price,qty:qty,Category:category,
        Images:{Image1:image1, Image2:image2, Image3:image3}})

        // console.log(newProduct)
    newProduct.save()
    res.status(201).json({
        status:201,
        message:'new product successfully Lounched'
    })
    }else{
        throw new Error("please choose a file should not be blank")
    }
    
    }catch(error){
        res.status(400).json({
            message:error.message,
            status:400
        })
       
    }
}
exports.allproduct=async(req,res)=>{
    try{
   const productdata=await productTable.find()
   
if(productdata.length>0){
    res.status(200).json({
        status:200,
        message:"All Lounched products",
        apidata:productdata
    })
}else{
    throw new Error("Data Not Found")
}

    }catch(error){
        res.status(400).json({
            status:400,
            message:error.message
        })
    }
   
}
exports.addcategory=(req,res)=>{
    try{
    const{category}=req.body
    const newCategory=new categoryTable({Category:category})
    newCategory.save()
    res.status(201).json({
        status:201,
        message:"New category Added"
    })

    }catch(error){
res.status(400).json({
    status:400,
    message:error.message
})
    }
}

exports.allcategory=async(req,res)=>{
    try{
   const categorydata= await categoryTable.find()
   if(categorydata.length>0){
    res.status(200).json({
        status:200,
        apidata:categorydata
    })
   }else{
    throw new Error("Data not found")
   }
}catch(error){
    res.status(400).json({
        status:400,
        message:error.message
    })
}
}

exports.deleteproduct=async(req,res)=>{
   const id=req.params.id
    await productTable.findByIdAndDelete(id)
    res.status(200).json({
        status:200,
        message:"product deleted"
    })
    
}

exports.singleproduct=async(req,res)=>{
    const id=req.params.id

        const singledata=await productTable.findById(id)
        res.status(200).json({
            status:200,
            apidata:singledata
        })

  }

  exports.update=async(req,res)=>{
    try{
    const id=req.params.id
        const{name,desc,price,category,status}=req.body
        let a=Object.keys(req.files)
       
    if(a.length!==0){
        if(req.files.image && req.files.image2 && req.files.image3){
            var file1=req.files.image[0].filename
            var file2=req.files.image2[0].filename
            var file3=req.files.image3[0].filename
            await productTable.findByIdAndUpdate(id,{Name:name,Desc:desc,Price:price,Category:category,Status:status,
                Images:{Image1:file1,Image2:file2,Image3:file3}})
    }
   
        

            
    
    res.json({
        status:200,
        message:"products successfully updated"
    })
} else{
    await productTable.findByIdAndUpdate(id,{Name:name,Desc:desc,Price:price,Category:category,Status:status})
    res.json({
        status:200,
        message:"products successfully updated"
    })
}
    }catch(error){
        res.status(400).json({
            status:400,
            message:error.message
        })
        
    }
   
  }

  exports.productinstock=async(req,res)=>{
    try{
  const instockdata=await productTable.find({Status:"In-Stock"})

  if(instockdata.length==0){
    throw new Error("Data Not Found")
  }
  res.status(200).json({
    status:200,
    apidata:instockdata
  })
    }catch(error){
        res.status(400).json({
            status:400,
            message:error.message

        })
    }

  }
  exports.usercart=async(req,res)=>{
    try{
    const{ids}=req.body 
    let cartproduct=await productTable.find({_id:{$in:ids}})
    res.status(200).json({
        status:200,
        apidata:cartproduct
    })
    }catch(error){
        res.status(400).json({
            status:400,
            message:error.message
        })
     

    }
   }
   exports.usercartproducts=async(req,res)=>{
    try{
    const{cart,username}=req.body
    
    const keys=(Object.keys(cart.items))
   const data= await productTable.find({_id:{$in:keys}})
   
   data.forEach((value)=>{
   let qty=cart.items[value._id]
   
    const orderData=new userOrderTable({name:value.Name,desc:value.Desc,price:(value.Price)*qty,images:{image1:value.Images.Image1,image2:value.Images.Image2,image3:value.Images.Image3},quantity:qty,username:username})
    orderData.save()
   
   }) 
   res.status(201).json({
    status:201,
    message:"insert your orders"
   })
}catch(error){
res.json({
    status:400,
    message:error.message
})
}
  }
  exports.myorders=async(req,res)=>{
    try{
        const username=req.body
        
  const myorderdata= await userOrderTable.find({status:"purchase"})

if(myorderdata.length==0){
    throw new Error("empty your orders")
}
res.status(200).json({
    status:200,
    message:"your orders",
    apidata:myorderdata
})
    }catch(error){
res.status(400).json({
    status:400,
    message:error.message
})
    }
  }

  exports.cancelorder=async(req,res)=>{
    try{
    const id=req.params.id
    await userOrderTable.findByIdAndUpdate(id,{status:"cancel"})
    res.status(200).json({
        status:200,
        message:"your order canceled"
    })
    }catch(error){
        res.status(400).json({
            status:400,
            message:error.message
        })
    }

  }

  exports.moredetail=async(req,res)=>{
    try{
    const id=req.params.id
    const product=await productTable.findById(id)
    res.status(200).json({
        status:200,
        apidata:product
    })
    }catch(error){
        res.status(400).json({
        status:400,
        message:error.message
        })
    }

  }