import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function Navbar() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                  Navbar
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link " aria-current="page" to="/Adminlogin">
                        Admin Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/Teacherlogin">
                        Teacher Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/Studentlogin">
                        Student Login
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
