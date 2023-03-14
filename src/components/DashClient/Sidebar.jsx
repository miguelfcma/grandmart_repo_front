import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export function Sidebar({ children }) {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    // redirigir a la página de inicio de sesión o a la página principal
  };

  return (
    <div className="sidebar-container">
      <ul>
        <li>
          <Link to="/dashClient">Dashboard</Link>
        </li>
        <li>
          <Link to="/dashClient/productos">Productos</Link>
        </li>
        <li>
          <Link to="/dashClient/servicios">Servicios</Link>
        </li>
        <li>
          <Link to="/dashClient/pedidos">Pedidos</Link>
        </li>
      </ul>
      <div className="user-options">
        <p>Nombre del usuario</p>
        <Link to="/" onClick={handleLogout}>
          Cerrar sesión
        </Link>
      </div>
      {children}
    </div>
  );
}
