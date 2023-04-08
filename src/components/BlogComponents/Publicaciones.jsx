import { useEffect,useState } from "react";
import { usePublicacionesBlog } from "./BlogContext/BlogProvider";
export function Publicaciones() {
  const { publicaciones, loadPublicaciones } = usePublicacionesBlog();
  const [comentarios, setComentarios] = useState({});

  useEffect(() => {
    loadPublicaciones();
  }, []);

  const handleSubmit = (event, publicacionId) => {
    event.preventDefault();
    // Aquí enviarías el comentario al servidor y lo agregarías a la lista de comentarios de la publicación
    console.log(comentarios[publicacionId]);
    setComentarios({
      ...comentarios,
      [publicacionId]: ""
    });
  };

  return (
    <div>
      {publicaciones.length > 0 ? (
        publicaciones.map((publicacion) => (
          <div key={publicacion.id}>
            <h3>{publicacion.titulo}</h3>
            <h4>Publicación por: {publicacion.usuario.nombre}</h4>
            <h4>
              Fecha de publicación:{" "}
              {new Date(publicacion.updatedAt).toLocaleDateString()}
            </h4>
            <p>{publicacion.descripcion}</p>
            <h4>Comentarios: </h4>
            <p></p>
            <img src={publicacion.imagen} alt={publicacion.titulo} />
  
            <form onSubmit={(event) => handleSubmit(event, publicacion.id)}>
              <label htmlFor={`comentario-${publicacion.id}`}>Agregar comentario:</label>
              <textarea
                id={`comentario-${publicacion.id}`}
                value={comentarios[publicacion.id] || ""}
                onChange={(event) =>
                  setComentarios({
                    ...comentarios,
                    [publicacion.id]: event.target.value
                  })
                }
              ></textarea>
              <button type="submit">Enviar</button>
            </form>
          </div>
        ))
      ) : (
        <p>No hay publicaciones.</p>
      )}
    </div>
  );
  
}
