import React, { useState } from "react";
import { useServicios } from "../../ServiciosContext/ServicioProvider";
import Swal from "sweetalert2";
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormCheck,
  FormControl,
} from "react-bootstrap";

export function FormInformacionServicioCliente({
  handleInfoServicioRegistrados,
  idServicio,
}) {
  const [servicioData, setServicioData] = useState({
    telefono1: "",
    telefono2: "",
    email: "",
    estado: "",
    municipioAlcaldia: "",
    colonia: "",
    calle: "",
    numeroExterior: "",
    numeroInterior: "",
    descripcion: "",
  });

  const { createDatosContactoServicio } = useServicios();
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar el formato del correo electrónico
    if (!validateEmail()) {
      return;
    }

    // Crear el objeto con todos los datos a enviar
    const datosServicio = {
      telefono1: servicioData.telefono1,
      telefono2: servicioData.telefono2,
      email: servicioData.email,
      estado: servicioData.estado,
      municipio_alcaldia: servicioData.municipioAlcaldia,
      colonia: servicioData.colonia,
      calle: servicioData.calle,
      numeroExterior: servicioData.numeroExterior,
      numeroInterior: servicioData.numeroInterior,
      descripcion: servicioData.descripcion,
      id_servicio: idServicio,
    };

    try {
      // Enviar los datos de contacto y domicilio mediante la función createDatosContactoServicio
      const status = await createDatosContactoServicio(datosServicio);
      if (status === 200) {
        // Mostrar una notificación de éxito si se envían los datos correctamente
        Swal.fire(
          "Éxito",
          "Los datos de contacto se han enviado correctamente",
          "success"
        );
      }

      // Llamar a la función de manejo para indicar que se han registrado los datos
      handleInfoServicioRegistrados();
    } catch (error) {
      console.error(error);
      // Mostrar una notificación de error si hay algún problema al enviar los datos
      Swal.fire(
        "Error",
        "Ha ocurrido un error al enviar los datos de contacto",
        "error"
      );
    }

    // Aquí también puedes enviar los datos de domicilio si es necesario
    // ...
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "numeroExterior" && !/^\d+$/.test(value)) {
      return; // Si no es un número, no actualizamos el estado
    }

    setServicioData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Reiniciar el mensaje de error del campo de correo electrónico
    if (name === "email") {
      setEmailError("");
    }
  };

  const handleNumeroExteriorChange = (e) => {
    const { checked, value } = e.target;
    const numeroExterior = checked ? "SN" : "";
    setServicioData((prevState) => ({
      ...prevState,
      numeroExterior: numeroExterior,
    }));
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
  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (servicioData.email && !emailPattern.test(servicioData.email)) {
      setEmailError("El formato del email es incorrecto.");
      return false;
    }

    return true;
  };

  return (
    <div>
      <h2>Información del servicio</h2>
      <Form onSubmit={handleSubmit}>
        <h3>Datos de contacto</h3>
        <FormGroup>
          <Form.Label>Teléfono 1:</Form.Label>
          <FormControl
            type="text"
            name="telefono1"
            value={servicioData.telefono1}
            onChange={handleChange}
            required
            pattern="[0-9]*"
            title="Ingresa solo números"
            maxLength={10}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Teléfono 2:</Form.Label>
          <FormControl
            type="text"
            name="telefono2"
            value={servicioData.telefono2}
            onChange={handleChange}
            pattern="[0-9]*"
            title="Ingresa solo números"
            maxLength={10}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Email{!servicioData.email && " (opcional)"}:</Form.Label>
          <FormControl
            type="text"
            name="email"
            value={servicioData.email}
            onChange={handleChange}
            isInvalid={!!emailError} // Agrega la propiedad `isInvalid` para mostrar el estilo de error
          />
          <Form.Control.Feedback type="invalid">
            {emailError} {/* Muestra el mensaje de error si existe */}
          </Form.Control.Feedback>
        </FormGroup>

        <h3>Dirección</h3>
        <FormGroup>
          <Form.Label>Estado:</Form.Label>
          <FormControl
            as="select"
            name="estado"
            value={servicioData.estado}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar estado...</option>
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </FormControl>
        </FormGroup>
        <FormGroup>
          <Form.Label>Municipio/Alcaldía:</Form.Label>
          <FormControl
            type="text"
            name="municipioAlcaldia"
            value={servicioData.municipioAlcaldia}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Colonia:</Form.Label>
          <FormControl
            type="text"
            name="colonia"
            value={servicioData.colonia}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Calle:</Form.Label>
          <FormControl
            type="text"
            name="calle"
            value={servicioData.calle}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Row>
          <Col xs={12} md={6}>
            <FormGroup>
              <Form.Label>Número exterior:</Form.Label>
              <br />
              <FormCheck
                type="checkbox"
                label="Sin número"
                name="numeroExterior"
                checked={servicioData.numeroExterior === "SN"}
                onChange={handleNumeroExteriorChange}
                
              />

              <FormControl
                type="text"
                name="numeroExterior"
                value={
                  servicioData.numeroExterior !== "SN"
                    ? servicioData.numeroExterior
                    : "SN"
                }
                onChange={handleChange}
                disabled={servicioData.numeroExterior === "SN"} // Establece el estado del campo según el valor del checkbox
                required 
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Form.Label>Número Interior (opcional):</Form.Label>
          <FormControl
            type="text"
            name="numeroInterior"
            value={servicioData.numeroInterior}
            onChange={handleChange}
          />
        </FormGroup>

        <h3>Descripción </h3>
        <FormGroup>
          <Form.Label>Descripción (opcional):</Form.Label>
          <FormControl
            as="textarea"
            name="descripcion"
            value={servicioData.descripcion}
            onChange={handleChange}
          />
        </FormGroup>

        <Button type="submit">Enviar</Button>
      </Form>
    </div>
  );
}
