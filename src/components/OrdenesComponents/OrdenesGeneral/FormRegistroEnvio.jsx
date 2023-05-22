import { useUsuarios } from "../../usuarioComponents/UsuariosContext/UsuarioProvider";
import { FooterHome } from "../../HomePageComponents/FooterHome";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Container,
  FormGroup,
  FormCheck,
  FormControl
} from "react-bootstrap";
import "./FormRegistroEnvio.css";

export function FormRegistroEnvio() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { createDomicilioUsuario } = useUsuarios();
  const navigate = useNavigate();
  
  const [DomicilioData, setDomicilioData] = useState({
    nombre_ine: "",
    postal: "",
    estado: "",
    municipio_alcaldia: "",
    colonia: "",
    calle: "",
    numeroExterior: "",
    numeroInterior: "",
    calle1: "",
    calle2: "",
    descripcion: "",
    id_usuario: usuario.id,
  });

  const handleChange = (e) => {
    setDomicilioData({ ...DomicilioData, [e.target.name]: e.target.value });
  };
  
  const handleNumeroExteriorChange = (e) => {
    const { checked, value } = e.target;
    const numeroExterior = checked ? "SN" : "";
    setDomicilioData({ ...DomicilioData, numeroExterior });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Comprobar si alguno de los campos está vacío
    if (Object.values(DomicilioData).some((value) => value === "")) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      const domicilio = await createDomicilioUsuario(DomicilioData);

      if (domicilio != false) {
        setDomicilioData({
          nombre_ine: "",
          postal: "",
          estado: "",
          municipio_alcaldia: "",
          colonia: "",
          calle: "",
          numeroExterior: "",
          numeroInterior: "",
          calle1: "",
          calle2: "",
          descripcion: "",
          id_usuario: usuario.id,
        });
        navigate("/resumen-compras");
      } else {
        alert("Algo salió mal");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container className="divinfoenvio">
        <div className="titulo-info-envio">Completa tu información de envío</div>
        <div className="formulario-info-envio">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="nombre_ine">
                  <Form.Label>Nombre INE:</Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip>Ingresa el nombre completo que aparece en tu INE.</Tooltip>
                    }
                  >
                    <Form.Control
                      type="text"
                      name="nombre_ine"
                      value={DomicilioData.nombre_ine}
                      onChange={handleChange}
                      required
                    />
                  </OverlayTrigger>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="postal">
                  <Form.Label>Código postal:</Form.Label>
                  <Form.Control
                    type="text"
                    name="postal"
                    value={DomicilioData.postal}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="estado">
                  <Form.Label>Estado:</Form.Label>
                  <Form.Control
                    type="text"
                    name="estado"
                    value={DomicilioData.estado}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="municipio_alcaldia">
                  <Form.Label>Municipio o alcaldía:</Form.Label>
                  <Form.Control
                    type="text"
                    name="municipio_alcaldia"
                    value={DomicilioData.municipio_alcaldia}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="colonia">
                  <Form.Label>Colonia:</Form.Label>
                  <Form.Control
                    type="text"
                    name="colonia"
                    value={DomicilioData.colonia}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="calle">
                  <Form.Label>Calle:</Form.Label>
                  <Form.Control
                    type="text"
                    name="calle"
                    value={DomicilioData.calle}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col xs={12} md={6}>
                <FormGroup>
                  <Form.Label>Número exterior:</Form.Label>
                  <br />
                  <FormCheck
                    type="checkbox"
                    label="Sin número"
                    name="numeroExterior"
                    checked={DomicilioData.numeroExterior === "SN"}
                    onChange={handleNumeroExteriorChange}
                  />
                  <FormControl
                    type="text"
                    name="numeroExterior"
                    value={DomicilioData.numeroExterior !== "SN" ? DomicilioData.numeroExterior : "SN"}
                    onChange={handleChange}
                    disabled={DomicilioData.numeroExterior === "SN"}
                    required={!DomicilioData.numeroExterior === "SN"}
                  />
                </FormGroup>
              </Col>
              </Row><Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="numeroInterior">
                  <Form.Label>Número interior:</Form.Label>
                  <Form.Control
                    type="text"
                    name="numeroInterior"
                    value={DomicilioData.numeroInterior}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="calle1">
                  <Form.Label>Entre calle 1:</Form.Label>
                  <Form.Control
                    type="text"
                    name="calle1"
                    value={DomicilioData.calle1}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="calle2">
                  <Form.Label>Entre calle 2:</Form.Label>
                  <Form.Control
                    type="text"
                    name="calle2"
                    value={DomicilioData.calle2}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="descripcion">
              <Form.Label>Descripción:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={DomicilioData.descripcion}
                onChange={handleChange}
              />
            </Form.Group>
            
            <div className="botonDiv">
              <Button className="btnContinuar" variant="primary" type="submit">
                Continuar con la compra
              </Button>
            </div>
          </Form>
        </div>
      </Container>

      <FooterHome />
    </>
  );
}
