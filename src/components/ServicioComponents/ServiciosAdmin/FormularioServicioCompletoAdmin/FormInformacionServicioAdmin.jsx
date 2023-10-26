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

// Componente para recopilar información del servicio por parte de los administradores
export function FormInformacionServicioAdmin({
  handleInfoServicioRegistrados, // Función para manejar el registro de datos
  idServicio, // Identificación del servicio
}) {
  // Estado para almacenar la información del servicio
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

  // Obtiene la función `createDatosContactoServicio` del contexto de servicios
  const { createDatosContactoServicio } = useServicios();

  // Estados para manejar mensajes de error
  const [emailError, setEmailError] = useState("");
  const [telefono1Error, setTelefono1Error] = useState("");
  const [telefono2Error, setTelefono2Error] = useState("");

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar el formato del correo electrónico
    if (!validateEmail()) {
      return;
    }

    // Crear un objeto con los datos a enviar
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
      // Enviar los datos de contacto y domicilio mediante la función `createDatosContactoServicio`
      const status = await createDatosContactoServicio(datosServicio);
      if (status === 201) {
        // Mostrar una notificación de éxito si los datos se envían correctamente
        Swal.fire(
          "Éxito",
          "Los datos de contacto se han guardado correctamente",
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
        "Ha ocurrido un error al guardar los datos de contacto",
        "error"
      );
    }
  };

  // Función para manejar cambios en los campos del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "numeroExterior") {
      // Eliminar caracteres no numéricos y limitar a una cierta longitud (por ejemplo, 5 dígitos)
      const numeroExterior = value.replace(/\D/g, "").slice(0, 5);

      // Actualiza el estado según el campo
      setServicioData({
        ...servicioData,
        [name]: numeroExterior,
      });
    }

    // Procesar el campo de teléfono
    if (name === "telefono1") {
      // Eliminar caracteres no numéricos y limitar a 10 dígitos
      const telefono1 = value.replace(/\D/g, "").slice(0, 10);
      setServicioData((prevFormulario) => ({
        ...prevFormulario,
        [name]: telefono1,
      }));
    } else if (name === "telefono2") {
      // Eliminar caracteres no numéricos y limitar a 10 dígitos
      const telefono2 = value.replace(/\D/g, "").slice(0, 10);
      setServicioData((prevFormulario) => ({
        ...prevFormulario,
        [name]: telefono2,
      }));
    } else {
      setServicioData((prevFormulario) => ({
        ...prevFormulario,
        [name]: value,
      }));
    }

    // Reiniciar el mensaje de error del campo de correo electrónico
    if (name === "email") {
      setEmailError("");
    }
  };

  // Función para manejar el cambio en la opción "Sin número" del número exterior
  const handleNumeroExteriorChange = (e) => {
    const { checked, value } = e.target;
    const numeroExterior = checked ? "SN" : "";
    setServicioData((prevState) => ({
      ...prevState,
      numeroExterior: numeroExterior,
    }));
  };

  // Lista de estados
  const estados = [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    // (Otras opciones de estados)
    "Yucatán",
    "Zacatecas",
  ];

  // Función para validar el formato del correo electrónico
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
            minLength={10}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Teléfono 2 (opcional):</Form.Label>
          <FormControl
            type="text"
            name="telefono2"
            value={servicioData.telefono2}
            onChange={handleChange}
            pattern="[0-9]*"
            title="Ingresa solo números"
            maxLength={10}
            minLength={10}
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

        <Button type="submit">Registrar</Button>
      </Form>
    </div>
  );
}
