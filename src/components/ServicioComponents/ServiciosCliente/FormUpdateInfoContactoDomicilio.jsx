import React, { useState, useEffect } from "react";
import { useServicios } from "../ServiciosContext/ServicioProvider";
import Swal from "sweetalert2";
import {
  Form,
  FormGroup,
  FormControl,
  FormCheck,
  Button,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

export function FormUpdateInfoContactoDomicilio({ onSubmit, servicio }) {
  const {
    obtenerDatosContactoServicio,
    actualizarDatosContactoServicioCliente,
  } = useServicios();
  const [emailError, setEmailError] = useState("");
  const [datosContacto, setDatosContacto] = useState(null);

  const fetchDatosContacto = async () => {
    try {
      const data = await obtenerDatosContactoServicio(servicio.id);
      setDatosContacto(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDatosContacto();
  }, []);

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

  useEffect(() => {
    if (datosContacto) {
      setServicioData((prevState) => ({
        ...prevState,
        telefono1: datosContacto.telefono1 || "",
        telefono2: datosContacto.telefono2 || "",
        email: datosContacto.email || "",
        estado: datosContacto.estado || "",
        municipioAlcaldia: datosContacto.municipio_alcaldia || "",
        colonia: datosContacto.colonia || "",
        calle: datosContacto.calle || "",
        numeroExterior: datosContacto.numeroExterior || "",
        numeroInterior: datosContacto.numeroInterior || "",
        descripcion: datosContacto.descripcion || "",
      }));
    }
  }, [datosContacto]);

  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar el formato del correo electrónico
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
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
      };

      // Mostrar el diálogo de confirmación
      const confirmResult = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Quieres actualizar los datos de contacto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
      });

      // Si se confirma la actualización
      if (confirmResult.isConfirmed) {
        const status = await actualizarDatosContactoServicioCliente(
          servicio.id,
          datosServicio
        );

        if (status === 200) {
          Swal.fire(
            "Éxito",
            "Los datos de contacto se han guardado correctamente",
            "success"
          );
          onSubmit(); // Llamar a la función de manejo para indicar que se han registrado los datos
        } else {
          Swal.fire(
            "Error",
            "Ha ocurrido un error al enviar los datos de contacto",
            "error"
          );
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "Ha ocurrido un error al enviar los datos de contacto",
        "error"
      );
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

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
    const { checked } = e.target;
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

  const validateForm = () => {
    const errors = {};

    // Validación de teléfono 1
    if (servicioData.telefono1.trim() === "") {
      errors.telefono1 = "El teléfono 1 es obligatorio";
    }

    // Validación de estado
    if (servicioData.estado === "") {
      errors.estado = "Selecciona un estado";
    }

    // Validación de municipio/alcaldía
    if (servicioData.municipioAlcaldia.trim() === "") {
      errors.municipioAlcaldia = "El municipio/alcaldía es obligatorio";
    }

    // Validación de colonia
    if (servicioData.colonia.trim() === "") {
      errors.colonia = "La colonia es obligatoria";
    }

    // Validación de calle
    if (servicioData.calle.trim() === "") {
      errors.calle = "La calle es obligatoria";
    }

    // Validación de número exterior
    if (servicioData.numeroExterior.trim() === "" && servicioData.numeroExterior !== "SN") {
      errors.numeroExterior = "El número exterior es obligatorio";
    }

    return errors;
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
          
            pattern="[0-9]*"
            title="Ingresa solo números"
            maxLength={10}
            minLength={10}
            isInvalid={validationErrors.telefono1}
          />
          {validationErrors.telefono1 && (
            <Alert variant="danger">{validationErrors.telefono1}</Alert>
          )}
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
            isInvalid={!!emailError}
          />
          {emailError && <Alert variant="danger">{emailError}</Alert>}
        </FormGroup>

        <h3>Dirección</h3>
        <FormGroup>
          <Form.Label>Estado:</Form.Label>
          <FormControl
            as="select"
            name="estado"
            value={servicioData.estado}
            onChange={handleChange}

            isInvalid={validationErrors.estado}
          >
            <option value="">Seleccionar estado...</option>
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </FormControl>
          {validationErrors.estado && (
            <Alert variant="danger">{validationErrors.estado}</Alert>
          )}
        </FormGroup>
        <FormGroup>
          <Form.Label>Municipio/Alcaldía:</Form.Label>
          <FormControl
            type="text"
            name="municipioAlcaldia"
            value={servicioData.municipioAlcaldia}
            onChange={handleChange}
            
            isInvalid={validationErrors.municipioAlcaldia}
          />
          {validationErrors.municipioAlcaldia && (
            <Alert variant="danger">{validationErrors.municipioAlcaldia}</Alert>
          )}
        </FormGroup>
        <FormGroup>
          <Form.Label>Colonia:</Form.Label>
          <FormControl
            type="text"
            name="colonia"
            value={servicioData.colonia}
            onChange={handleChange}
       
            isInvalid={validationErrors.colonia}
          />
          {validationErrors.colonia && (
            <Alert variant="danger">{validationErrors.colonia}</Alert>
          )}
        </FormGroup>
        <FormGroup>
          <Form.Label>Calle:</Form.Label>
          <FormControl
            type="text"
            name="calle"
            value={servicioData.calle}
            onChange={handleChange}
         
            isInvalid={validationErrors.calle}
          />
          {validationErrors.calle && (
            <Alert variant="danger">{validationErrors.calle}</Alert>
          )}
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
              {servicioData.numeroExterior !== "SN" ? (
                <FormControl
                  type="text"
                  name="numeroExterior"
                  value={servicioData.numeroExterior}
                  onChange={handleChange}
                  disabled={servicioData.numeroExterior === "SN"}
   
                  isInvalid={validationErrors.numeroExterior}
                />
              ) : null}
              {validationErrors.numeroExterior && (
                <Alert variant="danger">{validationErrors.numeroExterior}</Alert>
              )}
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

        <h3>Descripción</h3>
        <FormGroup>
          <Form.Label>Descripción domicilio (opcional):</Form.Label>
          <FormControl
            as="textarea"
            name="descripcion"
            value={servicioData.descripcion}
            onChange={handleChange}
          />
        </FormGroup>

        <Button type="submit">Guardar</Button>
      </Form>
    </div>
  );
}
