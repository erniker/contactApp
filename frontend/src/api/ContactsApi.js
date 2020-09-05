import API from "./ApiUtils";

export default class ContactsApi {
  getContacts() {
    const url = `/contacts/`;
    return API.get(url).then((response) => response.data);
  }

  getContact(id) {
    const url = `/contacts/${id}`;
    return API.get(url).then((response) => response.data);
  }

  deleteContact(contact) {
    const url = `/contacts/${contact.id}`;
    return API.delete(url);
  }

  createContact(contact) {
    const url = `/contacts/`;
    return API.post(url, contact);
  }

  updateContact(contact) {
    const url = `/contacts/${contact.id}`;
    return API.put(url, contact);
  }
}
