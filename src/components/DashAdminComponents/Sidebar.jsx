import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export function Sidebar({ children }) {

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
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
        <li>
          <Link to="/dashAdmin/database-backup">Database backup</Link>
        </li>
      </ul>
      <div className="user-options">
        <p>Bienvenido: {usuario.nombre+" "+usuario.apellidoPaterno+" "+usuario.apellidoMaterno}</p>
        <Link to="/" onClick={handleLogout}>
          Cerrar sesión
        </Link>
      </div>
      {children}
    </div>
  );
}
