import { useUsuarios } from "../../UsuariosContext/UsuarioProvider";
import { useState, useEffect } from "react";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormCheck,
  FormControl,
} from "react-bootstrap";

export function FormUpdateUsuarioDomicilio({ onSubmit, initialDomicilio }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { updateDomicilioUsuarioByUserId } = useUsuarios();

  const [formData, setFormData] = useState(initialDomicilio);

  useEffect(() => {
    setFormData(initialDomicilio);
  }, [initialDomicilio]);
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
  const handleNumeroExteriorChange = (e) => {
    const { checked, value } = e.target;
    const numeroExterior = checked ? "SN" : "";
    setFormData({ ...formData, numeroExterior });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDomicilioUsuarioByUserId(usuario.id, formData);
      onSubmit();
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
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <FormLabel>Nombre INE:</FormLabel>
        <FormControl
          type="text"
          name="nombre_ine"
          value={formData.nombre_ine}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Código postal:</FormLabel>
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

      <FormGroup>
        <FormLabel>Estado:</FormLabel>

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
      </FormGroup>

      <FormGroup>
        <FormLabel>Municipio o alcaldía:</FormLabel>
        <FormControl
          type="text"
          name="municipio_alcaldia"
          value={formData.municipio_alcaldia}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Colonia:</FormLabel>
        <FormControl
          type="text"
          name="colonia"
          value={formData.colonia}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Calle:</FormLabel>
        <FormControl
          type="text"
          name="calle"
          value={formData.calle}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Número exterior:</FormLabel>
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

      <FormGroup>
        <FormLabel>Número interior:</FormLabel>
        <FormControl
          type="text"
          name="numeroInterior"
          value={formData.numeroInterior}
          onChange={handleChange}
        />
      </FormGroup>
      <FormLabel>¿Entre qué calles está? (opcional)</FormLabel>
      <FormGroup>
        <FormLabel>Calle 1:</FormLabel>
        <FormControl
          type="text"
          name="calle1"
          value={formData.calle1}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Calle 2:</FormLabel>
        <FormControl
          type="text"
          name="calle2"
          value={formData.calle2}
          onChange={handleChange}
        />
      </FormGroup>

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
      <Button variant="primary" type="submit">
        Actualizar Domicilio
      </Button>
    </Form>
  );
}
