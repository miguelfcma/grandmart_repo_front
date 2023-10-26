import { useState } from "react";

// Componente para agregar y mostrar comentarios.
export function ComentariosProducto() {
  // Estado para almacenar los comentarios.
  const [comentarios, setComentarios] = useState([]);

  // Función que se ejecuta cuando se envía el formulario para agregar un comentario.
  const handleSubmit = (e) => {
    e.preventDefault();
    const comentario = e.target.comentario.value;

    // Agrega el comentario al estado de comentarios.
    setComentarios([...comentarios, comentario]);

    // Limpia el campo de entrada del comentario.
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
