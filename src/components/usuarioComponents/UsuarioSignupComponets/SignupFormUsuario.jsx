import React, { useState } from "react";
import { useUsuarios } from "../UsuariosContext/UsuarioProvider";
import "./SignupFormUsuario.css";
import { useNavigate } from "react-router-dom";

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
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">
          Nombre:
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="apellidoPaterno">
          Apellido Paterno:
          <input
            type="text"
            id="apellidoPaterno"
            value={apellidoPaterno}
            onChange={(event) => setApellidoPaterno(event.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="apellidoMaterno">
          Apellido Materno:
          <input
            type="text"
            id="apellidoMaterno"
            value={apellidoMaterno}
            onChange={(event) => setApellidoMaterno(event.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="sexo">
          Sexo:
          <select
            id="sexo"
            value={sexo}
            onChange={(event) => setSexo(event.target.value)}
            required
          >
            <option value="" defaultValue>
              Selecciona una opción
            </option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </label>
        <br />
        <label htmlFor="fechaNacimiento">
          Fecha de nacimiento:
          <input
            type="date"
            id="fechaNacimiento"
            value={fechaNacimiento}
            onChange={(event) => setFechaNacimiento(event.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="telefono">
          Teléfono:
          <input
            type="tel"
            id="telefono"
            value={telefono}
            onChange={(event) => setTelefono(event.target.value)}
            required
          />
        </label>
        <br />

        <label htmlFor="password">
          Contraseña:
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        <br />
        <br />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}
