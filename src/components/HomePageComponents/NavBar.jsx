import { Link } from "react-router-dom";
import React from "react";
import { Favoritos } from "../FavoritosComponents/Favoritos";
import "./NavBar.css";
import { Carrito } from "../CarritoComponents/Carrito";

export function Navbar({ setSearchTerm }) {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
   
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/">
          <img alt="e-commerce" src="./logo.png" />
        </a>

        <div className="navbar-search">
          <input
            type="text"
            placeholder="Buscar"
            name="search"
            onChange={handleSearchChange}
          />
          <button type="submit">
            <box-icon name="search-alt" color="#ffffff"></box-icon>
          </button>
        </div>

        <div className="navbar-links">
          <ul>
            <li className="dropdown">
              <a href="#" className="dropbtn">
                Categorías
              </a>
              <div className="dropdown-content">
                <a href="#">Salud</a>
                <a href="#">Hogar</a>
                <a href="#">Entretenimiento</a>
              </div>
            </li>
            <li>
              <a href="/">Ofertas</a>
            </li>
            <li>
              <a href="/">Vender</a>
            </li>
            <li>
            <div className="navbar-links">
                <Favoritos />
            </div>
            </li>

            <li>
            <div className="navbar-links navbar-carrito">
                <Carrito />
            </div>
            </li>

            <li>
              <a href="/login">
                <div className="iconuser">
                  <box-icon name="user"></box-icon>
                </div>
                Sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
