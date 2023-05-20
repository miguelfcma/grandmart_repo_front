import React, { useState } from "react";
import { useUsuarios } from "../UsuariosContext/UsuarioProvider";
import "./SignupFormUsuario.css";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from 'react-bootstrap/FloatingLabel';


export function SignupFormUsuario() {
  const { createUsuario } = useUsuarios();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [email, setEmail] = useState("");
  const [sexo, setSexo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("false");

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      const status = await createUsuario(formData);

      if (status === true) {
        setNombre("");
        setApellidoPaterno("");
        setApellidoMaterno("");
        setEmail("");
        setSexo("");
        setFechaNacimiento("");
        setTelefono("");
        setPassword("");
        navigate("/login");
      } else {
        window.alert(
          "Ha ocurrido un error al procesar la solicitud. Inténtelo de nuevo más tarde."
        );
      }
    } catch (error) {
      console.error(error);
    }
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
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </Form.Group>

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
