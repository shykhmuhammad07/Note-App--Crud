import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  
  let location = useLocation()
  let naviagte = useNavigate()

  if(location.pathname === "/login" || location.pathname === "/signup") {
    return null
  } 

  function logout() {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
      method: "POST",
      credentials: "include"
    }).then(() => {
      naviagte("/login")
    })

  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Navbar</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/create">Create</Link>
          </li>
          <li className="nav-item">
            <button
              onClick={logout}
              className="btn btn-link nav-link"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
