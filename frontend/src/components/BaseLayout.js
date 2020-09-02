import React from "react";
import { Route } from "react-router-dom";
import ContactsList from "./List/ContactsList";
import ContactCreateUpdate from "./Form/ContactCreateUpdate";
import Footer from "./Footer";
import Nav from "./Nav";

export default function BaseLayout() {
  return (
    <div className="container-fluid">
      <Nav />
      <div className="content list-content">
        <Route path="/" exact component={ContactsList} />
        <Route path="/contact/:id" component={ContactCreateUpdate} />
        <Route path="/contact/" exact component={ContactCreateUpdate} />
      </div>
      <Footer />
    </div>
  );
}
