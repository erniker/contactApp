import { useState, useEffect } from "react";
import ContactsApi from "../../api/ContactsApi";

const contactsService = new ContactsApi();

const useContactList = () => {
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

  return {
    contacts,
    handleDelete,
  };
};
export default useContactList;
