import { useState, useEffect } from "react";
import { useUsuarios } from "../../UsuariosContext/UsuarioProvider";
import { ContrasenaUpdate } from "./ContrasenaUpdate";
import { Form, Button, Card } from "react-bootstrap";

export  function CardContrasena() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { contrasena, loadContrasena, updateContrasenaUsuarioByUserId } = useUsuarios();
  const [newPassword, setNewPassword] = useState("");
  const [formData, setFormData] = useState({ password: "" });
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (formData.password !== contrasena.password) {
      alert("La contraseña actual es incorrecta.");
    } else {
      setShowUpdateForm(true);
    }
  }

  useEffect(() => {
    loadContrasena(usuario.id);
  }, []);

  const handleUpdateSubmit = async (newPassword) => {
    await updateContrasenaUsuarioByUserId(usuario.id, { password: newPassword });
    setShowUpdateForm(false);
  };

  return (
    
        <div>
          {!showUpdateForm && (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="password">
                <Form.Label>Contraseña actual:</Form.Label>
                <Form.Control
                  type="password"
                  value={formData.password}
                  onChange={(event) => setFormData({ password: event.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="newPassword">
                <Form.Label>Nueva Contraseña:</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
              </Form.Group>
              <Button type="submit">Actualizar contraseña</Button>
            </Form>
          )}
          {showUpdateForm && (
            <ContrasenaUpdate
              onSubmit={handleUpdateSubmit}
              initialContrasena={newPassword}
            />
          )}
        </div>

  );
}
