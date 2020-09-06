import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css"; // Archivo CSS de Bootstrap 4
import "bootstrap/dist/js/bootstrap.min"; // Archivo Javascript de Bootstrap 4

import "./index.css";
import "./components/ContactsList/ContactList.css";
import "./components/ContactCreateUpdateForm/ContactCreateUpdateForm.css";
import "./components/Footer.css";
import "./components/Nav.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
