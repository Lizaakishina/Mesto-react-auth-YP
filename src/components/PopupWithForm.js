const PopupWithForm = ({name, title, isOpen, onClose, onSubmit, children}) => {
  const classPopupOpened = `${isOpen ? 'popup_opened' : ''}`;

  return (
    <div className={`popup popup_type_${name} ${classPopupOpened}`}>
      <div className="popup__container">
        <button className="popup__button-close" onClick={onClose} type="button" aria-label="Закрыть"></button>
        <form className="popup__form" name={`form-${name}`} onSubmit={onSubmit} action="form" noValidate>
          <h3 className="popup__title">{title}</h3>
            {children}
          <button className="popup__button popup__button_type_submit" type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm