import React from "react";
import { Link } from "react-router-dom";
import "./Slidebar.css";

export function Sidebar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
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
        <p>Nombre del usuario</p>
        <Link to="/" onClick={handleLogout}>
          Cerrar sesión
        </Link>
      </div>
    </div>
  );
}
