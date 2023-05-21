import React, { useState } from "react";

export function FormEditarEmail({ onSubmit, email }) {
  const [nuevoEmail, setNuevoEmail] = useState(email);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar el nuevo email
    onSubmit(nuevoEmail);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={nuevoEmail}
          onChange={(event) => setNuevoEmail(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Guardar</button>
    </form>
  );
}
