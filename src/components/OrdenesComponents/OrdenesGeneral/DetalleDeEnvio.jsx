import { useState, useEffect } from "react";
import { useUsuarios } from "../../usuarioComponents/UsuariosContext/UsuarioProvider";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./DetalleDeEnvio.css";
import { Link } from "react-router-dom";

export function DetalleDeEnvio() {
  const { domicilio, loadDomicilio } = useUsuarios();

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    const fetchData = async (userId) => {
      try {
        await loadDomicilio(userId);
      } catch (error) {
        console.error(error);
      }
    };

    if (usuario && usuario.id) {
      fetchData(usuario.id);
    }
  }, []);
  return (
    <Container className="domicilio-container">
      {domicilio ? (
        <div>
          <Row className="domicilio-row">
            <Col className="domicilio-col">
              <div >
                <h6>Nombre y Apellido:</h6>
                <p>{domicilio.nombre_ine}</p>
              </div>
              <div >
                <div >
                  <h6>Código Postal:</h6>
                  <p>{domicilio.postal}</p>
                </div>
                <div >
                  <h6>Estado:</h6>
                  <p>{domicilio.estado}</p>
                  <h6>Municipio o Alcaldía:</h6>
                  <p>{domicilio.municipio_alcaldia}</p>
                  <h6>Colonia:</h6>
                  <p>{domicilio.colonia}</p>
                  <h6>Calle:</h6>
                  <p>{domicilio.calle}</p>
                  <h6>Número Exterior:</h6>
                  <p>{domicilio.numeroExterior}</p>
                  <h6>Número Interior:</h6>
                  <p>{domicilio.numeroInterior}</p>
                  <h6>Calle 1:</h6>
                  <p>{domicilio.calle1}</p>
                  <h6>Calle 2:</h6>
                  <p>{domicilio.calle2}</p>
                  <h6>Descripción:</h6>
                  <p>{domicilio.descripcion}</p>
                </div>
              </div>
            </Col>
          </Row>
          <div className="cart-actions">

          <Link
                    to={`/dashClient/perfil/domicilio`}
                    style={{ textDecoration: "none" }}
                    title={"Clic para ver más información del producto"}
                  > 
            <Button variant="primary" className="btn-editar-domicilio">
              Editar domicilio
            </Button>
            </Link>
          </div>
        </div>
      ) : (
        <Row className="no-domicilio-row">
          <Col className="no-domicilio-col">
            <p className="no-domicilio-msg">NO HAY DOMICILIO</p>
          </Col>
        </Row>
      )}
    </Container>
  );
}
