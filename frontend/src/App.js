import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import BaseLayout from "./components/BaseLayout";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <BaseLayout />
      </BrowserRouter>
    );
  }
}

export default App;
