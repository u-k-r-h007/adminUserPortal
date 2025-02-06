import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
    window.location.reload();
  };
  const ifUser = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div>
      <div className="flex justify-between bg-gray-600 h-16 items-center px-5">
        <div>
          <h1 className="text-bold text-3xl text-white">Logo</h1>
        </div>
        <div className="flex justify-evenly gap-5">
          {/* <Link to="/" className="text-white">
            Home
          </Link> */}

          <Link className="text-white">Profile</Link>
          {ifUser ? (
            <button onClick={handleLogout} className="text-white">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
