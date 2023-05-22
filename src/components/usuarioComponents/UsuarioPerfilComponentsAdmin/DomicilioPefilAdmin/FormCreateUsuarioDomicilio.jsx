import { useUsuarios } from "../../UsuariosContext/UsuarioProvider";
import { useState } from "react";
import { Form, FormGroup, FormControl, Button, FormCheck } from 'react-bootstrap';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
          required
        />
      </FormGroup>
      <br />

      <FormGroup>
        <Form.Label>Estado:</Form.Label>
        <FormControl
          type="text"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          required
        />
      </FormGroup>
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
          value={formData.numeroExterior !== "SN" ? formData.numeroExterior : "SN"}
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
        <FormControl
          type="text"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <br />

      <Button type="submit">Crear Domicilio</Button>
    </Form>
  );
}
