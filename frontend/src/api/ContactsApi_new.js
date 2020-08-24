import API from "./APIUtils";

export function getContacts() {
  let url = `/contacts`;
  return API.get(url);
}

export function getContact(id) {
  let url = `/contacts/${id}`;
  return API.get(url);
}

export function deleteContact(id) {
  let url = `/contacts/${id}`;
  return API.delete(url);
}

export function updateContact(contact) {
  return API.put(`/contacts/${contact.id}`, {
    firstName: contact.firstName,
    lastName: contact.lastName,
    phoneNumber: contact.phoneNumber,
    email: contact.email,
  });
}

export function createContact(contact) {
  return API.post("/contacts", contact);
}
