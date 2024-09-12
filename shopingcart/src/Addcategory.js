import { useContext, useState } from "react";
import Left from "./Left";
import { Contextapi } from "./Contextapi";
import { useNavigate } from "react-router-dom";

function Addcategory() {
    const[category,setCategory]=useState('')
    const [mess, setMess] = useState('')
    const{username}=useContext(Contextapi)
    let navigate=useNavigate()

     function handleform(e){
        e.preventDefault()
        const fdata={category}
        fetch('/auth/addcategory',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(fdata)
        }).then((response)=>{return response.json()}).then((data)=>{
            if(data.status===201){
                setMess(data.message)
            }else{
                setMess(data.message)
            }
        })
     }
     if(!username){
        navigate('/login')
     }else{
        return ( 
            <section id="mid">
                <div className="container">
                    <div className="row">
                        <Left/>
                        <div className="col-md-9">
                            <h2> Add Category Here</h2>
                            <p>{mess}</p>
                           <form onSubmit={(e)=>{handleform(e)}}>
                            <label className="form-label">Category Name</label>
                            <input type="text" className="form-control" value={category} 
                            onChange={(e)=>{setCategory(e.target.value)}}/>
                            <button type="submit" className="btn btn-success form-control mt-2">Add</button>
                           </form>
                            </div>
    
                    </div>
                </div>
            </section>
         );
     }
       
     
}

export default Addcategory;