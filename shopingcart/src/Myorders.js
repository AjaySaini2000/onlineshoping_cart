import { useContext,useEffect, useState } from "react";
import { Contextapi } from "./Contextapi"
import { useNavigate } from "react-router-dom";

function Myorders() {
let navigate=useNavigate()
const[myorder,setMyorder]=useState([])
const[mess,setMess]=useState('')
const{username}=useContext(Contextapi)
useEffect(()=>{
    let token=localStorage.getItem('token')
const user={username}

    fetch(`/auth/myorders`,{
        method:"POST",
        headers:{"Content-Type":"application/json","Authorization":`Bearer ${token}`},
        body:JSON.stringify(user)
    }).then((response)=>{return response.json()}).then((data)=>{
        if(data.status===200){
            setMyorder(data.apidata)
        }else{
            setMess(data.message)
        }
    })
},[])

    function handleCancel(e,id){
        fetch(`/auth/ordercancel/${id}`).then((response)=>{return response.json()}).then((data)=>{
            if(data.status===200){
                let newdata=myorder.filter((value)=>{
                    return value._id!=id
                })
                setMyorder(newdata)
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
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>My orders</h2>
                        <p>{mess}</p>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>s.no.</th>
                                    <th>name</th>
                                    <th>image</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>price</th>
                                    <th>Cancel</th>


                                </tr>
                            </thead>
                            <tbody>
                                {myorder.map((value,key)=>(
                                     <tr key={value._id}>
                                     <td>{key+1}</td>
                                     <td>{value.name}</td>
                                     <td><img src={`/uploads/${value.images.image1}`} style={{width:"10rem"}} alt="image not found"/></td>
                                     <td>{value.desc}</td>
                                     <td>{value.quantity}</td>
                                     <td>{value.price}</td>
                                  <td><button onClick={(e)=>{handleCancel(e,value._id)}}>Cancel</button></td>

 
                                 </tr>
                                ))}
                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
     );
}
  
}

export default Myorders;