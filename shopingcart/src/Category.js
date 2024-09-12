import { Link, useNavigate } from "react-router-dom";
import Left from "./Left";
import { useContext, useEffect, useState } from "react";
import { Contextapi } from "./Contextapi";

function Category() {
    const [allcategory, setAllcategory] = useState([])
    const [mess, setMess] = useState('')
    const{username}=useContext(Contextapi)
    let navigate=useNavigate()


    useEffect(() => {
        fetch('/auth/allcategory').then((response) => { return response.json() }).then((data) => {
            // console.log(data)
            if (data.status === 200) {
                setAllcategory(data.apidata)
            } else {
                setMess(data.message)
            }

        })
    }, [])

if(!username){
    navigate('/login')
}else{
    return (
        <section id="mid">
            <div className="container">
                <div className="row">
                    <Left />
                    <div className="col-md-9">
                        <h2>Category Management</h2>
                        <p>{mess}</p>
                        <Link to='/addcategory'><button className="btn btn-primary mb-2 form-control">Add Category</button></Link>
                        <table className='table table-dark table-hover'>
                            <thead>
                                <tr>
                                    <th>S.no.</th>
                                    <th>Id</th>
                                    <th>Category Name</th>
                                    <th>Delete</th>

                                </tr>
                            </thead>
                            <tbody>
                                {allcategory.map((value, key) => (
                                    <tr key={value._id}>
                                        <td>{key+1}</td>
                                        <td>{value._id}</td>
                                        <td>{value.Category}</td>
                                        <td><Link to=''><button>Delete</button></Link></td>

                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </section>
    );
}
  
}

export default Category;