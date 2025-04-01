import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import Login from './Login';
import Header from './Header';
import Footer from './Footer';
import Products from './Products';
import Account from './Account';
import Adminpanel from './Adminpanel';
import Productmanage from './Productmanage';
import { Contextapi } from './Contextapi';
import { useCallback, useState } from 'react';
import Addproduct from './Addproduct';
import Category from './Category';
import Addcategory from './Addcategory';
import Updateproduct from './Updateproduct';
import Cart from './Cart';
import Myorders from './Myorders';
import Moredetail from './Moredetail';

import Overloading from './Overloading'


function App() {
  const[username,setUsername]=useState(localStorage.getItem('username'))
  const[cart,setCart]=useState(JSON.parse(localStorage.getItem('cart')))

  localStorage.setItem('cart',JSON.stringify(cart))

 
  

    

 return(
  <Contextapi.Provider value={{username,setUsername,cart,setCart}}>
<Router>

  <Header/>
  <Routes>
    <Route path='/login' element={<Login />}></Route>
    <Route path='/account' element={<Account/>}></Route>
    <Route path='/admindashboard' element={<Adminpanel/>}></Route>
    
    <Route path='/productmanage' element={<Productmanage/>}></Route>
    <Route path='/addproduct' element={<Addproduct/>}></Route>
    <Route path='/categorymanage' element={<Category/>}></Route>
    <Route path='/addcategory' element={<Addcategory/>}></Route>
    <Route path='/updateproduct/:id' element={<Updateproduct/>}></Route>
    <Route path='/products' element={<Products/>}></Route>
    <Route path='/moredetail/:id' element={<Moredetail/>}></Route>
    <Route path='/carts' element={<Cart/>}></Route>
    <Route path='/myorders' element={<Myorders/>}></Route>

    
    <Route path='/classcomponent' element={<Overloading/>}></Route>



  </Routes>
  <Footer/>
</Router>
</Contextapi.Provider>
 )
}

export default App;
