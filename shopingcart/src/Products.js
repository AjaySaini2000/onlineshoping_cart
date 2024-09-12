import { useContext, useEffect, useState } from "react";
import Productstr from "./Productstr";
import { Contextapi } from "./Contextapi";
import { useNavigate } from "react-router-dom";

function Products() {
  
    const[instockproduct,setInstockproduct]=useState([])
    const[mess,setMess]=useState('')
    const{username}=useContext(Contextapi)
    let navigate=useNavigate()
    

    useEffect(()=>{
        fetch('/auth/productinstock').then((response)=>{return response.json()}).then((data)=>{
           
            if(data.status==200){
                setInstockproduct(data.apidata)
            }else{
                setMess(data.message)
            }
        })
    },[])
if(!username){
    navigate('/login')
}else{
    return ( 
        <>
        
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="./pexels-wdnet-230544.jpg" className="d-block w-100" alt="..."/>
     
    </div>
    <div className="carousel-item">
      <img src="./pexels-canvy-mockups-56805-205316.jpg" className="d-block w-100" alt="..."/>
     
    </div>
    <div className="carousel-item">
      <img src="./pexels-cottonbro-5077393.jpg" className="d-block w-100" alt="..."/>
      
    </div>
  </div> 
</div>
        <Productstr products={instockproduct} mess={mess} />
        </>
      );
}
    
}

export default Products;