import { useNavigate, useParams } from "react-router-dom";
import Left from "./Left";
import { useContext, useEffect, useState } from "react"
import { Contextapi } from "./Contextapi";
function Updateproduct() {

    const {id}=useParams()
    const{username}=useContext(Contextapi)
let navigate=useNavigate()
    const [pname, setPname] = useState('')
    const [pdesc, setPdesc] = useState('')
    const [pprice, setPprice] = useState('')
    const [pqty, setPqty] = useState('')

    const[category,setCategory]=useState('')
    const[pstatus,setStatus]=useState('')

    const [img, setImg] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')

    const [mess, setMess] = useState('')
    const[allcategory,setAllcategory]=useState([])

useEffect(()=>{
    fetch(`/auth/singleproduct/${id}`).then((response)=>{return response.json()}).then((data)=>{
        if(data.status===200){
            setPname(data.apidata.Name)
            setPdesc(data.apidata.Desc)
            setPprice(data.apidata.Price)
            setPqty(data.apidata.qty)
            setCategory(data.apidata.Category)
            setStatus(data.apidata.Status)

        }else{
            setMess(data.message)
        }
    })
},[])

    useEffect(()=>{
        fetch('/auth/allcategory').then((response)=>{return response.json()}).then((data)=>{
            if(data.status===200){
                setAllcategory(data.apidata)
            }else{
    
            }
        })
    },[])

    function handleform(e){
        e.preventDefault()
        // console.log(img,img2,img3)
       
        const filesize=(img.size)/(1024)
        const filesize2=(img2.size)/(1024)
        const filesize3=(img3.size)/(1024)

        if(pname==''){
            setMess("Product name should not be blank")
           }else if(pdesc==''){
            setMess("product Description should not be blank")
           }else if(pprice==''){
            setMess("Price should not be blank")
           }else if(pqty==''){
            setMess("Quantity should not be blank")
           }else if(category==''){
            setMess("Category should not be blank")
           }else if(pstatus==''){
            setMess("Status should not be blank")
           }
           else if(filesize >=250 || filesize2 >=250 || filesize3 >=250){
            alert("file size should be lessthan 251KB")

        }else{
            var fdata=new FormData()
            fdata.append('name',pname)
       fdata.append('desc',pdesc)
       fdata.append('price',pprice)
       fdata.append('qty',pqty)

       fdata.append('category',category)
       fdata.append('status',pstatus)
       fdata.append('image',img)
       fdata.append('image2',img2)
       fdata.append('image3',img3)
       
       fetch(`/auth/updateproduct/${id}`,{
        method:"PUT",
        body:fdata
       }).then((response)=>{return response.json()}).then((data)=>{
        if(data.status===200){
            setMess(data.message)
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
                    <Left/>
                    <div className="col-md-9">
                        <h2>Update Product</h2>
                        <p>{mess}</p>
                        <form onSubmit={(e) => { handleform(e) }}>
                            <label className="form-label">Product Name</label>
                            <input type="text" className="form-control" value={pname}
                                onChange={(e)=>{setPname(e.target.value)}} />
                            <label className="form-label">Product Desc</label>
                            <textarea className="form-control" value={pdesc}
                               onChange={(e)=>{setPdesc(e.target.value)}} ></textarea>
                            <label className="form-label">Product Price</label>
                            <input type="Number" className="form-control" value={pprice}
                                onChange={(e)=>{setPprice(e.target.value)}} />
                            <label className="form-label">Quantity</label>
                                <input type="Number" className="form-control" value={pqty}
                                onChange={(e) => { setPqty(e.target.value) }} />
                                <label className="form-label">Category</label>
                                <select className="form-select" value={category} 
                                onChange={(e)=>{setCategory(e.target.value)}}> 
                                <option value=''>select</option>
                                    {allcategory.map((value,key)=>(
                                         <option value={value.Category} key={value._id}>{value.Category}</option>
                                    ))} 
                                    </select>
                                <label className="form-label">Status</label>
                                <select className="form-select" value={pstatus} 
                                onChange={(e)=>{setStatus(e.target.value)}}> 
                                <option value='Out-Stock'>Out-Stock</option>
                               <option value='In-Stock'>IN-Stock</option>
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

export default Updateproduct ;