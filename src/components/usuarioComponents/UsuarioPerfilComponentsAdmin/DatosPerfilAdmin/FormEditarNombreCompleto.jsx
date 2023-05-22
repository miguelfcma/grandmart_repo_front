import React, { useState } from "react";
export function FormEditarNombreCompleto({
  onSubmit,
  nombre,
  apellidoPaterno,
  apellidoMaterno,
}) {
  const [nuevoNombre, setNuevoNombre] = useState(nombre);
  const [nuevoApellidoPaterno, setNuevoApellidoPaterno] =
    useState(apellidoPaterno);
  const [nuevoApellidoMaterno, setNuevoApellidoMaterno] =
    useState(apellidoMaterno);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar los datos actualizados
    onSubmit({
      nombre: nuevoNombre,
      apellidoPaterno: nuevoApellidoPaterno,
      apellidoMaterno: nuevoApellidoMaterno,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          value={nuevoNombre}
          onChange={(event) => setNuevoNombre(event.target.value)}
        />
      </label>
      <br />
      <label>
        Apellido Paterno:
        <input
          type="text"
          value={nuevoApellidoPaterno}
          onChange={(event) => setNuevoApellidoPaterno(event.target.value)}
        />
      </label>
      <br />
      <label>
        Apellido Materno:
        <input
          type="text"
          value={nuevoApellidoMaterno}
          onChange={(event) => setNuevoApellidoMaterno(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Guardar</button>
    </form>
  );
}
