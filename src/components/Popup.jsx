import React, {useEffect} from "react";

function Popup({name, nameContainer, isOpen, onClose, children}) {
  
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [isOpen, onClose])

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={handleOverlay}
    >
      <div className={nameContainer}>
        <button
          onClick={onClose}
          type="button"
          className="button button_type_close"
          aria-label="Закрыть окно"
        />
        {children}
      </div>
    </div>
  );
}

export default Popup;