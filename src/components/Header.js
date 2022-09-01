import logo from "../images/mesto.svg";

const Header = () => {
  return (
    <header className="header">
      <a href="./index.html" className="header__link">
        <img src={logo} className="header__logo" alt="Лого Mesto" />
      </a>
    </header>
  );
};

export default Header;