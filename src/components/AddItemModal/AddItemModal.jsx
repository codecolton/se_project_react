import { useEffect, useState } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const defaultValues = {
  name: "",
  imageUrl: "",
  weatherType: "",
};

const validationRules = {
  name: (value) => (!value ? "Please enter a name." : ""),
  imageUrl: (value) =>
    !value
      ? "Please enter an image URL."
      : !/^https?:\/\//i.test(value)
        ? "Please enter a valid URL."
        : "",
  weatherType: (value) => (!value ? "Please select a weather type." : ""),
};

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { values, errors, handleChange, validate, resetForm } =
    useFormWithValidation(defaultValues, validationRules);

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setHasSubmitted(false);
    }
  }, [isOpen, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setHasSubmitted(true);

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onAddItem(values);
    resetForm();
    setHasSubmitted(false);
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className={`modal__input ${hasSubmitted && errors.name ? "modal__input_error" : ""}`}
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
        {hasSubmitted && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>
      <label htmlFor="clothing-link" className="modal__label">
        Image{" "}
        <input
          type="url"
          name="imageUrl"
          className={`modal__input ${hasSubmitted && errors.imageUrl ? "modal__input_error" : ""}`}
          id="clothing-link"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
        {hasSubmitted && errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>
      <fieldset
        className={`modal__radio-buttons ${hasSubmitted && errors.weatherType ? "modal__radio-buttons_error" : ""}`}
      >
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            name="weatherType"
            type="radio"
            className="modal__radio-input"
            value="hot"
            checked={values.weatherType === "hot"}
            onChange={handleChange}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            name="weatherType"
            type="radio"
            className="modal__radio-input"
            value="warm"
            checked={values.weatherType === "warm"}
            onChange={handleChange}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            name="weatherType"
            type="radio"
            className="modal__radio-input"
            value="cold"
            checked={values.weatherType === "cold"}
            onChange={handleChange}
          />{" "}
          Cold
        </label>
        {hasSubmitted && errors.weatherType && (
          <span className="modal__error">{errors.weatherType}</span>
        )}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
