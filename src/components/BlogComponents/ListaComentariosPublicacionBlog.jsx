import { useState, useEffect } from "react";
import { usePublicacionesBlog } from "./BlogContext/BlogProvider";
import { FormComentarioPublicacionBlog } from "./FormComentarioPublicacionBlog";
import "./ListaComentariosPublicacionBlog.css";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from "react-icons/ri";
export function ListaComentariosPublicacionBlog({ id_publicacionBlog }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { getComentariosPorIdPublicacion, deleteComentarioPorIdUsuario } =
    usePublicacionesBlog();
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

  const eliminarComentario = async (comentarioId) => {
    const { value: confirmDelete } = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el comentario de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmDelete) {
      try {
        const status = await deleteComentarioPorIdUsuario(
          usuario.id,
          comentarioId
        );
        if (status === 200) {
          Swal.fire({
            title: "Eliminado",
            text: "El comentario ha sido eliminado.",
            icon: "success",
          });
          actualizarComentarios(); // Actualizar la lista de comentarios después de eliminar
        } else {
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar el comentario.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
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
          <div key={comentario.id} className="comentario">
            <div className="contenido">
              <div className="nombre">{comentario.usuario.nombre}</div>
              <div className="texto">{comentario.comentario}</div>
              <div className="fecha">
                Comentario realizado el:
                {new Date(comentario.updatedAt).toLocaleDateString()}
              </div>
              {usuario ? (
                usuario.id === comentario.usuario.id && (
                  <RiDeleteBin6Line
                    onClick={() => eliminarComentario(comentario.id)}
                    className="eliminar-icono"
                  />
                )
              ) : (
                <></>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No hay comentarios aún.</p>
      )}
      {usuario ? (
        <FormComentarioPublicacionBlog
          id_publicacionBlog={id_publicacionBlog}
          actualizarComentarios={actualizarComentarios}
        />
      ) : (
        <h6>Por favor inicia sesión para relizar un comentario</h6>
      )}
    </div>
  );
}
