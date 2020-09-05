import React from "react";
import { login } from "../api/AuthAPI";
import ListErrors from "./common/ListErrors";
import useAuth from "../context/auth";
import { navigate, Link, RouteComponentProps, Redirect } from "@reach/router";

export default function Login(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState();
  const {
    state: { user },
    dispatch,
  } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const user = await login(username, password);
      dispatch({ type: "LOAD_USER", user });
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (error.data.statusCode) {
        const messageType = typeof error.data.message;
        const message = error.data.message;
        setErrors({
          [`${error.data.error}:`]:
            messageType === "string" ? [message] : message,
        });
      }
    }
  };

  if (user) {
    return <Redirect to="/" noThrow />;
  }

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
