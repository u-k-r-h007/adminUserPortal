import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function AdminLogin() {
    const [loginAdmin,setLoginAdmin]=useState({email:"",password:""})
    const navigate= useNavigate()


    const handleLogin=(e)=>{
        const {name, value}=e.target
        setLoginAdmin({...loginAdmin,[name]:value})
    }

    
  

    const handleSubmit = (e) => {
        e.preventDefault();
    
        
       
        const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    
        if (!storedAdmin) {
          alert("No admin found. Please register first.");
          return;
        }
    
        if (storedAdmin.email === loginAdmin.email && storedAdmin.password === loginAdmin.password) {
            localStorage.setItem("currentUser", JSON.stringify(loginAdmin))
          alert("Login successful!");
          navigate("/admindashboard"); 
        } else {
          alert("Invalid email or password. Please try again.");
        }
      };
  return (
    <div className="w-80 mx-auto mt-20 py-10 px-10 border  border-gray-600 rounded-lg rounded-lg hover:shadow-2xl transition-all ease-in-out">

    <h1 className="text-bold text-lg text-center">Login Here</h1>

   <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
   <input type="email" className="py-3 px-8 rounded-md border border-gray-800" placeholder="Enter email..." name="email" value={loginAdmin.email} onChange={handleLogin} />
    <input type="password" className="py-3 px-8 rounded-md border border-gray-800" placeholder="Enter password..." name="password" value={loginAdmin.password} onChange={handleLogin}/>

    <button className="w-full bg-blue-500 py-3 rounded-md text-white">LogIn as Admin</button>

   </form>

<span className="text-sm">Do not have an account? <Link to={"/adminsignup"} className="text-blue-400 underline hover:text-blue-600">Register here</Link> </span>
</div>
  )
}

export default AdminLogin