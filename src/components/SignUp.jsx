import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useFormValidation from "../hooks/useFormValidation";
import Input from "./Input";

const SignUp = ({ title, titleBtn, isLogin, onSubmit, value }) => {
  const userEmail = useRef();
  const userPassword = useRef();
  const {isButtonValid, handleTheFirstInputChange, handleTheSecondInputChange} = useFormValidation(userEmail, userPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      email: userEmail.current.value,
      password: userPassword.current.value
    })
  }

  return(
    <div className="sign-up__container">
      <h2 className="form__title">{title}</h2>
      <form className="form form__page" name="sing-in" onSubmit={handleSubmit}>
        <Input 
          inputType="email"
          inputClassType="registration"
          placeholder="Email"
          id="input-email"
          minLength="2"
          maxLength="40"
          inputRef={userEmail}
          value={value}
          onChange={handleTheFirstInputChange}
        />

        <Input 
          inputType="password"
          inputClassType="registration"
          placeholder="Пароль"
          id="input-password"
          minLength="8"
          maxLength="50"
          inputRef={userPassword}
          value={value}
          onChange={handleTheSecondInputChange}
        />
        <button
          className={`button button_type_authorization ${!isButtonValid && "button_inactive"} ${isLogin && "button_type_login"}`}
          value={titleBtn}
          disabled={!isButtonValid}
        >
          {titleBtn}
        </button>
        {!isLogin && <p className="sign-up__description">Уже зарегистрированы? <Link to="/sign-in" className="link">Войти</Link></p>}
      </form>
    </div>
  )
}

export default SignUp;