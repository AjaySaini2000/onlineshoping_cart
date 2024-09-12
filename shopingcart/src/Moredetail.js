import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Contextapi } from "./Contextapi";

function Moredetail() {
    const[img1,setImg1]=useState('')
    const[img2,setImg2]=useState('')
    const[img3,setImg3]=useState('')
    const[fullimg,setFullimg]=useState('')

    const[more,setMore]=useState('')
    const[mess,setMess]=useState('')
    let{cart,setCart}=useContext(Contextapi)
    function addcart(e,id,qty){
        let _cart={...cart}
        if(!_cart.items){
          _cart.items={}
      }
      if(_cart.items[id]>qty){
          alert("you have reched max quantity")
          return
        }
     if(!_cart.items[id]){
      _cart.items[id]=1
     } 
    else {
      _cart.items[id] +=1        
     }
    
    
    if(!_cart.totalitems){
      _cart.totalitems =1
    }
    else{
      _cart.totalitems +=1
    }
    setCart(_cart)
    localStorage.setItem('cart',JSON.stringify(_cart))
      }

    const{id}=useParams()
    useEffect(()=>{
        fetch(`/auth/moredetail/${id}`).then((response)=>{return response.json()}).then((data)=>{
            if(data.status===200){
                
                setImg1(data.apidata.Images.Image1)
                setImg2(data.apidata.Images.Image2)
                setImg3(data.apidata.Images.Image3)
                setFullimg(data.apidata.Images.Image1)

               setMore(data.apidata)

                

            }else{
                setMess(data.message)
            }
            })
    },[])
       
   function handleImg(e,img){
    setFullimg(img)
   }
   
    return ( 
        <>
        <section id="moredetail">
            <div className="container">
                <div className="row">
                
                <div className="col-md-12">
            
                <div className="img-box sm-mx-auto">
                <img src={`/uploads/${fullimg}`}  className=" d-flex mx-auto img-fluid"/>
                <div className="img-change-box mx-auto">
                <img src={`/uploads/${img2}`} onClick={(e)=>{handleImg(e,img2)}} className="mt-4 me-2 img-fluid" style={{width:"60px"}}/>
                <img src={`/uploads/${img3}`} onClick={(e)=>{handleImg(e,img3)}} className="mt-4 me-2 img-fluid" style={{width:"60px"}}/>
                <img src={`/uploads/${img1}`} onClick={(e)=>{handleImg(e,img1)}} className="mt-4 me-2 img-fluid" style={{width:"60px"}}/>

                </div>
                </div>
                
                <h3 className="mt-md-3 ">{more.Name}</h3>
                <strong>Description:</strong><p>{more.Desc}</p>
                <strong>Price:</strong><p className="d-inline-block ms-2">{more.Price}</p>
                <button onClick={(e)=>{addcart(e,more._id,more.qty)}} className="btn btn-outline-success me-2 ms-3">Add Cart</button>

                </div>
                </div>
            </div>
        </section>
        
        </>
     );
}

export default Moredetail;