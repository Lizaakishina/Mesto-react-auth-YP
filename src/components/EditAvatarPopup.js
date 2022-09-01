import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const inputAvatarRef = useRef();

  useEffect(() => {
    inputAvatarRef.current.value = "";
  }, [isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateAvatar(inputAvatarRef.value);
  };

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_avatar"
        type="url"
        name="avatar"
        ref={inputAvatarRef}
        id="avatar"
        placeholder="Ссылка на аватарку"
        minLength="2"
        required
      />
      <span className="popup__input-error popup__input-error_type_avatar"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;