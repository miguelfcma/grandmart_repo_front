import { useUsuarios } from "../../UsuariosContext/UsuarioProvider";
import { useState } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  FormCheck,
} from "react-bootstrap";

export function FormCreateUsuarioDomicilio({ onSubmit }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { createDomicilioUsuario } = useUsuarios();

  const [formData, setFormData] = useState({
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

  const [descripcionCounter, setDescripcionCounter] = useState(150);

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
      setFormData({ ...formData, [name]: value });
    }

    setFormData({ ...formData, [name]: value });
  };

  const handlePostalBlur = () => {
    const { postal } = formData;

    // Validar si el campo es el número postal
    if (postal && /^\d+$/.test(postal)) {
      let formattedValue = postal;

      // Rellenar con ceros si el número no tiene 5 dígitos
      formattedValue = postal.padStart(5, "0");

      setFormData({ ...formData, postal: formattedValue });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const domicilio = await createDomicilioUsuario(formData);
      setFormData({
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
      onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  const handleNumeroExteriorChange = (e) => {
    const { checked, value } = e.target;
    const numeroExterior = checked ? "SN" : "";
    setFormData({ ...formData, numeroExterior });
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
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Label>Nombre y apellido:</Form.Label>
        <FormControl
          type="text"
          name="nombre_ine"
          value={formData.nombre_ine}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <br />

      <FormGroup>
        <Form.Label>Código postal:</Form.Label>
        <FormControl
          type="text"
          name="postal"
          value={formData.postal}
          onChange={handleChange}
          onBlur={handlePostalBlur} // Agrega el evento onBlur
          maxLength={5}
          required
        />
      </FormGroup>
      <br />
      <Form.Group controlId="estado">
        <Form.Label>Estado:</Form.Label>
        <Form.Control
          as="select"
          name="estado"
          value={formData.estado}
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

      <br />

      <FormGroup>
        <Form.Label>Municipio/Alcaldía:</Form.Label>
        <FormControl
          type="text"
          name="municipio_alcaldia"
          value={formData.municipio_alcaldia}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <br />

      <FormGroup>
        <Form.Label>Colonia:</Form.Label>
        <FormControl
          type="text"
          name="colonia"
          value={formData.colonia}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <br />

      <FormGroup>
        <Form.Label>Calle:</Form.Label>
        <FormControl
          type="text"
          name="calle"
          value={formData.calle}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <br />

      <FormGroup>
        <Form.Label>Número exterior:</Form.Label>
        <br />
        <FormCheck
          type="checkbox"
          label="Sin número"
          name="numeroExterior"
          checked={formData.numeroExterior === "SN"}
          onChange={handleNumeroExteriorChange}
        />
        <FormControl
          type="text"
          name="numeroExterior"
          value={
            formData.numeroExterior !== "SN" ? formData.numeroExterior : "SN"
          }
          onChange={handleChange}
          disabled={formData.numeroExterior === "SN"}
          required
        />
      </FormGroup>
      <br />

      <FormGroup>
        <Form.Label>Nº interior/Depto (opcional)</Form.Label>
        <FormControl
          type="text"
          name="numeroInterior"
          value={formData.numeroInterior}
          onChange={handleChange}
        />
      </FormGroup>
      <br />
      <Form.Label>¿Entre qué calles está? (opcional)</Form.Label>
      <FormGroup>
        <Form.Label>Calle 1:</Form.Label>
        <FormControl
          type="text"
          name="calle1"
          value={formData.calle1}
          onChange={handleChange}
        />
      </FormGroup>
      <br />

      <FormGroup>
        <Form.Label>Calle 2:</Form.Label>
        <FormControl
          type="text"
          name="calle2"
          value={formData.calle2}
          onChange={handleChange}
        />
      </FormGroup>
      <br />

      <FormGroup>
        <Form.Label>Indicaciones adicionales de esta dirección:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          maxLength={150}
        />
        <div>Caracteres restantes: {descripcionCounter}</div>
      </FormGroup>
      <br />

      <Button type="submit">Crear Domicilio</Button>
    </Form>
  );
}
