import { Link } from "react-router-dom";

function Left() {
    return ( 
        
        <div className="col-md-3">
            
           <Link to='/productmanage'><button className="btn btn-primary mt-2 form-control">product management</button></Link> 
           <Link to='/categorymanage'><button className="btn btn-primary mt-2 form-control">category management</button></Link> 


        </div>
       
     );
}

export default Left;