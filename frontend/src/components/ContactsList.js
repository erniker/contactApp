import React, { useState, useEffect } from "react";
import ContactsApi from "../api/ContactsApi";

const contactsService = new ContactsApi();

export default function ContactsList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    contactsService.getContacts().then((response) => {
      setContacts(response);
    });
  }, []);

  const handleDelete = (id) => {
    contactsService.deleteContact({ id: id }).then(() => {
      var newArr = contacts.filter(function (obj) {
        return obj.id !== id;
      });
      setContacts(newArr);
    });
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead key="thead">
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td>{index + 1} </td>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.phoneNumber}</td>
              <td>{contact.email}</td>
              <td>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-danger contactlist-btn-space"
                    onClick={(e) => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this item?"
                        )
                      )
                        handleDelete(contact.id);
                    }}
                  >
                    {" "}
                    Delete
                  </button>

                  <button
                    type="button"
                    className="btn btn-warning contactlist-btn-space"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = "/contact/" + contact.id;
                    }}
                  >
                    {" "}
                    Update
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}