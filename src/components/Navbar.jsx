import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Aplikasi Kredit IMS Finance</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
          <li className="nav-item">
              <Link className="nav-link" to="/">Input Data</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cicilan">Kalkulasi</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cicilanclient">Cicilan</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/jatuh-tempo">Jatuh Tempo</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/keterlambatan">Keterlambatan</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/status">Status</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
