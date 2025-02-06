import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AdminSignup from "./components/admin/AdminSignup";
import AdminLogin from "./components/admin/AdminLogin";
import Admin from "./components/admin/Admin";
import About from "./pages/About";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<PrivateRoute element={<Home />} />} /> */}

          <Route path="/dashboard" element={<Home />} />
          <Route path="/" element={<About />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Routes */}
          <Route path="/admindashboard" element={<Admin />} />
          <Route path="/adminsignup" element={<AdminSignup />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
