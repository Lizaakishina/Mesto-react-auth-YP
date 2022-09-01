import PopupWithForm from "./PopupWithForm";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useInput from '../utils/hooks/useInput';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const inputName = useInput({inputValue: currentUser.name});
  const inputAbout = useInput({inputValue: currentUser.about});

  /*const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
  };*/

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateUser({
      name: inputName.value,
      about: inputAbout.value
    });
  };

  useEffect(() => {
    inputName.reset();
    inputAbout.reset();
    inputName.setValue(currentUser.name);
    inputAbout.setValue(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_user-name"
        value={inputName.value}
        onChange={inputName.onChange}
        type="text"
        name="name"
        id="user-name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__input-error popup__input-error_type_user-name"></span>
      <input
        className="popup__input popup__input_type_user-job"
        value={inputAbout.value}
        onChange={inputAbout.onChange}
        type="text"
        name="job"
        id="user-job"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__input-error popup__input-error_type_user-job"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;