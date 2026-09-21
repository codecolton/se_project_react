import "./DeleteConfirmationModal.css";
import closeIcon from "../../assets/close-button.png";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content-confirm">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close button" />
        </button>

        <div className="modal__form">
          <p className="modal__text">
            Are you sure you want to delete this item? <br></br> This action is
            irreversible.
          </p>

          <button
            type="button"
            className="modal__delete-btn"
            onClick={onConfirm}
          >
            Yes, delete item
          </button>

          <button type="button" className="modal__cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
