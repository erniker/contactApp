import { useState, useEffect } from "react";
import ContactsApi from "../../api/ContactsApi";

const contactsApi = new ContactsApi();

const useContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    contactsApi.getContacts().then((response) => {
      setContacts(response);
    });
  }, []);

  const handleDelete = (id) => {
    contactsApi.deleteContact({ id: id }).then(() => {
      var newArr = contacts.filter(function (obj) {
        return obj.id !== id;
      });
      setContacts(newArr);
    });
  };

  return {
    contacts,
    handleDelete,
  };
};
export default useContactList;
