import { useContext } from "react";
import Left from "./Left";
import { Contextapi } from "./Contextapi";
import { useNavigate } from "react-router-dom";

function Adminpanel() {
    const{username}=useContext(Contextapi)
    let navigate=useNavigate()
if(!username){
navigate('/login')
}else{
    return ( 
        <section id="mid">
            <div className="container">
                <div className="row">
                    <Left/>
                    <div className="col-md-9">mid</div>

                </div>
            </div>
        </section>
     );
}
  
}

export default Adminpanel;