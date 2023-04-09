import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";

export function Sidebar({ children }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const {vaciarFavoritos} = useProductos();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    vaciarFavoritos();
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
        <li>
          <Link to="/dashClient/perfil">Mi perfil</Link>
        </li>
        <li>
          <Link to="/dashClient/preguntas">Preguntas</Link>
        </li>
        <li>
          <Link to="/dashClient/estadisticas">Estadísticas</Link>
        </li>
      </ul>
      <div className="user-options">
        <p>Bienvenido: {usuario.nombre+" "+usuario.apellidoPaterno+" "+usuario.apellidoMaterno}</p>

        <br></br>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Página principal</Link>
        <br></br><br></br><br></br><br></br><br></br><br></br>

        <Link to="/" onClick={handleLogout} style={{ textDecoration: 'none', color: 'white' }} className="iconuser"><box-icon name='log-out' color='#ffffff' ></box-icon>Cerrar sesión</Link>
      </div>
      {children}
    </div>
  );
}
