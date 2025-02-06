import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminSignup() {
    const [registerAdmin, setRegisterAdmin]=useState({name:"",email:"",password:""})
const navigate=useNavigate()

      
   const handleOnChange=(e)=>{
    const { name, value } = e.target;
    setRegisterAdmin({...registerAdmin,[name]:value})

   }

    const handleSubmit=(e)=>{
        e.preventDefault(); 
        const existingAdmin = localStorage.getItem("admin");
        if (existingAdmin) {
            alert("There can only be one Admin please login or contact your administrator")
            return 
        }
        else{
            localStorage.setItem("admin", JSON.stringify(registerAdmin)); 
        alert("Admin registered successfully!");
        navigate("/adminlogin")
        }
    }
  return (
    <div className="w-80 mx-auto mt-20 py-10 px-10 border  border-gray-600 rounded-lg hover:shadow-2xl transition-all ease-in-out">

        <h1 className="text-bold text-lg text-center">Admin Signup Here</h1>

       <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
       <input type="text" className="py-3 px-8 rounded-md border border-gray-800" placeholder="Enter name..." name="name" value={registerAdmin.name} onChange={handleOnChange}/>
       <input type="email" className="py-3 px-8 rounded-md border border-gray-800" placeholder="Enter email..."  name="email" value={registerAdmin.email} onChange={handleOnChange}/>
        <input type="password" className="py-3 px-8 rounded-md border border-gray-800" placeholder="Enter password..." name="password" value={registerAdmin.password} onChange={handleOnChange}/>

        <button className="w-full bg-blue-500 py-3 rounded-md text-white">Register as Admin</button>

       </form>
       <span className="text-sm">Already have an account? <Link to={"/adminlogin"} className="text-blue-400 underline  hover:text-blue-600"> Login here</Link> </span>

    </div>
  )
}

export default AdminSignup