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
    if (params && params.pk) {
      contactsService.getContact(params.id).then((contact) => {
        this.refs.firstName.value = contact.first_name;
        this.refs.lastName.value = contact.last_name;
        this.refs.phoneNumber.value = contact.phone;
        this.refs.email.value = contact.email;
      });
    }
  }

  handleCreate() {
    contactsService
      .createContact({
        firstName: this.refs.firstName.value,
        lastName: this.refs.lastName.value,
        phoneNumber: this.refs.phoneNumber.value,
        email: this.refs.email.value,
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
        firstName: this.refs.firstName.value,
        lastName: this.refs.lastName.value,
        phoneNumber: this.refs.phoneNumber.value,
        email: this.refs.email.value,
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

    if (params && params.pk) {
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
          <input className="form-control" type="text" ref="phone" />

          <label>Email:</label>
          <input className="form-control" type="text" ref="email" />

          <input className="btn btn-primary" type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

export default ContactCreateUpdate;
