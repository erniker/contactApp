import { useState, useEffect } from "react";
import ContactsApi from "../../api/ContactsApi";

const contactsApi = new ContactsApi();

const useLoginForm = (props) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const user = await login(username, password);
      dispatch({ type: "LOAD_USER", user });
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (error.data.statusCode) {
        const messageType = typeof error.data.message;
        const message = error.data.message;
        setErrors({
          [`${error.data.error}:`]:
            messageType === "string" ? [message] : message,
        });
      }
    }
  };

  return { handleSubmit };
};
export default useLoginForm;
