import { useState, useEffect } from "react";
import { useUsuarios } from "../../usuarioComponents/UsuariosContext/UsuarioProvider";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./DetalleDeEnvio.css";
import { Link } from "react-router-dom";

export function DetalleDeEnvio() {
  const { domicilio, loadDomicilio } = useUsuarios();  // Usa el contexto de Usuarios para obtener los datos del domicilio

  const usuario = JSON.parse(localStorage.getItem("usuario"));  // Obtiene información del usuario desde el almacenamiento local

  useEffect(() => {
    const fetchData = async (userId) => {
      try {
        await loadDomicilio(userId);  // Carga los detalles del domicilio del usuario
      } catch (error) {
        console.error(error);
      }
    };

    if (usuario && usuario.id) {
      fetchData(usuario.id);  // Si hay un usuario válido, se carga el domicilio
    }
  }, []);

  return (
    <Container className="domicilio-container my-4 p-3 border">
      <h1
        style={{
          textAlign: "center",
          color: "#333",
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        Detalles de envío
      </h1>

      {domicilio ? (  // Si hay datos de domicilio disponibles
        <div>
          <Row className="domicilio-row my-3">
            <Col className="domicilio-col p-4 bg-light">
              <div className="my-3 p-2 border">
                <h6>Nombre y Apellido:</h6>
                <p>{domicilio.nombre_ine}</p>
              </div>
              <div className="my-3 px-2 row border">
                <h5 style={{
                  textAlign: "center",
                  marginBottom: "1rem"
                }}>Domicilio de entrega</h5>
                <div className="col-md-6">
                  <div>
                    <h6>Domicilio:</h6>
                    <p>{domicilio.postal}</p>
                  </div>
                  <div>
                    <h6>Estado:</h6>
                    <p>{domicilio.estado}</p>
                    <h6>Municipio o Alcaldía:</h6>
                    <p>{domicilio.municipio_alcaldia}</p>
                    <h6>Colonia:</h6>
                    <p>{domicilio.colonia}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <h6>Calle:</h6>
                    <p>{domicilio.calle}</p>
                    <h6>Número Exterior:</h6>
                    <p>{domicilio.numeroExterior}</p>
                    <h6>Número Interior:</h6>
                    <p>{domicilio.numeroInterior}</p>
                  </div>
                  <div>
                    <h6>Calle 1:</h6>
                    <p>{domicilio.calle1}</p>
                    <h6>Calle 2:</h6>
                    <p>{domicilio.calle2}</p>{" "}
                  </div>
                </div>
                <div className="my-6 border">
                  <h6>Descripción:</h6>
                  <p>{domicilio.descripcion}</p>
                </div>
              </div>
            </Col>
          </Row>
          <div className="cart-actions">
            <Link
              to={
                usuario.tipoUsuario === 1
                  ? "/dashAdmin/perfil/domicilio"
                  : usuario.tipoUsuario === 0
                  ? "/dashClient/perfil/domicilio"
                  : "/"
              }
            >
              <Button
                variant="primary"
                className="btn-editar-domicilio bg-secondary border-0"
              >
                Editar domicilio
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        // Si no hay datos de domicilio
        <Row className="no-domicilio-row">
          <Col className="no-domicilio-col">
            <p className="no-domicilio-msg">NO HAY DOMICILIO</p>
          </Col>
        </Row>
      )}
    </Container>
  );
}
