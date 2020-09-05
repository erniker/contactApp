import React from "react";
import useLoginForm from "./commons";

export default function Login(props) {
  const { handleSubmit } = useLoginForm(props);

  return (
    <div className="abs-center">
      <form onSubmit={handleSubmit} className="border p-3 form">
        <div className="form-group">
          <label>UserName:</label>
          <input
            name="username"
            className="form-control form-control-lg"
            type="text"
            value={username}
            placeholder="User name"
            onChange={(event) => setUsername(event.target.value)}
          />

          <label>Password:</label>
          <input
            name="password"
            className="form-control form-control-lg"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />

          <button className="btn btn-primary submit-btn-space" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
