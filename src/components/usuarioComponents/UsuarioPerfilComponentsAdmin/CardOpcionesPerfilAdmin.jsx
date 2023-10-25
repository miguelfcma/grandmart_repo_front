import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";


export function CardOpcionesPerfilAdmin() {
  /*Para mostrar el nombre de usuario */
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <>
      <Card style={{ width: "auto" }}>
        <Card.Body>
          <Card.Title style={{ fontSize: "35px" }}> {usuario.nombre + " " + usuario.apellidoPaterno + " " + usuario.apellidoMaterno}
          </Card.Title>
        </Card.Body>
      </Card>

      <br></br>

      <ListGroup>
        <ListGroup.Item>
          <Link to="/dashAdmin/perfil/datos" style={{width: '100%', textDecoration: 'none'}} className="separateIcon">
            <div className="d-flex align-items-center justify-content-between">
          <box-icon name="user"></box-icon>
          <div className="ms-2 me-auto"  style={{ color: 'black' }}>
            <div className="fw-bold">Mis datos</div>
            Email y número de teléfono.
          </div>
          </div>
          </Link>
        </ListGroup.Item>

        <ListGroup.Item>
          <Link to="/dashAdmin/perfil/seguridad" style={{width: '100%', textDecoration: 'none'}} className="separateIcon">
            <div className="d-flex align-items-center justify-content-between">
          <box-icon name='lock'></box-icon>
          <div className="ms-2 me-auto"  style={{ color: 'black' }}>
            <div className="fw-bold">Seguridad</div>
            Contraseña de acceso.
          </div>
          </div>
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}
