import React, { useState } from "react";

export function FormEditarSexo({ onSubmit, sexo }) {
  const [nuevoSexo, setNuevoSexo] = useState(sexo);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar el nuevo sexo
    onSubmit(nuevoSexo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Sexo:
        <select value={nuevoSexo} onChange={(event) => setNuevoSexo(event.target.value)}>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
        </select>
      </label>
      <br />
      <button type="submit">Guardar</button>
    </form>
  );
}
