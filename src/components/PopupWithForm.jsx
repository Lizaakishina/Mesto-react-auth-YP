import React from "react";
import Popup from "./Popup";

function PopupWithForm({ isOpen, onClose, name, title, titleBtn, onSubmit, isValid, children }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <h2 className="popup__title">{title}</h2>
      <form className="form" name={name} onSubmit={onSubmit}>
        {children}
        <button
          className={`button button_type_save ${
            !isValid && "button_inactive"
          }`}
          value={titleBtn}
          disabled={!isValid}
        >
          {titleBtn}
        </button>
      </form>
    </Popup>
  )
}

export default PopupWithForm;