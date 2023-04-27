import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useBackup } from "./BackupContext/BackupProvider";

export function FormCreateBackup() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [password, setPassword] = useState("");
  const { getBackup } = useBackup();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = usuario.email;
    const credentials = {
      password,
      email,
    };

    try {
      const response = await getBackup(credentials);
      console.log({
        status: response.status,
        message: response.data.message,
      });
    } catch (error) {
      console.log({
        status: error.response.status,
        message: error.response.data.message,
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
                  onChange={(event) => setPassword(event.target.value)}
                />
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
