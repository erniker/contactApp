import React from "react";
import "./Nav.css";

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light list-nav">
      <a className="navbar-brand" href="/">
        Super Contact App
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link" href="/">
            CONTACTS
          </a>
          <a className="nav-item nav-link" href="/contact">
            CREATE CONTACT
          </a>
        </div>
      </div>
    </nav>
  );
}
