import React, { useState } from "react";

export function FormEditarFechaNacimiento({ onSubmit, fechaNacimiento }) {
  const [nuevaFechaNacimiento, setNuevaFechaNacimiento] = useState(fechaNacimiento);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar la nueva fecha de nacimiento
    onSubmit(nuevaFechaNacimiento);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Fecha de Nacimiento:
        <input
          type="date"
          value={nuevaFechaNacimiento}
          onChange={(event) => setNuevaFechaNacimiento(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Guardar</button>
    </form>
  );
}
