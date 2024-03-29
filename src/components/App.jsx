import React, { useState, useEffect } from "react";
import { CurrentUserContext } from '../context/CurrentUserContext';
import { Route, Switch, withRouter } from 'react-router-dom';
import api from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import PopupWithImage from "./PopupWithImage";
import ProtectedRoute from "./ProtectedRoute";
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import { checkToken, authorize, register } from "../utils/auth";
import acceptRegist from '../images/Tick.png';
import rejectRegist from '../images/Cross.png';

function App({ history, isOpen, onClose }) {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectCard] = useState({});
  const [currentUser, setCurrentUser] = useState({name: '', about: ''});
  const [cards, setCards] = useState([]);
  const [cardToBeDeleted, setCardToBeDeleted] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [imageForInfoTooltip, setImageForInfoTooltip] = useState('');
  const [textForInfoTooltip, setTextForInfoTooltip] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      handleTokenCheck(token);
    }
  }, []);

  useEffect(() => {
    if(loggedIn){
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, initialCards]) => {
          setCurrentUser(userInfo);
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn])

  const handleTokenCheck = async (token) => {
    try{
      const res = await checkToken(token);
      if(res.data.email) {
        setUserEmail(res.data.email);
        setLoggedIn(true);
        history.push('/')
      } else {
        localStorage.removeItem('token')
        setLoggedIn(false);
      }
    } catch {
      console.error("Ошибка");
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleDeleteCardClick(card) {
    setCardToBeDeleted(card);
    setIsDeleteCardPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleUpdateUser(userData) {
    api.patchUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(avatarLink) {
    api.patchAvatarInfo(avatarLink)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if(isLiked) {
      api.deleteLike(card)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      api.setLike(card)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        closeAllPopups();
        setCards((cards) => {
          return cards.filter(item => item !== card);
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleSignOut = () => {
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token')
      setLoggedIn(false);
      setUserEmail('');
    }
  }

  const handleSignIn = async ({ email, password }) => {
    try{
      const res = await authorize(email, password);
      localStorage.setItem('token', res.token);
      setUserEmail(email);
      setLoggedIn(true);
      history.push('/');
    } catch {
      setIsInfoTooltipPopupOpen(true);
      setImageForInfoTooltip(rejectRegist);
      setTextForInfoTooltip("Неверный Email или пароль");
    }
  }

  const handleRegistration = async ({ email, password }) => {
    try{
      const res = await register(email, password);
      setIsInfoTooltipPopupOpen(true);
      setImageForInfoTooltip(acceptRegist);
      setTextForInfoTooltip("Вы успешно зарегистрировались!");
      handleSignIn(email, password);
      setLoggedIn(true);
      history.push('/')
    } catch {
      setIsInfoTooltipPopupOpen(true);
      setImageForInfoTooltip(rejectRegist);
      setTextForInfoTooltip("Что-то пошло не так! Попробуйте ещё раз.");
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <ProtectedRoute 
          exact path="/" 
          loggedIn={loggedIn} 
        >
          <Header linkTitle="Выйти" link="/sign-in" onSignOut={handleSignOut} email={userEmail} loggedIn={loggedIn}/>
          <Main 
              onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick}
            />
          <Footer />
        </ProtectedRoute>
        <Route path="/sign-up">
          <Register onRegistration={handleRegistration} loggedIn={loggedIn}/>
        </Route>
        <Route path="/sign-in">
          <Login onLogIn={handleSignIn} loggedIn={loggedIn}/>
        </Route>
      </Switch>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      /> 

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <DeleteCardPopup
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleCardDelete}
        card={cardToBeDeleted}
      />
        
      <PopupWithImage
        name="image-zoom" 
        nameContainer="popup__container-image" 
        isOpen={isImagePopupOpen} 
        onClose = {closeAllPopups} 
        card={selectedCard}
      />
        
      <InfoTooltip
        name="info"
        nameContainer="popup__container-info"
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeAllPopups} 
        image={imageForInfoTooltip}
        text={textForInfoTooltip}
      />
    </CurrentUserContext.Provider>
  )
}

export default withRouter(App);