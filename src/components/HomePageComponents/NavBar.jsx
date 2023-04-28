import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { Favoritos } from "../FavoritosComponents/Favoritos";
import { Carrito } from "../CarritoComponents/Carrito";
import axios from "axios";
import { useProductos } from "../ProductoComponents/ProductosContext/ProductoProvider";
import { useCategorias } from "../CategoriaComponents/CategoriasContext/CategoriaProvider";

import "./NavBar.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import InputGroup from "react-bootstrap/InputGroup";

export function Navbar1({ onSearch }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  //const { vaciarFavoritos } = useProductos();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    //vaciarFavoritos();
    // redirigir a  la página principal
    window.location.href = "/";
  };

  const categorias = [
    { id: 25, nombre: "Tecnología", link: "/productos/categoria/25" },
    { id: 26, nombre: "Entretenimiento", link: "/productos/categoria/26" },
    { id: 27, nombre: "Consultoría", link: "/productos/categoria/27" },
    { id: 28, nombre: "Salud", link: "/productos/categoria/28" },
    { id: 29, nombre: "Movilidad", link: "/productos/categoria/29" },
    { id: 30, nombre: "Enseñanza Aprendizaje", link: "/productos/categoria/30"},
    { id: 31, nombre: "Mascotas", link: "/productos/categoria/31" },
    { id: 32, nombre: "Vivienda", link: "/productos/categoria/32" },
    { id: 33, nombre: "Emprendimientos", link: "/productos/categoria/33" },
    { id: 34, nombre: "Belleza", link: "/productos/categoria/34" },
    { id: 35, nombre: "Caprichos y cariños", link: "/productos/categoria/35" },
    { id: 36, nombre: "Aparatos funcionales", link: "/productos/categoria/36" },
    { id: 37, nombre: "Moda", link: "/productos/categoria/37" }
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Container className="navbar-container">
        <Navbar.Brand href="/">
          <img
            alt="e-commerce"
            src="https://firebasestorage.googleapis.com/v0/b/grandmart-51065.appspot.com/o/src%2Flogo.png?alt=media&token=6c393680-5c89-4708-a0d3-f8ffcb0fc379"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="my-navbar-collapse">
          <InputGroup className="navbar-search">
            <Form.Control
              type="text"
              placeholder="Buscar"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <Button onClick={handleSearch}>
              <box-icon name="search-alt" color="#ffffff">
              </box-icon>
            </Button>
          </InputGroup>

          <Nav className="elementosnavbar" >
            <NavDropdown
              title="Categorías"
              id="collasible-nav-dropdown"
              onMouseEnter={(e) => {
                e.currentTarget.click();
              }}
            >
              <Nav.Link href="/categorias" >
                {categorias.map((categoria) => (
                  <NavDropdown.Item
                    key={categoria.id}
                    href={`/productos/categoria/${categoria.id}/${categoria.nombre}`}
                  >
                    {categoria.nombre}
                  </NavDropdown.Item>
                ))}
                <NavDropdown.Item href="/servicios">Servicios</NavDropdown.Item>
                <NavDropdown.Divider />
                  <NavDropdown.Item href="/categorias">
                    Ver más categorías
                  </NavDropdown.Item>
              </Nav.Link>
            </NavDropdown>

            <Nav.Link href="/blog">Blog</Nav.Link>
            <Nav.Link href="/">Contacto</Nav.Link>
            <Nav.Link>
               <Favoritos />
             
            </Nav.Link>
            <Nav.Link>
            <Carrito />   
            </Nav.Link>
            {usuario ? (
              <NavDropdown title={usuario.nombre} id="collasible-nav-dropdown">
                {usuario.tipoUsuario === true ? (
                  <NavDropdown.Item href="/dashAdmin">
                    <box-icon name="user" style={{ verticalAlign: "middle" }}></box-icon> Administración
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item href="/dashClient">
                    <box-icon name="user" style={{ verticalAlign: "middle" }}></box-icon> Mi cuenta
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <box-icon name="log-out" style={{ verticalAlign: "middle" }}></box-icon> Salir
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login">Ingresa</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
