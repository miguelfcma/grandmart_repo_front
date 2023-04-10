import { useState, useEffect } from "react";
import { usePublicacionesBlog } from "./BlogContext/BlogProvider";
import { FormComentarioPublicacionBlog } from "./FormComentarioPublicacionBlog";

export function ListaComentariosPublicacionBlog({ id_publicacionBlog }) {
  const { getComentariosPorIdPublicacion } = usePublicacionesBlog();
  const [comentarios, setComentarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchComentarios() {
      try {
        const comentarios = await getComentariosPorIdPublicacion(
          id_publicacionBlog
        );
        console.log(comentarios);
        setComentarios(comentarios);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchComentarios();
  }, [id_publicacionBlog]);
  const actualizarComentarios = async () => {
    try {
      const comentariosActualizados = await getComentariosPorIdPublicacion(
        id_publicacionBlog
      );
      setComentarios(comentariosActualizados);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {isLoading ? (
        <p>Cargando comentarios...</p>
      ) : comentarios.length > 0 ? (
        comentarios.map((comentario) => (
          <div key={comentario.id}>
            <p>{comentario.comentario}</p>
            <p>Por: {comentario.usuario.nombre}</p>
          </div>
        ))
      ) : (
        <p>No hay comentarios aún.</p>
      )}
      <FormComentarioPublicacionBlog
        id_publicacionBlog={id_publicacionBlog}
        actualizarComentarios={actualizarComentarios}
      />
    </div>
  );
}