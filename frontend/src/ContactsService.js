import axios from "axios";
const API_URL = "http://localhost:8000";

export default class ContactsService {
  constructor() {}

  getContacts() {
    const url = `${API_URL}contacts/`;
    return axios.get(url).then((response) => response.data);
  }

  // TODO: Not implemented yet
  getCustomer(id) {
    const url = `${API_URL}/contacts/${id}`;
    return axios.get(url).then((response) => response.data);
  }

  deleteContact(contact) {
    const url = `${API_URL}/contacts/${contact.id}`;
    return axios.delete(url);
  }
  createContact(contact) {
    const url = `${API_URL}/contacts/`;
    return axios.post(url, contact);
  }
  updateContact(contact) {
    const url = `${API_URL}/contacts/${contact.id}`;
    return axios.put(url, contact);
  }
}
