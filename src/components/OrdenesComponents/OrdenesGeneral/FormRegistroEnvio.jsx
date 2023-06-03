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
  FormControl,
} from "react-bootstrap";
import "./FormRegistroEnvio.css";

export function FormRegistroEnvio() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { createDomicilioUsuario } = useUsuarios();
  const navigate = useNavigate();
  const [descripcionCounter, setDescripcionCounter] = useState(150);

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
    const { name, value } = e.target;

    if (name === "postal" && !/^\d+$/.test(value)) {
      return; // Si no es un número, no actualizamos el estado
    }
    if (name === "numeroExterior" && !/^\d+$/.test(value)) {
      return; // Si no es un número, no actualizamos el estado
    }
    if (name === "descripcion") {
      const remainingCharacters = 150 - value.length;
      setDescripcionCounter(remainingCharacters);
      setDomicilioData({ ...DomicilioData, [name]: value });
    }

    setDomicilioData({ ...DomicilioData, [name]: value });
  };

  const handlePostalBlur = (e) => {
    const { name, value } = e.target;

    // Validar si el campo es el número postal
    if (name === "postal") {
      let formattedValue = value;
      // Si no es un número, no actualizamos el estado
      if (!/^\d+$/.test(value)) {
        return;
      }
      // Rellenar con ceros si el número no tiene 5 dígitos
      formattedValue = value.padStart(5, "0");

      setDomicilioData({ ...DomicilioData, [name]: formattedValue });
    }
  };

  const handleNumeroExteriorChange = (e) => {
    const { checked, value } = e.target;
    const numeroExterior = checked ? "SN" : "";
    setDomicilioData({ ...DomicilioData, numeroExterior });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

 
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
  const estados = [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Coahuila",
    "Colima",
    "Distrito Federal",
    "Durango",
    "Estado De México",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas",
  ];
  return (
    <>
      <Container className="divinfoenvio">
        <div className="titulo-info-envio">
          Completa tu información de envío
        </div>
        <div className="formulario-info-envio">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="nombre_ine">
                  <Form.Label>Nombre y apellido:</Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip>
                        Ingresa el nombre completo tal cual figure en el INE o
                        IFE.
                      </Tooltip>
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
                    onBlur={handlePostalBlur} // Agrega el evento onBlur
                    maxLength={5}
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
                    as="select"
                    name="estado"
                    value={DomicilioData.estado}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar estado...</option>
                    {estados.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="municipio_alcaldia">
                  <Form.Label>Municipio/Alcaldía:</Form.Label>
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
                    value={
                      DomicilioData.numeroExterior !== "SN"
                        ? DomicilioData.numeroExterior
                        : "SN"
                    }
                    onChange={handleChange}
                    disabled={DomicilioData.numeroExterior === "SN"}
                    required={!DomicilioData.numeroExterior === "SN"}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="numeroInterior">
                  <Form.Label>Nº interior/Depto (opcional):</Form.Label>
                  <Form.Control
                    type="text"
                    name="numeroInterior"
                    value={DomicilioData.numeroInterior}
                    onChange={handleChange}
                   
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <Form.Label>¿Entre qué calles está? (opcional):</Form.Label>
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
              <Form.Label>
                Indicaciones adicionales de esta dirección:
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={DomicilioData.descripcion}
                onChange={handleChange}
                maxLength={150}
              />
              <div>Caracteres restantes: {descripcionCounter}</div>
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
