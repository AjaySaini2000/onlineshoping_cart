import { Link,useNavigate } from "react-router-dom";
import Left from "./Left";
import { useContext, useEffect, useState } from "react";
import { Contextapi } from "./Contextapi";

function Productmanage() {
    const [allproduct, setAllproduct] = useState([])
    const [mess, setMess] = useState('')
const{username}=useContext(Contextapi)

let navigate=useNavigate()


    useEffect(() => {
        fetch('/auth/allproducts').then((result) => { return result.json() }).then((data) => {
            // console.log(data.apidata)
            if(data.status===200){
                setAllproduct(data.apidata)
                
                setMess(data.message)

            }else{
                setMess(data.message)
            }
            

        })
        

    }, [])
    
    function handleDelete(e,id){
        // alert(id)
        fetch(`/auth/deleteproduct/${id}`,{
            method:"DELETE"
        }).then((response)=>{return response.json()}).then((data)=>{
           if(data.status===200){
            let newdata=allproduct.filter((value)=>{
                return value._id!==id
            })
            setAllproduct(newdata)
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
                    <Left />
                    <div className="col-md-9">
                        <h2>Project management</h2>
                        <p>{mess}</p>
                        
                        <Link to='/addproduct'><button className="btn btn-primary">Add New Product</button></Link>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>S no.</th>
                                    
                                    <th>Product Name</th>
                                    <th>Product Desc</th>
                                    <th>Product Image</th>
                                    <th>Product Image2</th>
                                    <th>Product Image3</th>

                                    <th>Product Price</th>
                                    <th>Product Quantity</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Update</th>
                                    <th>Delete</th>


                                </tr>
                            </thead>
                            <tbody>
                            {allproduct.map((value,key)=>(
                                <tr key={value._id}>
                                     <td>{key+1}</td>
                                   
                                    <td>{value.Name}</td>
                                    <td>{value.Desc}</td>
                                    <td><img src={`/uploads/${value.Images.Image1}`} style={{width:"100px"}}/></td>
                                    <td><img src={`/uploads/${value.Images.Image2}`} style={{width:"100px"}}/></td>
                                    <td><img src={`/uploads/${value.Images.Image3}`} style={{width:"100px"}}/></td>

                                    <td>{value.Price}</td>
                                    <td>{value.qty}</td>
                                    <td>{value.Category}</td>
                                    <td>{value.Status}</td>
                                    <td><Link to={`/updateproduct/${value._id}`}><button>Update</button></Link></td>
                                    <td><button onClick={(e)=>{handleDelete(e,value._id)}}>Delete</button></td>

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

export default Productmanage;