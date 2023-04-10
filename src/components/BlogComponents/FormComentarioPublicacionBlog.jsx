import { useState } from "react";
import { usePublicacionesBlog } from "./BlogContext/BlogProvider";

export function FormComentarioPublicacionBlog({ id_publicacionBlog, actualizarComentarios }) {
  const { createComentario } = usePublicacionesBlog();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [comentario, setComentario] = useState({
    comentario: "",
    id_publicacionBlog: id_publicacionBlog,
    id_usuario: usuario.id,
  });

  const handleComentarioChange = (event) => {
    setComentario({ ...comentario, comentario: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createComentario(comentario);
      setComentario({
        comentario: "",
        id_publicacionBlog: id_publicacionBlog,
        id_usuario: usuario.id,
      });
      actualizarComentarios();
    } catch (error) {
      console.log("Ha ocurrido un error al crear el comentario: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="comentario">Comentario:</label>
        <textarea
          id="comentario"
          name="comentario"
          value={comentario.comentario}
          onChange={handleComentarioChange}
        />
      </div>
      <button type="submit">Publicar comentario</button>
    </form>
  );
}
