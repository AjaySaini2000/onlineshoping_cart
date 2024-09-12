import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
function Account() {
    let navigate=useNavigate()
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[mess,setMess]=useState('')
    function handleform(e){
        e.preventDefault()
       if(email==''){
        setMess("Email should not be blank")
       }else if(password==''){
        setMess("password should not be blank")
       }else{
        const fdata={email,password}
        fetch('/auth/account',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(fdata)
        }).then((response)=>{return response.json()}).then((data)=>{
            if(data.status===201){
                setMess(data.message)
                navigate('/login')

            }else{
                setMess(data.message)
            }
        })
       }
        
        }
    return ( 
        <section id='signup'>
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h2>Create Account Here</h2>
                        <p>{mess}</p>
                        <form onSubmit={(e)=>{handleform(e)}}>        
                            <label className="form-label">Email</label>
                            <input type="text" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                            <button type="submit" className="btn btn-success form-control mt-2">Sign Up</button>
                        </form>
                    </div>
                    <div className="col-md-3"></div>


                </div>
            </div>
        </section>
     );
}

export default Account;