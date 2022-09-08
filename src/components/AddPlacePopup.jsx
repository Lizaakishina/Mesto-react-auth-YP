import React, { useRef, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import useFormValidation from "./../hooks/useFormValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace, value }) {
  const linkInputRef = useRef();
  const nameInputRef = useRef();
  const [buttonSubmitName, setButtonSubmitName] = useState('Создать');
  const {isButtonValid, handleTheFirstInputChange, handleTheSecondInputChange, resetValid} = useFormValidation(nameInputRef, linkInputRef);

  useEffect(() => {
    nameInputRef.current.value='';
    linkInputRef.current.value='';
    resetValid();
    setButtonSubmitName('Создать')
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    setButtonSubmitName('Сохранение...')
    onAddPlace({
      link: linkInputRef.current.value,
      name: nameInputRef.current.value
    });
  }

  return(
    <PopupWithForm 
      name="add-image" 
      title="Новое место"
      nameContainer="popup__container"
      isOpen={isOpen}
      onClose={onClose}
      titleBtn={buttonSubmitName}
      onSubmit={handleSubmit}
      isValid={isButtonValid}
    >
      <Input 
        inputType="text"
        inputClassType="place"
        placeholder="Название"
        id="input-name"
        minLength="2"
        maxLength="30"
        inputRef={nameInputRef}
        value={value}
        onChange={handleTheFirstInputChange}
        isOpen={isOpen}
      />
      
      <Input 
        inputType="url"
        inputClassType="link"
        placeholder="Ссылка на картинку"
        id="input-link"
        inputRef={linkInputRef}
        value={value}
        onChange={handleTheSecondInputChange}
        isOpen={isOpen}
      />
    </PopupWithForm>
  )
}

export default AddPlacePopup;