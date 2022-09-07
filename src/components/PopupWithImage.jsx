import React from "react";
import Popup from "./Popup";

function PopupWithImage({isOpen, onClose, card}) {
  return(
    <Popup isOpen={isOpen} onClose={onClose}>
      <img 
        className="popup__image"
        src={card.link}
        alt={card.name}
      />
      <h2 className="popup__text">{card.name}</h2>
    </Popup>
  );
}
export default PopupWithImage;