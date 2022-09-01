const ImagePopup = ({card, isOpen, onClose}) => {
  const classPopupOpened = `${isOpen ? 'popup_opened' : ''}`;
  
  return (
    <div className={`popup popup_type_view-image ${classPopupOpened}`}>
      <div className="popup__container">
        <button className="popup__button-close" onClick={onClose} type="button" aria-label="Закрыть"></button>
        <img src={card.link} alt={card.name} className="popup__view-image"/>
        <h3 className="popup__description">{card.name}</h3>
      </div>
    </div>
  )
}

export default ImagePopup