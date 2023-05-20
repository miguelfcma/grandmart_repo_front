import React, { useState, useEffect } from "react";
import "./FormUsuario.css";
import { useUsuarios } from "../UsuariosContext/UsuarioProvider";

export function FormUsuario  ({ onSubmit, initialUsuario =null })  {
  const {createUsuario, updateUsuario} = useUsuarios();

  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [email, setEmail] = useState("");
  const [sexo, setSexo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");

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
      let status;

      if (initialUsuario === null) {
        status = await createUsuario(formData);
      } else {
        status = await updateUsuario(initialUsuario.id, formData);
      }
      console.log(status)
      if (status == true) {
        setNombre("");
        setApellidoPaterno("");
        setApellidoMaterno("");
        setEmail("");
        setSexo("");
        setFechaNacimiento("");
        setTelefono("");
        setPassword("");
        setTipoUsuario("");
        onSubmit();
      } else {
        window.alert("Ha ocurrido un error al procesar la solicitud. Inténtelo de nuevo más tarde.");
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
            disabled={initialUsuario}
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
        {initialUsuario ? <div></div> :  <label htmlFor="password">
          Contraseña:
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>}
       

        <br />
        <label htmlFor="tipoUsuario">
          Tipo de usuario:
          <select
            id="tipoUsuario"
            value={tipoUsuario}
            onChange={(event) => setTipoUsuario(event.target.value === "true")}
            required
          >
            <option value="" defaultValue>
              Selecciona una opción
            </option>
            <option value="true">Administrador</option>
            <option value="false">Usuario regular</option>
          </select>
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
};