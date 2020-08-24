import React, { Component } from "react";
import ContactsService from "../ContactsService";

const contactsService = new ContactsService();

class ContactsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    var self = this;
    contactsService.getContacts().then(function (result) {
      console.log(result);
      self.setState({ contacts: result.data });
    });
  }
  handleDelete(e, id) {
    var self = this;
    contactsService.deleteContact({ id: id }).then(() => {
      var newArr = self.state.contacts.filter(function (obj) {
        return obj.id !== id;
      });

      self.setState({ customers: newArr });
    });
  }

  render() {
    return (
      <div className="contacts--list">
        <table className="table">
          <thead key="thead">
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.id} </td>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.email}</td>
                <td>{contact.phoneNumber}</td>
                <td>
                  <button onClick={(e) => this.handleDelete(e, contact.id)}>
                    {" "}
                    Delete
                  </button>
                  <a href={"/contact/" + contact.id}> Update</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ContactsList;
