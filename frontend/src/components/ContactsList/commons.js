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
    if (window.confirm("Are you sure you wish to delete this item?"))
      contactsApi.deleteContact({ id: id }).then(() => {
        var newArr = contacts.filter(function (obj) {
          return obj.id !== id;
        });
        setContacts(newArr);
      });
  };

  const handleUpdate = (e, contact) => {
    e.preventDefault();
    window.location.href = "/contact/" + contact.id;
  };

  return {
    contacts,
    handleDelete,
    handleUpdate,
  };
};
export default useContactList;
