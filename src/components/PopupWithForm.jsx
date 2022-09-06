import React from "react";

function PopupWithForm({ name, title, titleBtn, onSubmit, isValid, children, ...props}) {
  return (
    <>
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
    </>
  );
}

export default PopupWithForm;