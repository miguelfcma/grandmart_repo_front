import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { Favoritos } from "../FavoritosComponents/Favoritos";
import "./NavBar.css";
import { Carrito } from "../CarritoComponents/Carrito";
import axios from "axios";
import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
export function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const {vaciarFavoritos} = useProductos();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    vaciarFavoritos();
    // redirigir a la página de inicio de sesión o a la página principal
  };

  const categorias = [
    { id: 25, nombre: "Tecnología", link: "/productos/categoria/25" },
    { nombre: "Entretenimiento", link: "/productos?categoria=Entretenimiento" },
    { nombre: "Consultoría", link: "/productos?categoria=Consultoría" },
    { id: 28, nombre: "Salud", link: "/productos/categoria/28" },
    { nombre: "Movilidad", link: "/productos?categoria=Movilidad" },
    { nombre: "Enseñanza Aprendizaje", link: "/productos?categoria=Enseñanza Aprendizaje" },
    { nombre: "Mascotas", link: "/productos?categoria=Mascotas" },
    { nombre: "Vivienda", link: "/productos?categoria=Vivienda" },
    { nombre: "Emprendimientos", link: "/productos?categoria=Emprendimientos" },
    { nombre: "Belleza", link: "/productos?categoria=Belleza" },
    { nombre: "Caprichos y cariños", link: "/productos?categoria=Caprichos y cariños" },
    { nombre: "Aparatos funcionales", link: "/productos?categoria=Aparatos funcionales" },
    { nombre: "Moda", link: "/productos?categoria=Moda" },
    
  ];
  
  const handleSearch = async () => {
    try {
      const response = await axios.get(`/productos=${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/">
          <img alt="e-commerce" src="../src/components/HomePageComponents/logo.png" />
        </Link>

        <div className="navbar-search">
          <input
            type="text"
            placeholder="Buscar"
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="button" onClick={handleSearch}>
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
              {categorias.map((categoria) => (
                <Link key={categoria.id} to={`/productos/categoria/${categoria.id}`}>
                  {categoria.nombre}
                </Link>
              ))}
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
                  <Link to="/login">
                    Ingresa
                  </Link>
                </li>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
