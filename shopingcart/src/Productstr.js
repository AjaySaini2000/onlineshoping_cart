import { useContext } from "react";
import { Link } from "react-router-dom"
import { Contextapi } from "./Contextapi";
function Productstr(props) {
    let{products,mess }=props
    const{cart,setCart ,}=useContext(Contextapi)



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


   
    return (
        <section id='product'>
            <div className="container">
                <div className="row">
                   {products.map((value,key)=>(
                        <div className="col-md-3 col-sm-6 " key={value._id}>
                        <div className="card" >
                            <div className="card-img">
                            <img src={`uploads/${value.Images.Image1}`} style={{width:"9rem"}} className="card-img-top d-flex mx-auto img-fluid" alt="Image not found" />
                            </div>
                            <div className="card-body">
                                <div className="card-title-box">
                                <h5 className="card-title">{value.Name}</h5>
                                </div>
                                <div className="card-body-desc">
                                <p className="card-text">{value.Desc}</p>
                                </div>
                                <span><i className="bi bi-currency-rupee"></i>{value.Price}</span>
                            </div>

                            <div className="card-body">
                                <button onClick={(e)=>{addcart(e,value._id,value.qty)}} className="btn btn-outline-success me-2">Add Cart</button>
                                <Link to={`/moredetail/${value._id}`}>More details..</Link>
                            </div>
                        </div>
                    </div>
                    ))}
                    


                </div>
            </div>
        </section>
    );
}

export default Productstr;