import React, { Component } from "react";
import { Route } from "react-router-dom";
import ContactsList from "./ContactsList";
import ContactCreateUpdate from "./ContactCreateUpdate";

class BaseLayout extends Component {
  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
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
        <div className="content">
          <Route path="/" exact component={ContactsList} />
          <Route path="/contact/:id" component={ContactCreateUpdate} />
          <Route path="/contact/" exact component={ContactCreateUpdate} />
        </div>
      </div>
    );
  }
}
export default BaseLayout;
