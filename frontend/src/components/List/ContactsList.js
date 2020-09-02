import React from "react";
import useContactList from "./commons";

export default function ContactsList() {
  const { contacts, handleDelete } = useContactList();

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
