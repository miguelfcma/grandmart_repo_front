import { useUsuarios } from "../../UsuariosContext/UsuarioProvider";
import { useState, useEffect } from "react";
import { Form, Button, FormGroup, FormLabel, FormCheck, FormControl } from "react-bootstrap";

export function FormUpdateUsuarioDomicilio({ onSubmit, initialDomicilio }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { updateDomicilioUsuarioByUserId } = useUsuarios();

  const [formData, setFormData] = useState(initialDomicilio);

  useEffect(() => {
    setFormData(initialDomicilio);
  }, [initialDomicilio]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          required
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>Estado:</FormLabel>
        <FormControl
          type="text"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          required
        />
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
          value={formData.numeroExterior !== "SN" ? formData.numeroExterior : "SN"}
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
        <FormLabel>Descripción:</FormLabel>
        <FormControl
          type="text"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <Button variant="primary" type="submit">
        Actualizar Domicilio
      </Button>
    </Form>
  );
}
