import React from "react";
import useContactCreateUpdateForm from "./commons";
import "./ContactCreateUpdateForm.css";

export default function ContactCreateUpdate(props) {
  const {
    contact,
    handleInputChange,
    handleSubmit,
  } = useContactCreateUpdateForm(props);

  return (
    <div className="abs-center">
      <form onSubmit={handleSubmit} className="border p-3 form">
        <div className="form-group">
          <label>First Name:</label>
          <input
            className="form-control"
            type="text"
            name="firstName"
            value={contact.firstName || ""}
            onChange={handleInputChange}
            placeholder="Enter first name"
          />

          <label>Last Name:</label>
          <input
            className="form-control"
            type="text"
            name="lastName"
            value={contact.lastName || ""}
            onChange={handleInputChange}
            placeholder="Enter last name"
          />

          <label>Phone:</label>
          <input
            className="form-control"
            type="text"
            name="phoneNumber"
            value={contact.phoneNumber || ""}
            onChange={handleInputChange}
            placeholder="Enter a valid phone number eg: +34 612345678"
          />
          <label>Email:</label>
          <input
            className="form-control"
            type="text"
            name="email"
            value={contact.email || ""}
            onChange={handleInputChange}
            placeholder="Enter a valid email"
          />

          <button className="btn btn-primary submit-btn-space" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
