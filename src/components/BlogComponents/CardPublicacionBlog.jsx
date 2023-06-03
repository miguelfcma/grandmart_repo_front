import { ListaComentariosPublicacionBlog } from "./ListaComentariosPublicacionBlog";
import { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { usePublicacionesBlog } from "./BlogContext/BlogProvider";
import "./CardPublicacionBlog.css";
import { IoTrashBin } from "react-icons/io5";
import Swal from "sweetalert2";

export function CardPublicacionBlog({ publicacion }) {
  const [comentariosVisibles, setComentariosVisibles] = useState(false);
  const [descripcionCompleta, setDescripcionCompleta] = useState(false);
  const { deletePublicacionPorIdUsuario, getImagenPortadaPorIdPublicacion } =
    usePublicacionesBlog();
  const MAX_DESCRIPCION_LENGTH = 0;
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [urlImagen, setUrlImagen] = useState("");

  async function obtenerUrlImagenAsync(id_publicacionBlog) {
    const url = await getImagenPortadaPorIdPublicacion(id_publicacionBlog);
    setUrlImagen(url);
  }

  useEffect(() => {
    obtenerUrlImagenAsync(publicacion.id);
  }, [publicacion.id]);

  const toggleDescripcion = () => {
    setDescripcionCompleta((completa) => !completa);
  };

  const toggleComentarios = () => {
    setComentariosVisibles((visibles) => !visibles);
  };

  const handleEliminarPublicacion = async () => {
    const { value: confirmDelete } = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la publicación de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmDelete) {
      const status = await deletePublicacionPorIdUsuario(
        usuario.id,
        publicacion.id
      );

      if (status === 204) {
        Swal.fire({
          title: "Eliminado",
          text: "La publicación ha sido eliminada.",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al eliminar la publicación.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="container-principal">
      <Container className="blog-container">
        <Card key={publicacion.id} className="publicacion-card">
          <Card.Body>
            <Card.Title className="publicacion-titulo">
              {publicacion.titulo}
            </Card.Title>
            <img
              className="publicacion-imagen"
              src={urlImagen}
              alt={publicacion.titulo}
            />
            <Card.Text className="publicacion-descripcion">
              {descripcionCompleta
                ? publicacion.descripcion
                : publicacion.descripcion.slice(0, MAX_DESCRIPCION_LENGTH)}
            </Card.Text>
            {publicacion.descripcion.length > MAX_DESCRIPCION_LENGTH && (
              <Button
                variant="link"
                className="publicacion-toggle-descripcion"
                onClick={toggleDescripcion}
              >
                {descripcionCompleta ? "Ver menos" : "Ver más"}
              </Button>
            )}
            <Card.Footer className="publicacion-pie">
              <span className="publicacion-info-autor">
                Publicación por: {publicacion.usuario.nombre} - Fecha de
                publicación:{" "}
                {new Date(publicacion.updatedAt).toLocaleDateString()}
              </span>
              {usuario.id === publicacion.usuario.id && (
                <IoTrashBin
                  className="eliminar-publicacion-icon"
                  onClick={handleEliminarPublicacion}
                />
              )}
            </Card.Footer>
            <Button
              onClick={toggleComentarios}
              className="toggle-comentarios-btn"
              variant="secondary"
            >
              {comentariosVisibles
                ? "Ocultar comentarios"
                : "Comentarios"}
            </Button>{" "}
            {comentariosVisibles && (
              <ListaComentariosPublicacionBlog
                id_publicacionBlog={publicacion.id}
              />
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
