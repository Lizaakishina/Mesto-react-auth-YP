import React from "react";
import Popup from "./Popup";

const InfoTooltip = ({isOpen, onClose, image, text }) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <img src={image} className="popup__union" alt="Значок галочки" />
      <h2 className="popup__title-info">{text}</h2>
    </Popup>
  )
}

export default InfoTooltip;