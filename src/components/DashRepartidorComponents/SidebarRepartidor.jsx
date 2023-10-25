//Este archivo muestra el menu de opciones del dashboard de perfil repartidor

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SidebarRepartidor.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../../components/DashRepartidorComponents/SidebarRepartidor.css";
import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import { useOrdenes } from "../OrdenesComponents/OrdenesContext/OrdenProvider";
import { useServicios } from "../ServicioComponents/ServiciosContext/ServicioProvider";
import { useUsuarios } from "../usuarioComponents/UsuariosContext/UsuarioProvider";
import Swal from "sweetalert2";
export function SidebarRepartidor() {
   // Obtener los datos del usuario almacenados en el almacenamiento local
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Inicializar estado para mostrar/ocultar el menu
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
          // redirigir a la página principal
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
          {/* Sección de Ordenes */}
          <li>
            <Link to="/dashRepartidor/ordenes" className="separateIcon">
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
        </ul>
      </div>

      {/*Este sidebar se mostrara solo cuando la pantalla sea reducida, es decir, sera el menu de opciones responsivo para cuando se visualice en pantallas mas pequeñas */}
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
