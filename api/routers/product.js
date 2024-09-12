const router=require('express').Router()
const authc=require('../controllers/authcontroller')
const productc=require('../controllers/productcontroller')
const upload=require('../helpers/multerconfig')
const handleid=require('../middleware/idvalidation')
const tokenvalidation=require('../middleware/tokenvalidation')





router.post('/addproduct',upload.fields([{
    name: 'image', maxCount: 1
  }, {
    name: 'image2', maxCount: 1
  },{
    name: 'image3', maxCount: 1
  }]),productc.addproduct)
router.post('/addcategory',productc.addcategory)
router.get('/allcategory',productc.allcategory)

router.get('/allproducts',productc.allproduct)
router.delete('/deleteproduct/:id',handleid,productc.deleteproduct)
router.get('/singleproduct/:id',handleid,productc.singleproduct)
router.put('/updateproduct/:id',handleid,upload.fields([{
  name: 'image', maxCount: 1
}, {
  name: 'image2', maxCount: 1
},{
  name: 'image3', maxCount: 1
}]),productc.update)
router.get('/productinstock',productc.productinstock)
router.post('/usercarts',productc.usercart)
router.post('/usercartproducts',productc.usercartproducts)
router.post('/myorders',tokenvalidation,productc.myorders)
router.get('/ordercancel/:id',productc.cancelorder)
router.get('/moredetail/:id',productc.moredetail)

module.exports=router