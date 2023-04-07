import { useState } from "react";

export function ComentariosProducto() {
  const [comentarios, setComentarios] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const comentario = e.target.comentario.value;
    setComentarios([...comentarios, comentario]);
    e.target.reset();
  };

  return (
    <div>
      <h2>Comentarios</h2>
      <ul>
        {comentarios.map((comentario, index) => (
          <li key={index}>{comentario}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label htmlFor="comentario">Agregar comentario:</label>
        <input type="text" name="comentario" id="comentario" required />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}
