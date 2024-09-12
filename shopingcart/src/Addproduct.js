import { useContext, useEffect, useState } from "react";
import Left from "./Left";
import { Contextapi } from "./Contextapi";
import { useNavigate } from "react-router-dom";

function Addproduct() {
    const{username}=useContext(Contextapi)
    let navigate=useNavigate()

    const [pname, setPname] = useState('')
    const [pdesc, setPdesc] = useState('')
    const [pprice, setPprice] = useState('')
    const [pqty, setPqty] = useState('')

    const[category,setCategory]=useState('')

    const [img, setImg] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')

    const [mess, setMess] = useState('')

    const[allcategory,setAllcategory]=useState([])

useEffect(()=>{
    fetch('/auth/allcategory').then((response)=>{return response.json()}).then((data)=>{
        if(data.status===200){
            setAllcategory(data.apidata)
        }else{

        }
    })

},[])



    function handleform(e) {
        e.preventDefault()
        // console.log(pname, pdesc, pprice,img,category)
        const filesize=((img.size)/(1024))/1024
        const filesize2=((img2.size)/(1024))/1024
        const filesize3=((img3.size)/(1024))/1024

        if(pname==''){
            setMess("Product name should not be blank")
           }else if(pdesc==''){
            setMess("product Description should not be blank")
           }else if(pprice==''){
            setMess("Price should not be blank")
           }else if(pqty==''){
            setMess("Quantity should not be blank")
           }
           else if(category==''){
            setMess("Category should not be blank")
           }
        else if(filesize >=2 || filesize2 >=2 || filesize3 >=2){
            alert("file size should be lessthan 2MB")

        }else{
            var fdata=new FormData()
            fdata.append('name',pname)
       fdata.append('desc',pdesc)
       fdata.append('price',pprice)
       fdata.append('qty',pqty)

       fdata.append('category',category)
       fdata.append('image',img)
       fdata.append('image2',img2)
       fdata.append('image3',img3)

       fetch('/auth/addproduct',{
        method:"POST",
        body:fdata        
       }).then((response)=>{return response.json()}).then((data)=>{
        if(data.status===201){
            setMess(data.message)

            // setPname('')
            // setPdesc('')
            // setPprice('')
            // setPqty('')
            // setCategory('')
            // setImg('')
            // setImg2('')
            // setImg3('')
            navigate('/productmanage',{state:'product successfully added'})

        }else{
            setMess(data.message)
        }
       })
        }
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
                            <h2>Add product Here</h2>
                            <p>{mess}</p>
                            <form onSubmit={(e) => { handleform(e) }}>
                                <label className="form-label">Product Name</label>
                                <input type="text"  className="form-control" value={pname}
                                    onChange={(e) => { setPname(e.target.value) }} />
                                <label className="form-label">Product Desc</label>
                                <textarea className="form-control" value={pdesc}
                                    onChange={(e) => { setPdesc(e.target.value) }}></textarea>
                                <label className="form-label">Product Price</label>
                                <input type="Number" className="form-control" value={pprice}
                                    onChange={(e) => { setPprice(e.target.value) }} />
                                <label className="form-label">Quantity</label>
                                    <input type="Number" className="form-control" value={pqty}
                                    onChange={(e) => { setPqty(e.target.value) }} />
                                <label className="form-label">Category</label>
                                    <select className="form-select" value={category} 
                                    onChange={(e)=>{setCategory(e.target.value)}}
                                    > 
                                    <option value=''>select</option>
                                        {allcategory.map((value,key)=>(
                                             <option key={value._id} value={value.Category}>{value.Category}</option>
                                        ))}
                                       
                                    </select>
                               
                                <label className="form-label">Product Image1</label>
                                <input type="file" className="form-control"  onChange={(e)=>{setImg(e.target.files[0])}}/>
                                <label className="form-label">Product Image2</label>
                                <input type="file" className="form-control"  onChange={(e)=>{setImg2(e.target.files[0])}}/>
                                <label className="form-label">Product Image3</label>
                                <input type="file" className="form-control"  onChange={(e)=>{setImg3(e.target.files[0])}}/>
                                <button type="submit" className="btn btn-success mt-2">Upload Product</button>
                            </form>
    
                        </div>
    
                    </div>
                </div>
            </section>
        );
    }
 
}

export default Addproduct;