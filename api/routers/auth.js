const router=require('express').Router()
const authc=require('../controllers/authcontroller')
const productc=require('../controllers/productcontroller')

router.post('/account',authc.createAccount)
router.post('/login',authc.logincheck)



module.exports=router