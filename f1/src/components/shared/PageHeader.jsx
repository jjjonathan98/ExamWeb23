import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logoImage from "../../assets/images/F1Logo.png";

// The PageHeader component is used to display the header of the page. It contains a navigation bar with links to the different sections of the website.
const PageHeader = () => {
  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <Link to="/" className="navbar-brand">
          <img
            src={logoImage}
            alt="F1 Logo"
            className="img-fluid"
            style={{ maxWidth: "100px", maxHeight: "50px" }}
          />
        </Link>
        <button
          className="navbar-toggler btn-danger"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="quiz" className="nav-link fs-6">
                Quiz
              </NavLink>
            </li>
            <li
              className="nav-item"
              style={{ marginLeft: "10px", size: "10px" }}
            >
              <NavLink to="drivers" className="nav-link fs-6">
                Drivers
              </NavLink>
            </li>
            <li className="nav-item" style={{ marginLeft: "10px" }}>
              <NavLink to="drivers-admin" className="nav-link fs-6">
                Drivers Admin
              </NavLink>
            </li>
            <li className="nav-item" style={{ marginLeft: "10px" }}>
              <NavLink to="delete-drivers" className="nav-link fs-6">
                Delete Drivers
              </NavLink>
            </li>
            <li className="nav-item" style={{ marginLeft: "10px" }}>
              <NavLink to="teams" className="nav-link fs-6">
                Teams
              </NavLink>
            </li>
            <li className="nav-item" style={{ marginLeft: "10px" }}>
              <NavLink to="teams-admin" className="nav-link fs-6">
                Teams Admin
              </NavLink>
            </li>
            <li className="nav-item" style={{ marginLeft: "10px" }}>
              <NavLink to="delete-teams" className="nav-link fs-6">
                Delete Teams
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default PageHeader;
