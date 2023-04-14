import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { Favoritos } from "../FavoritosComponents/Favoritos";
import "./NavBar.css";
import { Carrito } from "../CarritoComponents/Carrito";
import axios from "axios";
import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import { useCategorias } from "../CategoriaComponents/CategoriasContext/CategoriaProvider";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export function Navbar({ onSearch }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const { vaciarFavoritos } = useProductos();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    vaciarFavoritos();
    // redirigir a la página de inicio de sesión o a la página principal
  };

  const categorias = [
    { id: 25, nombre: "Tecnología", link: "/productos/categoria/25" },
    { id: 26, nombre: "Entretenimiento", link: "/productos/categoria/26" },
    { id: 27, nombre: "Consultoría", link: "/productos/categoria/27" },
    { id: 28, nombre: "Salud", link: "/productos/categoria/28" },
    { id: 29, nombre: "Movilidad", link: "/productos/categoria/29" },
    {
      id: 30,
      nombre: "Enseñanza Aprendizaje",
      link: "/productos/categoria/30",
    },
    { id: 31, nombre: "Mascotas", link: "/productos/categoria/31" },
    { id: 32, nombre: "Vivienda", link: "/productos/categoria/32" },
    { id: 33, nombre: "Emprendimientos", link: "/productos/categoria/33" },
    { id: 34, nombre: "Belleza", link: "/productos/categoria/34" },
    { id: 35, nombre: "Caprichos y cariños", link: "/productos/categoria/35" },
    { id: 36, nombre: "Aparatos funcionales", link: "/productos/categoria/36" },
    { id: 37, nombre: "Moda", link: "/productos/categoria/37" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
   
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/">
          <img
            alt="e-commerce"
            src="../src/components/HomePageComponents/logo.png"
          />
        </Link>

        <div className="navbar-search">
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Buscar"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={handleSearch}
            >
              <box-icon name="search-alt" color="#ffffff"></box-icon>
            </Button>
          </InputGroup>
        </div>

        <div className="navbar-links">
          <ul>
            <li className="dropdown">
              <Link to="/categorias" className="dropbtn">
                Categorías
              </Link>
              <div className="dropdown-content">
                {categorias.map((categoria) => (
                  <Link
                    key={categoria.id}
                    to={`/productos/categoria/${categoria.id}`}
                  >
                    {categoria.nombre}
                  </Link>
                ))}
              </div>
            </li>
            <li>
              {" "}
              {usuario ? (
                <Link to="/blog">Blog</Link>
              ) : (
                <Link to="/login">Blog</Link>
              )}
            </li>
            <li>
              <Link to="/">Contacto</Link>
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
            {usuario ? (
              <li className="dropdown">
                {usuario.tipoUsuario === true ? (
                  <Link to="/dashAdmin" className="dropbtn">
                    <div className="iconuser">
                      <box-icon name="user"></box-icon>
                    </div>
                    {usuario.nombre}
                  </Link>
                ) : (
                  <Link to="/dashClient" className="dropbtn">
                    <div className="iconuser">
                      <box-icon name="user"></box-icon>
                    </div>
                    {usuario.nombre}
                  </Link>
                )}
                <div className="dropdown-content">
                  <Link to="/login" onClick={handleLogout}>
                    <div className="iconuser">
                      Salir
                      <box-icon name="log-out"></box-icon>
                    </div>
                  </Link>
                </div>
              </li>
            ) : (
              <li>
                <Link to="/login">Ingresa</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
