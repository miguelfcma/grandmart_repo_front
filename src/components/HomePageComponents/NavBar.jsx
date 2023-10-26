// Este archivo es para la interfaz de barra de navegación, adjunta todos los componentes que lo conforman

import { useState } from "react";
import React from "react";
import { Favoritos } from "../FavoritosComponents/Favoritos";
import { Carrito } from "../CarritoComponents/Carrito";
import axios from "axios";
import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import { useOrdenes } from "../OrdenesComponents/OrdenesContext/OrdenProvider";
import { useServicios } from "../ServicioComponents/ServiciosContext/ServicioProvider";
import { useUsuarios } from "../usuarioComponents/UsuariosContext/UsuarioProvider";
import "./NavBar.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Swal from "sweetalert2";

export function Navbar1({ onSearch }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();
  const { cerrarSesionProductos } = useProductos();
  const { cerrarSesionOrdenes } = useOrdenes();
  const { cerrarSesionServicios } = useServicios();
  const { cerrarSesionUsuarios } = useUsuarios();

  // Manejar el cierre de sesión
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

  // Definición de categorías
  const categorias = [
    { id: 25, nombre: "Tecnología", link: "/productos/categoria/25" },
    { id: 26, nombre: "Entretenimiento", link: "/productos/categoria/26" },
    { id: 27, nombre: "Consultoría", link: "/productos/categoria/27" },
    { id: 28, nombre: "Salud", link: "/productos/categoria/28" },
    { id: 29, nombre: "Movilidad", link: "/productos/categoria/29" },
    { id: 30, nombre: "Enseñanza Aprendizaje", link: "/productos/categoria/30" },
    { id: 31, nombre: "Mascotas", link: "/productos/categoria/31" },
    { id: 32, nombre: "Vivienda", link: "/productos/categoria/32" },
    { id: 33, nombre: "Emprendimientos", link: "/productos/categoria/33" },
    { id: 34, nombre: "Belleza", link: "/productos/categoria/34" },
    { id: 35, nombre: "Caprichos y cariños", link: "/productos/categoria/35" },
    { id: 36, nombre: "Aparatos funcionales", link: "/productos/categoria/36" },
    { id: 37, nombre: "Moda", link: "/productos/categoria/37" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  // Manejar la búsqueda
  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Container className="navbar-container">
        <Navbar.Brand as={Link} to="/">
          <img
            alt="e-commerce"
            src="https://firebasestorage.googleapis.com/v0/b/grandmart-51065.appspot.com/o/src%2Flogo.png?alt=media&token=6c393680-5c89-4708-a0d3-f8ffcb0fc379"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="my-navbar-collapse"
        >
          <InputGroup className="navbar-search">
            <Form.Control
              type="text"
              placeholder="Buscar"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Button onClick={handleSearch}>
              <box-icon name="search-alt" color="#ffffff"></box-icon>
            </Button>
          </InputGroup>

          <Nav className="elementosnavbar">
            <NavDropdown
              title="Categorías"
              id="collasible-nav-dropdown"
              onMouseEnter={(e) => {
                e.currentTarget.click();
              }}
            >
              {categorias.map((categoria) => (
                <NavDropdown.Item
                  key={categoria.id}
                  as={Link}
                  to={`/productos/categoria/${categoria.id}/${categoria.nombre}`}
                >
                  {categoria.nombre}
                </NavDropdown.Item>
              ))}
              <NavDropdown.Item as={Link} to="/servicios">
                Servicios
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/categorias">
                Ver más categorías
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/blog">
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto">
              Contacto
            </Nav.Link>
            <Nav.Link>
              <Favoritos />
            </Nav.Link>
            <Nav.Link>
              <Carrito />
            </Nav.Link>
            {usuario ? (
              <NavDropdown title={usuario.nombre} id="collasible-nav-dropdown">
                {usuario.tipoUsuario === 1 ? (
                  <NavDropdown.Item as={Link} to="/dashAdmin">
                    <box-icon
                      name="user"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>{" "}
                    Administración
                  </NavDropdown.Item>
                ) : usuario.tipoUsuario === 0 ? (
                  <NavDropdown.Item as={Link} to="/dashClient">
                    <box-icon
                      name="user"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>{" "}
                    Mi cuenta
                  </NavDropdown.Item>
                ) : usuario.tipoUsuario === 2 ? (
                  <NavDropdown.Item as={Link} to="/dashRepartidor">
                    <box-icon
                      name="user"
                      style={{ verticalAlign: "middle" }}
                    ></box-icon>{" "}
                    Repartidor
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item>
                    Tipo de usuario desconocido
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <box-icon
                    name="log-out"
                    style={{ verticalAlign: "middle" }}
                  ></box-icon>{" "}
                  Salir
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login">
                Ingresa
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
