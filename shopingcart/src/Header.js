import { useContext, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom'
import { Contextapi } from './Contextapi';
function Header() {

  let navigate=useNavigate()
const{username,setUsername,cart}=useContext(Contextapi)

  function handlelogout(e){
    localStorage.removeItem('username')
    setUsername(localStorage.getItem('username'))
    localStorage.removeItem('token')
    navigate('/login')


  }
  if(!username){

    return ( 
      <></>
      );
    
    }else if(username=='admin@gmail.com'){
      const user=username.split('@')[0]

      return ( 
        <section id='header'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8'><h2>Welcome {username}</h2></div>
              <div className='col-md-4'>
               <button className='btn btn-danger ' onClick={(e)=>{handlelogout(e)}}>Logout</button>
  
                </div>
  
            </div>
          </div>
        </section>
        
       );
    }
    else{
      const user=username.split('@')[0]

      return ( 
        <section id='header'>
        <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
    <Link to="/products"><img src='/istockphoto-1345513783-612x612.jpg' className='img-fluid' /></Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-4 me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/products">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Contact Us</Link>
              </li>
            
            </ul>
            <form className="d-flex ms-4">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success me-5" type="submit">Search</button>
            </form>

     <ul class="navbar-nav ms-4 mb-2 mb-lg-0">
        
        <li class="nav-item dropdown ">
          <button class="nav-link dropdown-toggle btn btn-outline form-control"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Your Account
          </button>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">My Profile</a></li>
            <li><a class="dropdown-item" href="#">Change Password</a></li>
            
            <li><Link class="dropdown-item" href="#">Forgot Password</Link></li>
          </ul>
        </li>
        
      
            <li className='ms-2'><Link to='/carts'><i className="bi bi-cart3"><span className="translate-middle badge rounded-pill bg-danger">
               {/* {!cart.totalitems?0:cart.totalitems} */}
      <span className="visually-hidden">unread messages</span>
     </span></i></Link></li>
             <li className='ms-2'> <Link to='myorders'><button className='btn btn-outline-primary form-control' >My orders</button></Link></li>
              <li className='ms-2'><button className='btn btn-danger form-control' onClick={(e)=>{handlelogout(e)}}>Logout</button></li>
</ul>
        
    
          </div>
        </div>
      </nav>
      </section>
    //     <section id='header'>
    //       <div className='container'> 
    //         <div className='row'>
            
    //           <div className='col-md-8'>
    //             <h2>Welcome {user}</h2>
    //             <ul>
    //               <li>Home</li>
    //               <li>About</li>
    //               <li>Link</li>

    //             </ul>
    //             </div>
    //           <div className='col-md-4'>
    //            <button className='btn btn-danger' onClick={(e)=>{handlelogout(e)}}>Logout</button>
    //            <Link to='myorders'><button className='btn btn-outline-primary me-2' >My orders</button></Link>
  
    //            <Link to='/carts'><i class="bi bi-cart3 me-2"><span class="translate-middle badge rounded-pill bg-danger">
    //            {!cart.totalitems?0:cart.totalitems}
    //   <span class="visually-hidden">unread messages</span>
    // </span></i></Link>
    
    //             </div>
  
    //         </div>
    //       </div>
    //     </section>
        
       );
    }
}

export default Header;