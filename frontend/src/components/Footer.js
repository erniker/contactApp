import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer main-footer">
      <div className="container">
        <p className="float-right">
          <a href="/">Subir</a>
        </p>
        <p>
          &copy; {new Date().getFullYear()} Super Contact App Inc. &middot;{" "}
          <a href="/">Política de Privacidad</a> &middot;{" "}
          <a href="/">Términos</a>
        </p>
      </div>
    </footer>
  );
}
