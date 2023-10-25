//Este archivo muestra el menu de opciones del dashboard de perfil administrador

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SidebarAdmin.css";
import Swal from "sweetalert2";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../../components/DashAdminComponents/SidebarAdmin.css";
import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import { useOrdenes } from "../OrdenesComponents/OrdenesContext/OrdenProvider";
import { useServicios } from "../ServicioComponents/ServiciosContext/ServicioProvider";
import { useUsuarios } from "../usuarioComponents/UsuariosContext/UsuarioProvider";
export function SidebarAdmin() {

  // Obtener los datos del usuario almacenados en el almacenamiento local
  const usuario = JSON.parse(localStorage.getItem("usuario"));

   // Inicializar estado para mostrar/ocultar el menú
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Acceder a la funcion de navegacion proporcionada por React Router
  const navigate = useNavigate();

  // Acceder a funciones de cierre de sesion de los contextos de productos, ordenes, servicios y usuarios
  const { cerrarSesionProductos } = useProductos();
  const { cerrarSesionOrdenes } = useOrdenes();
  const { cerrarSesionServicios } = useServicios();
  const { cerrarSesionUsuarios } = useUsuarios();

  // Funcion para cerrar la sesion de usuario
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
        // Limpiar los datos del usuario en el almacenamiento local y cerrar sesion en los contextos
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        cerrarSesionProductos();
        cerrarSesionOrdenes();
        cerrarSesionServicios();
        cerrarSesionUsuarios();

        // Mostrar un mensaje de sesion cerrada exitosamente y redirigir a la pagina principal
        Swal.fire(
          "¡Sesión cerrada!",
          "Has salido de la cuenta exitosamente",
          "success"
        ).then(() => {
          // redirigir a la pagina principal
          navigate("/");
        });
      }
    });
  };

  //Renderizado para mostrar la barra izquierda con opciones del dashboard
  return (
    <div>
      <div className="d-none d-md-block sidebar-container">
        <ul>
        <li>
            <Link to="/dashAdmin" className="separateIcon">
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
          <li>
            <Link to="/dashAdmin/ordenes" className="separateIcon">
              <box-icon
                type="solid"
                name="package"
                color="#ffffff"
                style={{ verticalAlign: "middle" }}
              ></box-icon>
              Órdenes
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

      {/*Este sidebar se mostrara solo cuando la pantalla sea reducida, es decir, sera el menu de opciones responsivo para cuando se visualice en pantallas mas pequeñas */}
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
                <li>
                  <Link to="/dashAdmin/ordenes" className="separateIcon">
                    <box-icon
                      type="solid"
                      name="package"
                      color="#ffffff"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>
                    Órdenes
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
