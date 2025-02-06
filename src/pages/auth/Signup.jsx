import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../redux/authSlice";

function Signup() {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = { name: "", email: "", password: "" };
    let valid = true;

    if (!registerData.name) {
      formErrors.name = "Name is required";
      valid = false;
    }

    if (!registerData.email) {
      formErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      formErrors.email = "Please enter a valid email";
      valid = false;
    }

    if (!registerData.password) {
      formErrors.password = "Password is required";
      valid = false;
    } else if (registerData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = existingUsers.some(
      (user) => user.email === registerData.email
    );

    if (emailExists) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email already registered! Try logging in.",
      }));
      return;
    }

    dispatch(register(registerData));
    alert("User registered successfully!");
    navigate("/login");
  };

  return (
    <div className="w-80 mx-auto mt-20 py-10 px-10 border border-gray-600 rounded-lg hover:shadow-2xl transition-all ease-in-out">
      <h1 className="text-bold text-lg text-center">Signup Here</h1>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
        <input
          type="text"
          className="py-3 px-8 rounded-md border border-gray-800"
          placeholder="Enter name..."
          name="name"
          value={registerData.name}
          onChange={handleOnChange}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name}</span>
        )}

        <input
          type="email"
          className="py-3 px-8 rounded-md border border-gray-800"
          placeholder="Enter email..."
          name="email"
          value={registerData.email}
          onChange={handleOnChange}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}

        <input
          type="password"
          className="py-3 px-8 rounded-md border border-gray-800"
          placeholder="Enter password..."
          name="password"
          value={registerData.password}
          onChange={handleOnChange}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password}</span>
        )}

        <button className="w-full bg-blue-500 py-3 rounded-md text-white">
          Register
        </button>
      </form>

      <span className="text-sm">
        Already have an account?{" "}
        <Link
          to={"/login"}
          className="text-blue-400 underline hover:text-blue-600"
        >
          Login here
        </Link>
      </span>
    </div>
  );
}

export default Signup;
