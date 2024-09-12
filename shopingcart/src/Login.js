import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Contextapi } from "./Contextapi";


function Login() {

    

    let navigate=useNavigate()
const{username,setUsername}=useContext(Contextapi)
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')
const[mess,setMess]=useState('')
useEffect(()=>{
    if(username){
        if(username==='admin@gmail.com'){
            navigate('/admindashboard')
        }else{
            navigate('/products')
        }
       
        
    }
},[])

function handleform(e){
e.preventDefault()
const fdata={email,password}
if(email==''){
setMess("Email should not be blank")
}else if(password==''){
    setMess("password should not be blank")
}else{
fetch('/auth/login',{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(fdata)
}).then((response)=>{return response.json()}).then((data)=>{
    if(data.status==200){
        
        localStorage.setItem('username',data.username)
        setUsername(localStorage.getItem('username'))
        localStorage.setItem('token',data.token)
        if(data.role=='Admin'){
            navigate('/admindashboard')
        }else{
            navigate('/products')
        }
    }else{
        setMess(data.message)
    }
})
}
}



    return ( 
        <section id="login">
        <div className="container">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                <h2>Login here!!</h2>
                <p>{mess}</p>
        <form onSubmit={(e)=>{handleform(e)}}>
            <label className="form-label">Username</label>
            <input type="text" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <button type="submit" className="btn btn-primary form-control mt-2">Login</button>
        </form>
        <hr></hr>
        <Link to='/account'>Create Account</Link>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
       
        </section>
     );
}


export default Login;