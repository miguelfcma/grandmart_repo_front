import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export function Sidebar({ children }) {

  const nombre = localStorage.getItem("nombreUser");
  console.log(nombre)
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUser");
    localStorage.removeItem("nombreUser");
    localStorage.removeItem("apellidoPaternoUser");
    localStorage.removeItem("apellidoMaternoUser");
    localStorage.removeItem("emailUser");
    localStorage.removeItem("tipoUsuarioUser");

    // redirigir a la página de inicio de sesión o a la página principal
  };

  return (
    <div className="sidebar-container">
      <ul>
        <li>
          <Link to="/dashAdmin">Dashboard</Link>
        </li>
        <li>
          <Link to="/dashAdmin/usuarios">Usuarios</Link>
        </li>
        <li>
          <Link to="/dashAdmin/categorias">Categorias</Link>
        </li>
        <li>
          <Link to="/dashAdmin/productos">Productos</Link>
        </li>
        <li>
          <Link to="/dashAdmin/servicios">Servicios</Link>
        </li>
      </ul>
      <div className="user-options">
        <p>Bienvenido: {nombre}</p>
        <Link to="/" onClick={handleLogout}>
          Cerrar sesión
        </Link>
      </div>
      {children}
    </div>
  );
}
