import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SidebarCliente.css";
import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";

export function SidebarCliente({ children }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const {vaciarFavoritos} = useProductos();
  const [productoDropdown, setProductoDropdown] = useState(false);
  const [servicioDropdown, setServicioDropdown] = useState(false);

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
          <div
            className="dropdown"
            onMouseEnter={() => setProductoDropdown(true)}
            onMouseLeave={() => setProductoDropdown(false)}
          >
            <span>Productos</span>
            {productoDropdown && (
              <div className="dropdown-menu">
                <Link to="/dashClient/productos/nuevo">Registrar nuevo producto</Link>
                <Link to="/dashClient/productos">Ver productos existentes</Link>
              </div>
            )}
          </div>
        </li>
        <li>
          <div
            className="dropdown"
            onMouseEnter={() => setServicioDropdown(true)}
            onMouseLeave={() => setServicioDropdown(false)}
          >
            <span>Servicios</span>
            {servicioDropdown && (
              <div className="dropdown-menu">
                <Link to="/dashClient/servicios/nuevo">Registrar nuevo servicio</Link>
                <Link to="/dashClient/servicios">Ver servicios existentes</Link>
              </div>
            )}
          </div>
        </li>
        <li>
          <Link to="/dashClient/pedidos">Pedidos</Link>
        </li>
        <li>
          <Link to="/dashClient/perfil">Mi perfil</Link>
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
