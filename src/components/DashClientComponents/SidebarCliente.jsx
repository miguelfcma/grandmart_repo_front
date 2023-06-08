import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SidebarCliente.css";
import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../../components/DashClientComponents/SidebarCliente.css";
import Swal from "sweetalert2";
import { useOrdenes } from "../OrdenesComponents/OrdenesContext/OrdenProvider";
import { useServicios } from "../ServicioComponents/ServiciosContext/ServicioProvider";
import { useUsuarios } from "../usuarioComponents/UsuariosContext/UsuarioProvider";
export function SidebarCliente({ children }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  //const { vaciarFavoritos } = useProductos();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const { cerrarSesionProductos } = useProductos();
  const { cerrarSesionOrdenes } = useOrdenes();
  const { cerrarSesionServicios } = useServicios();
  const { cerrarSesionUsuarios } = useUsuarios();

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se cerrará tu sesión actual",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        cerrarSesionProductos();
        cerrarSesionOrdenes();
        cerrarSesionServicios();
        cerrarSesionUsuarios();

        Swal.fire(
          "¡Sesión cerrada!",
          "Has salido de la cuenta exitosamente",
          "success"
        ).then(() => {
          // redirigir a la página principal
          navigate("/");
        });
      }
    });
  };

  return (
    <div>
      <div className="d-none d-md-block sidebar-container">
        <ul>
          <li>
            <Link to="/dashClient" className="separateIcon">
              <box-icon
                type="solid"
                name="dashboard"
                color="#ffffff"
                style={{ verticalAlign: "middle" }}
              ></box-icon>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/dashClient/productos" className="separateIcon">
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
            <Link to="/dashClient/servicios" className="separateIcon">
              <box-icon
                name="store"
                color="#ffffff"
                style={{ verticalAlign: "middle" }}
              ></box-icon>
              Servicios
            </Link>
          </li>
          <li>
            <Link to="/dashClient/compras" className="separateIcon">
              <box-icon
                type="solid"
                name="shopping-bags"
                color="#ffffff"
                style={{ verticalAlign: "middle" }}
              ></box-icon>
              Compras
            </Link>
          </li>
          <li>
            <Link to="/dashClient/ventas" className="separateIcon">
              <box-icon
                name="package"
                color="#ffffff"
                style={{ verticalAlign: "middle" }}
              ></box-icon>
              Ventas
            </Link>
          </li>

          <li>
            <Link to="/dashClient/preguntas" className="separateIcon">
              <box-icon
                name="comment"
                color="#ffffff"
                style={{ verticalAlign: "middle" }}
              ></box-icon>
              Preguntas/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Opiniones
            </Link>
          </li>

          <li>
            <Link to="/dashClient/perfil" className="separateIcon">
              <box-icon
                type="solid"
                name="user-detail"
                color="#ffffff"
                style={{ verticalAlign: "middle" }}
              ></box-icon>
              Mi perfil
            </Link>
          </li>
          <li>
            <Link to="/dashClient/estadisticas" className="separateIcon">
              <box-icon
                name="line-chart"
                color="#ffffff"
                style={{ verticalAlign: "middle" }}
              ></box-icon>
              Estadísticas
            </Link>
          </li>
        </ul>
        <br></br>
        <br></br>
        <br></br>
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

          <button onClick={handleLogout} className="iconuser">
            <box-icon
              name="log-out"
              color="#ffffff"
              style={{ verticalAlign: "middle" }}
            ></box-icon>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="d-md-none">
        <Button className="botonMenu" variant="primary" onClick={handleShow}>
          <box-icon name="menu" color="#ffffff" size="40px"></box-icon>
        </Button>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title style={{ fontSize: "25px" }}>
              Dashboard
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="sidebar-container2">
              <ul>
                <li>
                  <Link to="/dashClient" className="separateIcon">
                    <box-icon
                      type="solid"
                      name="user-account"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashClient/productos" className="separateIcon">
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
                  <Link to="/dashClient/servicios" className="separateIcon">
                    <box-icon
                      name="store"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link to="/dashClient/compras" className="separateIcon">
                    <box-icon
                      type="solid"
                      name="shopping-bags"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Compras
                  </Link>
                </li>
                <li>
                  <Link to="/dashClient/ventas" className="separateIcon">
                    <box-icon
                      name="package"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Ventas
                  </Link>
                </li>
                <li>
                  <Link to="/dashClient/preguntas" className="separateIcon">
                    <box-icon
                      name="comment"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Preguntas/Opiniones
                  </Link>
                </li>
                <li>
                  <Link to="/dashClient/perfil" className="separateIcon">
                    <box-icon
                      type="solid"
                      name="user-detail"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Mi perfil
                  </Link>
                </li>
                <li>
                  <Link to="/dashClient/estadisticas" className="separateIcon">
                    <box-icon
                      name="line-chart"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Estadísticas
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
                  <button onClick={handleLogout} className="iconuser">
                    <box-icon
                      name="log-out"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
}
