import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onSubmit, card }) {
  
  function handleClick(e) {
    e.preventDefault();
    onSubmit(card);
  }
  
  return(
    <PopupWithForm 
      name="delete" 
      title="Вы уверены?" 
      titleBtn="Да"
      onSubmit={handleClick}
      isValid={true}
      nameContainer="popup__container"
      isOpen={isOpen}
      onClose={onClose}
    />
  )
}

export default DeleteCardPopup;