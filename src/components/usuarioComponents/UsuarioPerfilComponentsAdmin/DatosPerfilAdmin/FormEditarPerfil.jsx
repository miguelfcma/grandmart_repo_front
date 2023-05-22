import React, { useState } from "react";
export function FormEditarPerfil({
  onSubmit,
  nombre,
  apellidoPaterno,
  apellidoMaterno,
  fechaNacimiento,
  telefono,
  sexo,
}) {
  const [formulario, setFormulario] = useState({
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    fechaNacimiento,
    telefono,
    sexo,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };
  const validateTelefono = (telefono) => {
    const telefonoRegex = /^\d{10}$/;
    return telefonoRegex.test(telefono);
  };
  const validateEdadMinima = (fechaNacimiento) => {
    const fechaActual = new Date();
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const edadMinima = 18;
  
    let edadCalculada = fechaActual.getFullYear() - fechaNacimientoDate.getFullYear();
    if (
      fechaActual.getMonth() < fechaNacimientoDate.getMonth() ||
      (fechaActual.getMonth() === fechaNacimientoDate.getMonth() &&
        fechaActual.getDate() < fechaNacimientoDate.getDate())
    ) {
      edadCalculada--;
    }
  
    return edadCalculada >= edadMinima;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateTelefono(formulario.telefono)) {
      console.log("El número de teléfono no es válido");
      return;
    }
    if (!validateEdadMinima(formulario.fechaNacimiento)) {
      console.log("Debes tener al menos 18 años para enviar el formulario");
      return;
    }
    console.log(formulario);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={formulario.nombre}
          onChange={handleChange}
        />
      </label>
      <label>
        Apellido Paterno:
        <input
          type="text"
          name="apellidoPaterno"
          value={formulario.apellidoPaterno}
          onChange={handleChange}
        />
      </label>
      <label>
        Apellido Materno:
        <input
          type="text"
          name="apellidoMaterno"
          value={formulario.apellidoMaterno}
          onChange={handleChange}
        />
      </label>
      <label>
        Fecha de Nacimiento:
        <input
          type="date"
          name="fechaNacimiento"
          value={formulario.fechaNacimiento}
          onChange={handleChange}
        />
      </label>
      <label>
        Teléfono:
        <input
          type="tel"
          name="telefono"
          value={formulario.telefono}
          onChange={handleChange}
          pattern="[0-9]*"
          title="Ingresa solo números"
          required
        />
      </label>
      <label>
        Sexo:
        <select
          id="sexo"
          name="sexo"
          value={formulario.sexo}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
      </label>
      <button type="submit">Guardar cambios</button>
    </form>
  );
}
