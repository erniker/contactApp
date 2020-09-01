import React, { useState, useEffect } from "react";
import ContactsApi from "../api/ContactsApi";

const contactsService = new ContactsApi();

export default function ContactCreateUpdate(props) {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    if (props.match.params && props.match.params.id) {
      contactsService.getContact(props.match.params.id).then((result) => {
        setContact(result);
      });
    }
  }, [props]);

  const handleCreate = () => {
    contactsService
      .createContact(contact)
      .then((result) => {
        setResult(result, "Contact created!");
      })
      .catch((err) => {
        displayErrors(err);
      });
  };
  const handleUpdate = (id) => {
    contactsService
      .updateContact({
        id: id,
        ...contact,
      })
      .then((result) => {
        setResult(result, "Contact updated!");
      })
      .catch((err) => {
        displayErrors(err);
      });
  };

  const displayErrors = (err) => {
    if ((err.response.data.statusCode = 409)) {
      if (err.response.data.error === "Bad Request") {
        alert(err.response.data.message.join("\n"));
      } else {
        alert(err.response.data.message);
      }
    } else {
      alert("There was an error! Please check your form.");
    }
  };

  const setResult = (result, message) => {
    setContact(result);
    alert(message);
    window.location.href = "/";
  };

  const handleSubmit = (event) => {
    if (props.match.params && props.match.params.id) {
      handleUpdate(props.match.params.id);
    } else {
      handleCreate();
    }
    event.preventDefault();
  };

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
            onChange={(e) =>
              setContact({ ...contact, firstName: e.target.value })
            }
            placeholder="Enter first name"
          />

          <label>Last Name:</label>
          <input
            className="form-control"
            type="text"
            name="lastName"
            value={contact.lastName || ""}
            onChange={(e) =>
              setContact({ ...contact, lastName: e.target.value })
            }
            placeholder="Enter last name"
          />

          <label>Phone:</label>
          <input
            className="form-control"
            type="text"
            name="phoneNumber"
            value={contact.phoneNumber || ""}
            onChange={(e) =>
              setContact({ ...contact, phoneNumber: e.target.value })
            }
            placeholder="Enter a valid phone number eg: +34 612345678"
          />
          <label>Email:</label>
          <input
            className="form-control"
            type="text"
            name="email"
            value={contact.email || ""}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
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
