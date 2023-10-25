import React, { useState, useEffect } from "react";
import { useUsuarios } from "../UsuariosContext/UsuarioProvider";
import "./SignupFormUsuario.css";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

// Componente para el formulario de registro de usuarios.
export function SignupFormUsuario() {
  const { createUsuario } = useUsuarios();
  const navigate = useNavigate();

  // Estados para los campos del formulario.
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [email, setEmail] = useState("");
  const [sexo, setSexo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("false");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmar, setShowPasswordConfirmar] = useState(false);
  const [error, setError] = useState("");

  // Maneja el envío del formulario.
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación de campos del formulario.
    if (
      !validateFechaNacimiento() ||
      !validateEmail() ||
      !validateTelefono() ||
      !validatePassword()
    ) {
      return;
    }

    // Datos del formulario a enviar.
    const formData = {
      nombre: nombre,
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno,
      email: email,
      sexo: sexo,
      fechaNacimiento: fechaNacimiento,
      telefono: telefono,
      password: password,
      tipoUsuario: 0,
    };

    try {
      const response = await createUsuario(formData);

      if (response.status === 201) {
        setNombre("");
        setApellidoPaterno("");
        setApellidoMaterno("");
        setEmail("");
        setSexo("");
        setFechaNacimiento("");
        setTelefono("");
        setPassword("");
        setConfirmPassword("");
        Swal.fire({
          icon: "success",
          title: "Usuario creado correctamente",
          text: "Usuario creado correctamente",
        });
        navigate("/login");
      } else if (response.status == 400) {
        Swal.fire({
          icon: "error",
          title: "Error al crear el usuario",
          text: "El email ya ha sido vinculado a otro perfil!",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "Ha ocurrido un error en el servidor. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  };

  // Valida la fecha de nacimiento.
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

  // Valida el formato del número de teléfono.
  const validateTelefono = () => {
    const telefonoPattern = /^[0-9]{10}$/; // Expresión regular para verificar que el teléfono tenga 10 dígitos

    if (!telefonoPattern.test(telefono)) {
      setError(
        "El formato del teléfono es incorrecto. Debe contener 10 dígitos numéricos."
      );
      return false;
    }

    return true;
  };

  // Valida el formato del correo electrónico.
  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("El formato del email es incorrecto.");
      return false;
    }

    return true;
  };

  useEffect(() => {
    // Se obtiene el elemento de entrada de teléfono por su ID
    const inputTelefono = document.getElementById("telefono");

    // Se define una función para manejar las pulsaciones de teclas en el campo de entrada de teléfono
    const handleTelefonoKeyDown = (event) => {
      // Obtener el código de la tecla presionada
      const keyCode = event.keyCode || event.which;

      // Verificar si la tecla presionada no es un número ni una tecla de navegación
      if (
        !(
          (keyCode >= 48 && keyCode <= 57) ||
          (keyCode >= 96 && keyCode <= 105) ||
          [8, 37, 39, 35, 36].includes(keyCode)
        )
      ) {
        // Evitar que se ingrese el carácter no deseado
        event.preventDefault();
      }
    };

    // Se verifica si se encontró el elemento de entrada de teléfono
    if (inputTelefono) {
      // Se agrega un oyente de eventos para el evento keydown que llamará a la función "handleTelefonoKeyDown"
      inputTelefono.addEventListener("keydown", handleTelefonoKeyDown);
    }

    // Se devuelve una función de limpieza para eliminar el oyente de eventos
    return () => {
      // Se verifica si el elemento de entrada de teléfono aún existe
      if (inputTelefono) {
        // Se eliminan el oyente de eventos para evitar fugas de memoria
        inputTelefono.removeEventListener("keydown", handleTelefonoKeyDown);
      }
    };
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez, al montar el componente

  // Valida la contraseña.
  const validatePassword = () => {
    if (password.length < 7) {
      setError("La contraseña debe tener al menos 7 caracteres.");
      return false;
    }

    if (!/\d/.test(password)) {
      setError("La contraseña debe contener al menos un número.");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return false;
    }

    return true;
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/">
            <img
              alt="e-commerce"
              src="https://firebasestorage.googleapis.com/v0/b/grandmart-51065.appspot.com/o/src%2Flogo.png?alt=media&token=6c393680-5c89-4708-a0d3-f8ffcb0fc379"
            />
          </Link>
        </div>
      </nav>
      <div className="main-content ">
        <div className="signup-form-container">
          <h2>Crear una cuenta</h2>
          <Form onSubmit={handleSubmit} className="signup-form">
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                placeholder="Nombre"
                onChange={(event) => setNombre(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="apellidoPaterno">
              <Form.Label>Apellido Paterno:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellido Paterno"
                value={apellidoPaterno}
                onChange={(event) => setApellidoPaterno(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="apellidoMaterno">
              <Form.Label>Apellido Materno:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellido Materno"
                value={apellidoMaterno}
                onChange={(event) => setApellidoMaterno(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="sexo">
              <Form.Label>Sexo:</Form.Label>
              <Form.Select
                value={sexo}
                onChange={(event) => setSexo(event.target.value)}
                required
              >
                <option value="" defaultValue>
                  Selecciona una opción
                </option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="fechaNacimiento">
              <Form.Label>Fecha de nacimiento:</Form.Label>
              <Form.Control
                type="date"
                value={fechaNacimiento}
                onChange={(event) => setFechaNacimiento(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="telefono">
              <Form.Label>Teléfono:</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Teléfono"
                value={telefono}
                onChange={(event) => setTelefono(event.target.value)}
                required
                pattern="[0-9]*"
                title="Ingresa solo números"
                maxLength={10}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
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
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirmar Contraseña:</Form.Label>
              <Form.Control
                type={showPasswordConfirmar ? "text" : "password"}
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
              {showPasswordConfirmar ? (
                <FaEye
                  className="password-icon"
                  title="Ocultar contraseña"
                  onClick={() =>
                    setShowPasswordConfirmar(!showPasswordConfirmar)
                  }
                />
              ) : (
                <FaEyeSlash
                  className="password-icon"
                  title="Mostrar contraseña"
                  onClick={() =>
                    setShowPasswordConfirmar(!showPasswordConfirmar)
                  }
                />
              )}
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button type="submit">Crear cuenta</Button>
          </Form>
        </div>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <button className="back-button" type="button">
            <span>Atrás</span>
          </button>
        </Link>
      </div>
    </>
  );
}
