import { useState } from "react";

export const useForm = (initialState = {}) => {
  // initialState recibe los campos con los que quiero el form

  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  }; // reseteo el formulario

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value, // target.name puede ser name o email
    });
  };

  return [values, handleInputChange, reset];
};
