import React from "react";
import { Link } from "react-router-dom";
import "./SidebarRepartidor.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../../components/DashRepartidorComponents/SidebarRepartidor.css";

export function SidebarRepartidor() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  };

  return (
    <div>
      <div className="d-none d-md-block sidebar-container">
        <ul>
          {/* Sección de Ordenes */}
          <li>
            <Link to="/dashRepartidor/ordenes" className="separateIcon">
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
            <Link to="/dashRepartidor/perfil" className="separateIcon">
              <box-icon
                type="solid"
                name="user-detail"
                color="#ffffff"
                style={{ verticalAlign: "middle" }}
              ></box-icon>
              Mi perfil
            </Link>
          </li>
          <div className="user-options">
            <div className="separateIcon">
              <br></br>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
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
        </ul>
      </div>

      <div className="d-md-none">
        <Button className="botonMenu" variant="primary" onClick={handleShow}>
          <box-icon name="menu" color="#ffffff" size="40px"></box-icon>
        </Button>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body>
            <div className="sidebar-container2">
              <ul>
                {/* Sección de Ordenes */}
                <li>
                  <Link to="/dashRepartidor/ordenes" className="separateIcon">
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
                  <Link to="/dashRepartidor/perfil" className="separateIcon">
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
