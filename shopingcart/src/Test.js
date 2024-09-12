import Test2 from "./Test2";
import {useMemo, useState}from 'react'

const { useNavigate } = require("react-router-dom");


function Test() {
   let navigate=useNavigate()
//  -------------------------Example of higher-order-component------------------
 
 
//   function add(x){
//    x()
//   }
//   function x(){
// alert("hjbjhj")
//   }
  
  
    // return ( 
    //     <>
    //     <h2>parent</h2>
    //     <button onClick={()=>{add(x)}}>click</button>
    //     </>
    //  );

//  ---------------------    navigate with state parameter-----------------

// function next(){
    
// navigate('/next',{state:"aago na message"})    
// }
// return(
//     <button onClick={()=>{next()}}>next page</button>
// );
const[counter,setCounter]=useState(0)
const[rew,setRew]=useState(6)






let x=function add(a){
    console.log("gyyu")
    return a*2
}



return(
    <>
    <h2>{counter}</h2>
    <Test2 z={x()}/>
    <button onClick={()=>{setCounter(counter+1)}}>counter</button>
    <button onClick={()=>{x(counter)}}>click</button>
   
    </>
);

}
export default Test;