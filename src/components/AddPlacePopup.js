import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeLink = (evt) => {
    setLink(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onAddPlace({ name, link });
  };

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_card-name"
        value={name}
        onChange={handleChangeName}
        type="text"
        name="card-name"
        id="card-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__input-error popup__input-error_type_card-name"></span>
      <input
        className="popup__input popup__input_type_card-link"
        value={link}
        onChange={handleChangeLink}
        type="url"
        name="card-link"
        id="card-link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error popup__input-error_type_card-link"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;