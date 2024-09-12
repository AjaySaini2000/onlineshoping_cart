const express=require('express')
const app=express()
require('dotenv').config()
require('./helpers/dbconfig')
const authRouter=require('./routers/auth')
const productRouter=require('./routers/product')

app.use(express.json())
const morgan=require('morgan')

app.use(morgan('dev'))
app.use('/auth',authRouter)
app.use('/auth',productRouter)

app.listen(process.env.PORT||8000,()=>{console.log(`server running on port ${process.env.PORT}`)})