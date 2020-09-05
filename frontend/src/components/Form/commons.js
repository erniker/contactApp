import { useState, useEffect } from "react";
import ContactsApi from "../../api/ContactsApi";

const contactsApi = new ContactsApi();

const useContactCreateUpdateForm = (props) => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    if (props.match.params && props.match.params.id) {
      contactsApi.getContact(props.match.params.id).then((result) => {
        setContact(result);
      });
    }
  }, [props]);

  const handleCreate = () => {
    contactsApi
      .createContact(contact)
      .then((result) => {
        setResult(result, "Contact created!");
      })
      .catch((err) => {
        displayErrors(err);
      });
  };

  const handleUpdate = (id) => {
    contactsApi
      .updateContact({
        id: id,
        ...contact,
      })
      .then((result) => {
        setResult(result, "Contact updated!");
      })
      .catch((err) => {
        displayErrors(err);
      });
  };

  const displayErrors = (err) => {
    if ((err.response.data.statusCode = 409)) {
      if (err.response.data.error === "Bad Request") {
        alert(err.response.data.message.join("\n"));
      } else {
        alert(err.response.data.message);
      }
    } else {
      alert("There was an error! Please check your form.");
    }
  };

  const setResult = (result, message) => {
    setContact(result);
    alert(message);
    window.location.href = "/";
  };

  const handleInputChange = (event) => {
    event.persist();
    setContact((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    if (props.match.params && props.match.params.id) {
      handleUpdate(props.match.params.id);
    } else {
      handleCreate();
    }
    event.preventDefault();
  };

  return {
    contact,
    handleInputChange,
    handleSubmit,
  };
};
export default useContactCreateUpdateForm;
