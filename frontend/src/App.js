import React from "react";
import { BrowserRouter } from "react-router-dom";
import BaseLayout from "./components/BaseLayout";

export default function App() {
  return (
    <BrowserRouter>
      <BaseLayout />
    </BrowserRouter>
  );
}
