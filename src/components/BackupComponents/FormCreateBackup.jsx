import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { useBackup } from "./BackupContext/BackupProvider";

export function FormCreateBackup() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [password, setPassword] = useState("");
  const { getBackup } = useBackup();
  const [passwordError, setPasswordError] = useState(false); // Estado para el error de contraseña

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = usuario.email;
    const credentials = {
      password,
      email,
    };

    if (!password) {
      // Verifica si el campo de contraseña está vacío
      setPasswordError(true);
      return; // Evita enviar el formulario si hay un error
    }

    try {
      const response = await getBackup(credentials);
      if (response.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Backup creado",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Contraseña incorrecta",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al crear el backup",
      });
    }
    
    
  };

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Ocultar formulario" : "Crear backup"}
      </Button>
      {showForm && (
        <Card className="mt-4">
          <Card.Header>
            <h4>Creación de Backup</h4>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="password">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setPasswordError(false); // Restablece el error al cambiar la contraseña
                  }}
                />
                {passwordError && (
                  <div className="text-danger">El campo de contraseña no puede estar vacío.</div>
                )}
              </Form.Group>
              <Button variant="primary" type="submit">
                Crear backup
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
