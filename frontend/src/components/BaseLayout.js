import React from "react";
import { Route } from "react-router-dom";
import ContactsList from "./ContactsList/ContactsList";
import ContactCreateUpdateForm from "./ContactCreateUpdateForm/ContactCreateUpdateForm";
import Footer from "./Footer";
import Nav from "./Nav";

export default function BaseLayout() {
  return (
    <div className="container-fluid">
      <Nav />
      <div className="content list-content">
        <Route path="/" exact component={ContactsList} />
        <Route path="/contact/:id" component={ContactCreateUpdateForm} />
        <Route path="/contact/" exact component={ContactCreateUpdateForm} />
      </div>
      <Footer />
    </div>
  );
}
