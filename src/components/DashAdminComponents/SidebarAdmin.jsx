import React from "react";
import { Link } from "react-router-dom";
import "./SidebarAdmin.css";
import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../../components/DashAdminComponents/SidebarAdmin.css"

export function SidebarAdmin() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  //const {vaciarFavoritos} = useProductos();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    //vaciarFavoritos();
    // redirigir a la página de inicio de sesión o a la página principal
  };

  return (
    <div>
      <div className="d-none d-md-block sidebar-container">
        <ul>
          <li>
            <Link to="/dashAdmin">Dashboard</Link>
          </li>
          <li>
            <Link to="/dashAdmin/productos">Productos</Link>
          </li>
          <li>
            <Link to="/dashAdmin/servicios">Servicios</Link>
          </li>
          <li>
            <Link to="/dashAdmin/categorias">Categorias</Link>
          </li>
          <li>
            <Link to="/dashAdmin/pedidos">Pedidos</Link>
          </li>
          <li>
            <Link to="/dashAdmin/compras">Compras</Link>
          </li>
          <li>
            <Link to="/dashAdmin/ordenes">Ordenes</Link>
          </li>
          <li>
            <Link to="/dashAdmin/perfil">Mi perfil</Link>
          </li>
          <li>
            <Link to="/dashAdmin/preguntas">Preguntas</Link>
          </li>
          <li>
            <Link to="/dashAdmin/estadisticas">Estadísticas</Link>
          </li>
        </ul>
        <div className="user-options">
          <p>
            Bienvenido:{" "}
            {usuario.nombre +
              " " +
              usuario.apellidoPaterno +
              " " +
              usuario.apellidoMaterno}
          </p>

          <br></br>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Página principal
          </Link>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <Link
            to="/"
            onClick={handleLogout}
            style={{ textDecoration: "none", color: "white" }}
            className="iconuser"
          >
            <box-icon name="log-out" color="#ffffff"></box-icon>Cerrar sesión
          </Link>
        </div>
      </div>

      <div className="d-md-none">
        <Button className="botonMenu" variant="primary" onClick={handleShow}>
        <box-icon name='menu' color='#ffffff' size='40px'></box-icon>
        </Button>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title style= {{fontSize: "25px"}}>Dashboard de administrador</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="sidebar-container2">
              <ul>
                <li>
                  <Link to="/dashAdmin">Dashboard</Link>
                </li>
                <li>
                  <Link to="/dashAdmin/productos">Productos</Link>
                </li>
                <li>
                  <Link to="/dashAdmin/servicios">Servicios</Link>
                </li>
                <li>
                  <Link to="/dashAdmin/categorias">Categorias</Link>
                </li>
                <li>
                  <Link to="/dashAdmin/pedidos">Pedidos</Link>
                </li>{" "}
                <li>
                  <Link to="/dashAdmin/ordenes">Ordenes</Link>
                </li>
                <li>
                  <Link to="/dashAdmin/perfil">Mi perfil</Link>
                </li>
                <li>
                  <Link to="/dashAdmin/preguntas">Preguntas</Link>
                </li>
                <li>
                  <Link to="/dashAdmin/estadisticas">Estadísticas</Link>
                </li>
              </ul>
              <div className="user-options">
                <p>
                  Bienvenido:{" "}
                  {usuario.nombre +
                    " " +
                    usuario.apellidoPaterno +
                    " " +
                    usuario.apellidoMaterno}
                </p>

                <br></br>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  Página principal
                </Link>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <Link
                  to="/"
                  onClick={handleLogout}
                  style={{ textDecoration: "none", color: "white" }}
                  className="iconuser"
                >
                  <box-icon name="log-out" color="#ffffff"></box-icon>Cerrar sesión
                </Link>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
}
