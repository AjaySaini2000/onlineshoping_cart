import { useContext, useEffect, useState } from "react";
import { Contextapi } from "./Contextapi";
import { useNavigate } from "react-router-dom";

function Cart() {
    let totalamount=0
    const{cart,setCart,username}=useContext(Contextapi)
    const[cartproductdata,setCartproductdata]=useState([])
    let navigate=useNavigate()
    
    useEffect(()=>{
        if(cart.items==null){
            return
        }
        fetch('/auth/usercarts',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({ids:Object.keys(cart.items)})
        }).then((response)=>{return response.json()}).then((data)=>{
            if(data.status===200){
                setCartproductdata(data.apidata)
            }else{
                console.log(data.message)
            }
        })
    },[])

    function handleqty(id){
        let qty=cart.items[id]
        return qty
    }
    function handleprice(id,price){
        let pprice=handleqty(id)*price
        totalamount +=pprice
        return pprice
    }
   function handleinc(e,id,qty){
    let currentqty=handleqty(id)
if(currentqty===qty){
    alert("you have reched max quanity of this product")
    return
}
    let _cart={...cart}
    _cart.items[id]+=1
    _cart.totalitems +=1
    setCart(_cart)
   }
   function handledec(e,id,qty){
    let currentqty=handleqty(id)
if(currentqty===1){
    alert("you have atleast one product in the cart")
    return
}
    let _cart={...cart}
    _cart.items[id]-=1
    _cart.totalitems -=1
    setCart(_cart)
   }
function handledelete(e,id){
    let currentqty=handleqty(id)
    let _cart={...cart}
    delete _cart.items[id]
    _cart.totalitems-=currentqty
    setCart(_cart)
    let newdata=cartproductdata.filter((value)=>{
       return value._id!==id
        
    })
    setCartproductdata(newdata)

}
    function handlecheckout(e){
        let data={cart,username}
        fetch('/auth/usercartproducts',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        
        }).then((response)=>{return response.json()}).then((data)=>{
            if(data.status===201){
                setCart('')
                alert(data.message)
            }
        })
    }
   
        if(!cart.items){
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <img src='/emptycart2.avif' className="d-flex mx-auto" alt='empty cart'/>
                        </div>
                    </div>
                </div>
            );
        }else{
        return ( 
            <section id="cart">
    <div className="container">
        <div className="row">
            <div className="col-md-12">
            <h2>Your Added Carts</h2>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>product name</th>
                        <th>Image</th>
                        <th>quantity</th>
                        <th>Price</th>
                        <th>Delete</th>
    
                    </tr>
                </thead>
                <tbody> 
                    {cartproductdata.map((value,key)=>(
                        <tr key={value._id}>
                            <td>{key+1}</td>
                            <td>{value.Name}</td>
                            <td><img src={`uploads/${value.Images.Image1}`} style={{width:"10rem"}}/></td>
                            <td><button onClick={(e)=>{handleinc(e,value._id,value.qty)}}>+</button>{handleqty(value._id)}<button onClick={(e)=>{handledec(e,value._id,value.qty)}}>-</button></td>
                            <td>{handleprice(value._id,value.Price)}</td>
                            <td><button onClick={(e)=>{handledelete(e,value._id)}}>Delete</button></td>
            
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={4}><h4>Amount:</h4></td>
                        <td colSpan={2}>{totalamount}</td>
                    </tr>
                    <tr><td colSpan={6}><button onClick={(e)=>{handlecheckout(e)}} className="btn btn-primary form-control">Check Out</button></td></tr>
                
               
                </tbody>
               
            </table>
            </div>
        </div>
    </div>
            </section>
           
         );
                    }
    }
  


export default Cart;