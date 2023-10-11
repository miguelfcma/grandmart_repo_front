import React, { useState, useEffect } from "react";
import "./FormUsuario.css";
import { useUsuarios } from "../UsuariosContext/UsuarioProvider";
import Swal from "sweetalert2";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
export function FormUsuario({ onSubmit, initialUsuario = null }) {
  const { createUsuario, updateUsuario } = useUsuarios();
  const [error, setError] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [email, setEmail] = useState("");
  const [sexo, setSexo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (initialUsuario !== null) {
      setNombre(initialUsuario.nombre);
      setApellidoPaterno(initialUsuario.apellidoPaterno);
      setApellidoMaterno(initialUsuario.apellidoMaterno);
      setEmail(initialUsuario.email);
      setSexo(initialUsuario.sexo);
      setFechaNacimiento(initialUsuario.fechaNacimiento);
      setTelefono(initialUsuario.telefono);
      setPassword(initialUsuario.password);
      setTipoUsuario(initialUsuario.tipoUsuario);
    }
  }, [initialUsuario]);
  const validateFechaNacimiento = () => {
    const today = new Date();
    const selectedDate = new Date(fechaNacimiento);
    const minAge = 18; // Edad mínima requerida

    // Calcula la fecha mínima de nacimiento permitida
    const minDate = new Date(
      today.getFullYear() - minAge,
      today.getMonth(),
      today.getDate()
    );

    if (selectedDate > today) {
      setError("La fecha de nacimiento debe ser anterior a la fecha actual.");
      return false;
    }

    if (selectedDate > minDate) {
      setError("Debes ser mayor de edad para registrarte.");
      return false;
    }

    return true;
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("El formato del email es incorrecto.");
      return false;
    }

    return true;
  };

  const [formulario, setFormulario] = useState({
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    fechaNacimiento,
    telefono,
    sexo,
  });
  
  const [telefonoError, setTelefonoError] = useState(""); // Nuevo estado para el error del teléfono

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación de longitud del teléfono
    if (name === "telefono") {
      // Bloquear letras y limitar a 10 dígitos
      const telefonoValue = value.replace(/\D/g, "").slice(0, 10);
      setFormulario((prevFormulario) => ({
        ...prevFormulario,
        [name]: telefonoValue,
      }));

      // Validar la longitud y mostrar el mensaje de error
      if (telefonoValue.length !== 10) {
        setTelefonoError("  (Debe ser a 10 dígitos)");
      } else {
        setTelefonoError(""); // No hay error
      }
    } else {
      setFormulario((prevFormulario) => ({
        ...prevFormulario,
        [name]: value,
      }));
    }
  };

  const validatePassword = () => {
    if (password.length < 7) {
      setError("La contraseña debe tener al menos 7 caracteres.");
      return false;
    }

    if (!/\d/.test(password)) {
      setError("La contraseña debe contener al menos un número.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateTelefono(formulario.telefono)) {
      console.log("Debe tener 10 dígitos!");
      return;
    }

    if (validateFechaNacimiento() && validateEmail()) {
      if (initialUsuario == null) {
        validatePassword();
      }
      const formData = {
        nombre: nombre,
        apellidoPaterno: apellidoPaterno,
        apellidoMaterno: apellidoMaterno,
        email: email,
        sexo: sexo,
        fechaNacimiento: fechaNacimiento,
        telefono: telefono,
        password: password,
        tipoUsuario: tipoUsuario,
      };

      try {
        let response;

        if (initialUsuario === null) {
          const confirmResult = await Swal.fire({
            icon: "question",
            title: "Confirmar creación",
            text: "¿Estás seguro de que deseas crear el usuario?",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "Cancelar",
          });

          if (confirmResult.isConfirmed) {
            response = await createUsuario(formData);
          } else {
            // El usuario canceló la operación
            return;
          }
        } else {
          const confirmResult = await Swal.fire({
            icon: "question",
            title: "Confirmar actualización",
            text: "¿Estás seguro de que deseas actualizar el usuario?",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "Cancelar",
          });

          if (confirmResult.isConfirmed) {
            response = await updateUsuario(initialUsuario.id, formData);
          } else {
            // El usuario canceló la operación
            return;
          }
        }

        if (response.status === 200 || response.status === 201) {
          setNombre("");
          setApellidoPaterno("");
          setApellidoMaterno("");
          setEmail("");
          setSexo("");
          setFechaNacimiento("");
          setTelefono("");
          setPassword("");
          setTipoUsuario("");
          if (initialUsuario === null) {
            Swal.fire({
              icon: "success",
              title: "Operación exitosa",
              text: "Usuario creado correctamente.",
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Operación exitosa",
              text: "Usuario actualizado correctamente.",
            });
          }

          onSubmit();
        } else if (response.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Error al procesar la solicitud",
            text: "Ya existe una cuenta con ese correo registrado.",
          });
        } else if (response.status === 404) {
          Swal.fire({
            icon: "error",
            title: "Error al procesar la solicitud",
            text: "El usuario no ha sido encontrado.",
          });
        } else if (response.status === 500) {
          Swal.fire({
            icon: "error",
            title: "Error en el servidor",
            text: "Ha ocurrido un error en el servidor. Por favor, inténtalo de nuevo más tarde.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ha ocurrido un error desconocido. Por favor, inténtalo de nuevo más tarde.",
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} controlId="nombre">
        <Form.Label column sm="2">
          Nombre:
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            required
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="apellidoPaterno">
        <Form.Label column sm="2">
          Apellido Paterno:
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            value={apellidoPaterno}
            onChange={(event) => setApellidoPaterno(event.target.value)}
            required
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="apellidoMaterno">
        <Form.Label column sm="2">
          Apellido Materno:
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            value={apellidoMaterno}
            onChange={(event) => setApellidoMaterno(event.target.value)}
            required
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="email">
        <Form.Label column sm="2">
          Email:
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            disabled={initialUsuario}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="sexo">
        <Form.Label column sm="2">
          Sexo:
        </Form.Label>
        <Col sm="10">
          <Form.Control
            as="select"
            value={sexo}
            onChange={(event) => setSexo(event.target.value)}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="fechaNacimiento">
        <Form.Label column sm="2">
          Fecha de nacimiento:
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="date"
            value={fechaNacimiento}
            onChange={(event) => setFechaNacimiento(event.target.value)}
            required
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="telefono">
        <Form.Label column sm="2">
          Teléfono:
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="tel"
            name="telefono"
            value={formulario.telefono}
            onChange={handleChange}
            pattern="[0-9]*"
            title="Ingresa solo números"
            required
          />
          {/* Mostrar el mensaje de error debajo del campo de entrada */}
          {telefonoError && (
            <span style={{ color: "red" }}>{telefonoError}</span>
          )}
        </Col>
      </Form.Group>

      {!initialUsuario && (
        <Form.Group as={Row} controlId="password">
          <Form.Label column sm="2">
            Contraseña:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {showPassword ? (
              <FaEye
                className="password-icon"
                title="Ocultar contraseña"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEyeSlash
                className="password-icon"
                title="Mostrar contraseña"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </Col>
        </Form.Group>
      )}

      <Form.Group as={Row} controlId="tipoUsuario">
        <Form.Label column sm="2">
          Tipo de usuario:
        </Form.Label>
        <Col sm="10">
          <Form.Control
            as="select"
            value={tipoUsuario}
            onChange={(event) => setTipoUsuario(Number(event.target.value))}
            required
          >
            <option value="" defaultValue>
              Selecciona una opción
            </option>
            <option value="1">Administrador</option>
            <option value="0">Usuario cliente</option>
            <option value="2">Repartidor</option>
          </Form.Control>
        </Col>
      </Form.Group>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button type="submit">Registrar</Button>
    </Form>
  );
}
