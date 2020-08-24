import React, { Component } from "react";
import ContactsApi from "../api/ContactsApi";

const contactsService = new ContactsApi();

class ContactCreateUpdate extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    if (params && params.id) {
      contactsService.getContact(params.id).then((contact) => {
        this.firstName = contact.firstName;
        this.lastName = contact.lastName;
        this.phoneNumber = contact.phoneNumber;
        this.email = contact.email;
      });
    }
  }

  handleCreate() {
    contactsService
      .createContact({
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        email: this.email,
      })
      .then((result) => {
        alert("Contact created!");
      })
      .catch(() => {
        alert(
          "There was an error! Please check your form. Remember all fields are mandatory"
        );
      });
  }
  handleUpdate(id) {
    contactsService
      .updateContact({
        id: id,
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        email: this.email,
      })
      .then((result) => {
        console.log(result);
        alert("Contact updated!");
      })
      .catch(() => {
        alert("There was an error! Please check your form.");
      });
  }
  handleSubmit(event) {
    const {
      match: { params },
    } = this.props;

    if (params && params.id) {
      this.handleUpdate(params.id);
    } else {
      this.handleCreate();
    }

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input className="form-control" type="text" ref="firstName" />

          <label>Last Name:</label>
          <input className="form-control" type="text" ref="lastName" />

          <label>Phone:</label>
          <input className="form-control" type="text" ref="phoneNumber" />

          <label>Email:</label>
          <input className="form-control" type="text" ref="email" />

          <input className="btn btn-primary" type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

export default ContactCreateUpdate;
