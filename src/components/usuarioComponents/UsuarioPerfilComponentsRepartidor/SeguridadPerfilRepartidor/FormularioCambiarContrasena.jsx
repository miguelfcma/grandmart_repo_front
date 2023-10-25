import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useUsuarios } from "../../UsuariosContext/UsuarioProvider";

export function FormularioCambiarContrasena() {
  // Estado para almacenar las contraseñas y mensajes de error
  const [contrasenaActual, setContrasenaActual] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarNuevaContrasena, setConfirmarNuevaContrasena] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  // Estados para mostrar u ocultar las contraseñas
  const [showPasswordActual, setShowPasswordActual] = useState(false);
  const [showPasswordNueva, setShowPasswordNueva] = useState(false);
  const [showPasswordConfirmar, setShowPasswordConfirmar] = useState(false);

  // Acceso a las funciones para actualizar la contraseña del usuario
  const { actualizarContrasenaUsuario } = useUsuarios();

  // Obtiene los datos del usuario actual del almacenamiento local
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar las contraseñas
    if (nuevaContrasena !== confirmarNuevaContrasena) {
      setMensajeError("Las contraseñas no coinciden");
      return;
    }

    if (nuevaContrasena === contrasenaActual) {
      setMensajeError(
        "La nueva contraseña debe ser diferente a la contraseña actual"
      );
      return;
    }

    if (nuevaContrasena.length < 7) {
      setMensajeError("La contraseña debe tener al menos 7 caracteres");
      return;
    }

    if (!/\d/.test(nuevaContrasena)) {
      setMensajeError("La contraseña debe contener al menos un número");
      return;
    }

    if (nuevaContrasena.includes(" ")) {
      setMensajeError("La contraseña no debe contener espacios");
      return;
    }

    // Envía la solicitud para cambiar la contraseña
    await actualizarContrasenaUsuario(usuario.id, {
      contrasenaActual,
      nuevaContrasena,
    });

    // Reinicia los campos y el mensaje de error
    setContrasenaActual("");
    setNuevaContrasena("");
    setConfirmarNuevaContrasena("");
    setMensajeError("");
  };

  // Genera una contraseña aleatoria que cumple con las condiciones
  function generatePassword() {
    const length = 8;
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    while (true) {
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
      }

      // Verificar si la contraseña cumple con todas las condiciones
      const meetsLengthRequirement = password.length >= 7;
      const hasNumber = /\d/.test(password);
      const hasNoSpaces = !password.includes(" ");

      if (meetsLengthRequirement && hasNumber && hasNoSpaces) {
        break;
      }

      password = ""; // Restablecer la contraseña si no cumple con las condiciones
    }

    // Establece la nueva contraseña generada y su confirmación
    setNuevaContrasena(password);
    setConfirmarNuevaContrasena(password);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <h2>Cambiar contraseña</h2>
      <Form.Text>
        <p>
          Te recomendamos encarecidamente que, por tu seguridad, elijas una
          contraseña única que no uses para conectarte a otras cuentas.
        </p>

        <p>La contraseña no debe ser la misma que una de la última usada.</p>
        <p>Tu contraseña debe tener siete o más caracteres.</p>
        <p>Tu contraseña debe contener al menos un número.</p>
        <p>Las contraseñas no deben contener espacios.</p>
      </Form.Text>
      {mensajeError && <Alert variant="danger">{mensajeError}</Alert>}
      <Form.Group controlId="formContrasenaActual">
        <Form.Label>contraseña actual:</Form.Label>
        <div className="password-input">
          <Form.Control
            type={showPasswordActual ? "text" : "password"}
            value={contrasenaActual}
            onChange={(e) => setContrasenaActual(e.target.value)}
          />
          {showPasswordActual ? (
            <FaEye
              className="password-icon"
              title="Ocultar contraseña"
              onClick={() => setShowPasswordActual(!showPasswordActual)}
            />
          ) : (
            <FaEyeSlash
              className="password-icon"
              title="Mostrar contraseña"
              onClick={() => setShowPasswordActual(!showPasswordActual)}
            />
          )}
        </div>
      </Form.Group>
      <Button variant="secondary" onClick={generatePassword}>
        Generar contraseña
      </Button>
      <Form.Group controlId="formNuevaContrasena">
        <Form.Label>Nueva contraseña:</Form.Label>
        <Form.Control
          type={showPasswordNueva ? "text" : "password"}
          value={nuevaContrasena}
          onChange={(e) => setNuevaContrasena(e.target.value)}
        />
        {showPasswordNueva ? (
          <FaEye
            className="password-icon"
            title="Ocultar contraseña"
            onClick={() => setShowPasswordNueva(!showPasswordNueva)}
          />
        ) : (
          <FaEyeSlash
            className="password-icon"
            title="Mostrar contraseña"
            onClick={() => setShowPasswordNueva(!showPasswordNueva)}
          />
        )}
      </Form.Group>
      <Form.Group controlId="formConfirmarNuevaContrasena">
        <Form.Label>Confirmar nueva contraseña:</Form.Label>
        <Form.Control
          type={showPasswordConfirmar ? "text" : "password"}
          value={confirmarNuevaContrasena}
          onChange={(e) => setConfirmarNuevaContrasena(e.target.value)}
        />
        {showPasswordConfirmar ? (
          <FaEye
            className="password-icon"
            title="Ocultar contraseña"
            onClick={() => setShowPasswordConfirmar(!showPasswordConfirmar)}
          />
        ) : (
          <FaEyeSlash
            className="password-icon"
            title="Mostrar contraseña"
            onClick={() => setShowPasswordConfirmar(!showPasswordConfirmar)}
          />
        )}
      </Form.Group>
      <Button type="submit">Cambiar contraseña</Button>
    </Form>
  );
}
