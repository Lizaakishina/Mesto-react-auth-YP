import { useEffect } from "react";

const Popup = ({ isOpen, name, onClose, children }) => {

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    if(isOpen){
      document.addEventListener('keydown', closeByEscape)
    }
    else{
      document.removeEventListener('keydown', closeByEscape)
    }
  }, [isOpen, onClose])

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`}
      onClick={handleOverlay}
    >
      <div className={`popup__container popup__container_${name}`}>
        {children}
        <button
          className='button button_type_close'
          type='button'
          onClick={onClose}
        />
      </div>
    </div>
  )
}

export default Popup;