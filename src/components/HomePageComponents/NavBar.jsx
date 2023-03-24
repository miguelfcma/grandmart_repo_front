import { Link } from "react-router-dom";
import React from "react";
import { Favoritos } from "../FavoritosComponents/Favoritos";
import "./NavBar.css";
import { Carrito } from "../CarritoComponents/Carrito";

export function Navbar({ setSearchTerm }) {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
   
  };
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    // redirigir a la página de inicio de sesión o a la página principal
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/">
          <img alt="e-commerce" src="./logo.png" />
        </Link>

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
              <Link to="#" className="dropbtn">
                Categorías
              </Link>
              <div className="dropdown-content">
                <Link to="#">Salud</Link>
                <Link to="#">Hogar</Link>
                <Link to="#">Entretenimiento</Link>
              </div>
            </li>
            <li>
              <Link to="/">Ofertas</Link>
            </li>
            <li>
              <Link to="/">Vender</Link>
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
              {usuario ? (
                <Link to="/login" onClick={handleLogout}>
                  <div className="iconuser">
                    <box-icon name="log-out"></box-icon>
                  </div>
                  Cerrar Sesión
                </Link>
                
              ) : (
                <Link to="/login">
                  <div className="iconuser">
                    <box-icon name="user"></box-icon>
                  </div>
                  Iniciar Sesión
                </Link>
              )}
            </li>
            {usuario ? (usuario.nombre ) : (<di></di>)}
          </ul>
        </div>
      </div>
    </nav>
  );
}
