import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  console.log(getTotalCartAmount());

  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    useNavigate("/");
  };
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#appdownload"
          onClick={() => setMenu("Mobileapp")}
          className={menu === "Mobileapp" ? "active" : ""}
        >
          Mobileapp
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("ContactUs")}
          className={menu === "ContactUs" ? "active" : ""}
        >
          ContactUs
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search} alt="search" className="search icon" />
        <Link to="/cart">
          <div className="navbar-basket-icon icon">
            <img
              src={assets.cart}
              alt="cart"
              style={{ color: "#49557e" }}
              className="cart icon"
            />
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
        </Link>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile} alt="profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag} alt="bag" />
                <p>Orders</p>
              </li>
              <hr className="horiz" />
              <li onClick={logOut}>
                <img src={assets.logout} alt="bag" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
