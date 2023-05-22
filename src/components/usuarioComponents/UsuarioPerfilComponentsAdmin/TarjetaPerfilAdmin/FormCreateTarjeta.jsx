import { useUsuarios } from "../../UsuariosContext/UsuarioProvider";
import { useState } from "react";
import { Form, FormGroup, FormControl, Button, Alert } from 'react-bootstrap';

export function FormCreateTarjeta({ onSubmit }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { create_info_bancaria } = useUsuarios();

  const [formData, setFormData] = useState({
    nombre_titular: "",
    numero_cuenta: "",
    banco: "",
    usuario_id: usuario.id,
  });

  const [errors, setErrors] = useState({
    nombre_titular: false,
    numero_cuenta: false,
    banco: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validación de campos requeridos
    let isFieldValid = true;
    if (value.trim() === "") {
      isFieldValid = false;
    }

    setErrors({ ...errors, [name]: !isFieldValid });

    // Verificar si todos los campos están llenos
    const isFormFilled = Object.values(formData).every((field) => field !== "");
    setIsFormValid(isFormFilled && !Object.values(errors).some((error) => error));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid) {
      try {
        await create_info_bancaria(formData);
        setFormData({
          nombre_titular: "",
          numero_cuenta: "",
          banco: "",
          usuario_id: usuario.id,
        });
        onSubmit();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Label>Nombre del titular de la cuenta:</Form.Label>
        <FormControl
          type="text"
          name="nombre_titular"
          value={formData.nombre_titular}
          onChange={handleChange}
          required
        />
        {errors.nombre_titular && (
          <Alert variant="danger">Error: El nombre del titular es obligatorio</Alert>
        )}
      </FormGroup>
      <br />

      <FormGroup>
        <Form.Label>Banco:</Form.Label>
        <FormControl
          type="text"
          name="banco"
          value={formData.banco}
          onChange={handleChange}
          required
        />
        {errors.banco && (
          <Alert variant="danger">Error: El banco es obligatorio</Alert>
        )}
      </FormGroup>
      <br />

      <FormGroup>
        <Form.Label>Número de cuenta:</Form.Label>
        <FormControl
          type="text"
          name="numero_cuenta"
          value={formData.numero_cuenta}
          onChange={handleChange}
          required
        />
        {errors.numero_cuenta && (
          <Alert variant="danger">Error: El número de cuenta es obligatorio</Alert>
        )}
      </FormGroup>
      <br />

      <Button type="submit" disabled={!isFormValid}>Guardar</Button>
    </Form>
  );
}
