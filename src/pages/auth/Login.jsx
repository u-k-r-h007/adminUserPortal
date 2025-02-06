import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = { email: "", password: "" };
    let valid = true;

    // Validate email
    if (!loginData.email) {
      formErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      formErrors.email = "Please enter a valid email";
      valid = false;
    }

    // Validate password
    if (!loginData.password) {
      formErrors.password = "Password is required";
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (!storedUsers || storedUsers.length === 0) {
      alert("No user found. Please register first.");
      return;
    }

    const user = storedUsers.find(
      (user) =>
        user.email === loginData.email && user.password === loginData.password
    );

    if (user) {
      // Dispatch login action to update Redux store
      dispatch(login(user)); 
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to the home page
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="w-80 mx-auto mt-20 py-10 px-10 border border-gray-600 rounded-lg hover:shadow-2xl transition-all ease-in-out">
      <h1 className="text-bold text-lg text-center">Login Here</h1>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
        <input
          type="email"
          className="py-3 px-8 rounded-md border border-gray-800"
          placeholder="Enter email..."
          name="email"
          value={loginData.email}
          onChange={handleLogin}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}

        <input
          type="password"
          className="py-3 px-8 rounded-md border border-gray-800"
          placeholder="Enter password..."
          name="password"
          value={loginData.password}
          onChange={handleLogin}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password}</span>
        )}

        <button className="w-full bg-blue-500 py-3 rounded-md text-white">
          LogIn
        </button>
      </form>

      <span className="text-sm">
        Do not have an account?{" "}
        <Link
          to={"/signup"}
          className="text-blue-400 underline hover:text-blue-600"
        >
          Register here
        </Link>
      </span>
    </div>
  );
}

export default Login;
