import React, { useState } from "react";

export function FormEditarTelefono({ onSubmit, telefono }) {
  const [nuevoTelefono, setNuevoTelefono] = useState(telefono);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar el nuevo teléfono
    onSubmit(nuevoTelefono);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Teléfono:
        <input
          type="tel"
          value={nuevoTelefono}
          onChange={(event) => setNuevoTelefono(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Guardar</button>
    </form>
  );
}
