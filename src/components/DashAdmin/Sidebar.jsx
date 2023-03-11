import React from "react";
import { Link } from "react-router-dom";
import "./Slidebar.css"
export function Sidebar() {
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
        <Link to="/">Cerrar sesión</Link>
      </div>
    </div>
  );
}

