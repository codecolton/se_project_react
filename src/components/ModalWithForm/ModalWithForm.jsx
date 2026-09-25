import "./ModalWithForm.css";
import closeIcon from "../../assets/close-button.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  name,
  activeModal,
  onClose,
  isOpen,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_form">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close button" />
        </button>
        <form
          onSubmit={onSubmit}
          className="modal__form"
          name={name}
          noValidate
        >
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
