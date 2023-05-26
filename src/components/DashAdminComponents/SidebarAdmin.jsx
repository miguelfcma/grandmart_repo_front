import React from "react";
import { Link } from "react-router-dom";
import "./SidebarAdmin.css";
import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../../components/DashAdminComponents/SidebarAdmin.css";

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
            <Link to="/dashAdmin/usuarios" className="separateIcon">
              <box-icon
                type="solid"
                name="user-account"
                color="#ffffff"
                style={{ verticalAlign: "middle" }}
              ></box-icon>
              Usuarios
            </Link>
          </li>
          <li>
            <Link to="/dashAdmin/productos" className="separateIcon">
              <box-icon
                type="solid"
                name="store"
                color="#ffffff"
                style={{ verticalAlign: "middle" }}
              ></box-icon>
              Productos
            </Link>
          </li>
          <li>
            <Link to="/dashAdmin/servicios" className="separateIcon">
              <box-icon
                name="store"
                color="#ffffff"
                style={{ verticalAlign: "middle" }}
              ></box-icon>
              Servicios
            </Link>
          </li>
          <li>
            <Link to="/dashAdmin/categorias" className="separateIcon">
              <box-icon
                name="category"
                color="#ffffff"
                style={{ verticalAlign: "middle" }}
              ></box-icon>
              Categorias
            </Link>
          </li>
          <li>
            <Link to="/dashAdmin/ventas" className="separateIcon">
              <box-icon
                name="package"
                color="#ffffff"
                style={{ verticalAlign: "middle" }}
              ></box-icon>
              Ventas
            </Link>
          </li>
          {/* <li>
            <Link to="/dashAdmin/compras" className="separateIcon">
              <box-icon
                name="bar-chart-alt"
                color="#ffffff"
                style={{ verticalAlign: "middle" }}
              ></box-icon>
              Compras
            </Link>
          </li> */}
          <li>
            <Link to="/dashAdmin/ordenes" className="separateIcon">
              <box-icon
                type="solid"
                name="package"
                color="#ffffff"
                style={{ verticalAlign: "middle" }}
              ></box-icon>
              Ordenes
            </Link>
          </li>

          <li>
            <Link to="/dashAdmin/preguntas" className="separateIcon">
              <box-icon
                name="comment"
                color="#ffffff"
                style={{ verticalAlign: "middle" }}
              ></box-icon>
              Preguntas/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Opiniones
            </Link>
          </li>
          <li>
            <Link to="/dashAdmin/denuncias" className="separateIcon">
              <box-icon
                name="comment-error"
                color="#ffffff"
                style={{ verticalAlign: "middle" }}
              ></box-icon>
              Denuncias
            </Link>
          </li>
          <li>
            <Link to="/dashAdmin/estadisticas" className="separateIcon">
              <box-icon
                name="line-chart"
                color="#ffffff"
                style={{ verticalAlign: "middle" }}
              ></box-icon>
              Estadísticas
            </Link>
          </li>
          <li>
            <Link to="/dashAdmin/database-backup" className="separateIcon">
              <box-icon
                name="data"
                color="#ffffff"
                style={{ verticalAlign: "middle" }}
              ></box-icon>
              Backups base de datos
            </Link>
          </li>
          <li>
            <Link to="/dashAdmin/perfil" className="separateIcon">
              <box-icon
                type="solid"
                name="user-detail"
                color="#ffffff"
                style={{ verticalAlign: "middle" }}
              ></box-icon>
              Mi perfil
            </Link>
          </li>
        </ul>
        <div className="user-options">
          <Link
            to="/"
            className="separateIcon"
            style={{ textDecoration: "none", color: "white" }}
          >
            <box-icon
              name="home"
              color="#ffffff"
              style={{ verticalAlign: "middle" }}
            ></box-icon>
            Página principal
          </Link>
          <br></br>
          <br></br>
          <Link
            to="/"
            onClick={handleLogout}
            style={{ textDecoration: "none", color: "white" }}
            className="separateIcon"
          >
            <box-icon
              name="log-out"
              color="#ffffff"
              style={{ verticalAlign: "middle" }}
            ></box-icon>
            Cerrar sesión
          </Link>
        </div>
      </div>

      <div className="d-md-none">
        <Button className="botonMenu" variant="primary" onClick={handleShow}>
          <box-icon name="menu" color="#ffffff" size="40px"></box-icon>
        </Button>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title style={{ fontSize: "25px" }}>
              Dashboard de administrador
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="sidebar-container2">
              <ul>
                <li>
                  <Link to="/dashAdmin/usuarios" className="separateIcon">
                    <box-icon
                      type="solid"
                      name="user-account"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Usuarios
                  </Link>
                </li>
                <li>
                  <Link to="/dashAdmin/productos" className="separateIcon">
                    <box-icon
                      type="solid"
                      name="store"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Productos
                  </Link>
                </li>
                <li>
                  <Link to="/dashAdmin/servicios" className="separateIcon">
                    <box-icon
                      name="store"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link to="/dashAdmin/categorias" className="separateIcon">
                    <box-icon
                      name="category"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Categorias
                  </Link>
                </li>
                <li>
                  <Link to="/dashAdmin/ventas" className="separateIcon">
                    <box-icon
                      type="solid"
                      name="shopping-bags"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Ventas
                  </Link>
                </li>
                {/* <li>
                  <Link to="/dashAdmin/compras" className="separateIcon">
                    <box-icon
                      name="bar-chart-alt"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Compras
                  </Link>
                </li> */}
                <li>
                  <Link to="/dashAdmin/ordenes" className="separateIcon">
                    <box-icon
                      type="solid"
                      name="package"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Ordenes
                  </Link>
                </li>

                <li>
                  <Link to="/dashAdmin/preguntas" className="separateIcon">
                    <box-icon
                      name="comment"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Preguntas / Opiniones
                  </Link>
                </li>
                <li>
                  <Link to="/dashAdmin/denuncias" className="separateIcon">
                    <box-icon
                      name="comment-error"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Denuncias
                  </Link>
                </li>
                <li>
                  <Link to="/dashAdmin/estadisticas" className="separateIcon">
                    <box-icon
                      name="line-chart"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Estadísticas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashAdmin/database-backup"
                    className="separateIcon"
                  >
                    <box-icon
                      name="data"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Backups base de datos
                  </Link>
                </li>
                <li>
                  <Link to="/dashAdmin/perfil" className="separateIcon">
                    <box-icon
                      type="solid"
                      name="user-detail"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Mi perfil
                  </Link>
                </li>
              </ul>
              <div className="user-options">
                <div className="separateIcon">
                  <br></br>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <box-icon
                      name="home"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Página principal
                  </Link>
                  <br></br>
                  <br></br>
                  <Link
                    to="/"
                    onClick={handleLogout}
                    style={{ textDecoration: "none", color: "white" }}
                    className="iconuser"
                  >
                    <box-icon
                      name="log-out"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Cerrar sesión
                  </Link>
                </div>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
}
