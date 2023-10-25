//Este archivo se utiliza para representar una publicacion del blog, que contiene un titulo, una imagen de portada, una descripcion, informacion del autor y la posibilidad de ver los comentarios

import { ListaComentariosPublicacionBlog } from "./ListaComentariosPublicacionBlog";
import { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { usePublicacionesBlog } from "./BlogContext/BlogProvider";
import "./CardPublicacionBlog.css";
import { IoTrashBin } from "react-icons/io5";
import Swal from "sweetalert2";

export function CardPublicacionBlog({ publicacion }) {
  //Estado para activar u ocultar los comentarios, se inicia en falso
  const [comentariosVisibles, setComentariosVisibles] = useState(false);
  //Estado para activar u ocultar por completo las descripciones de las publicaciones, se inicia en falso
  const [descripcionCompleta, setDescripcionCompleta] = useState(false);
  const { deletePublicacionPorIdUsuario, getImagenPortadaPorIdPublicacion } =
    usePublicacionesBlog();
  //Se define la longitud maxima de la descripcion que se mostrara antes de que se corte
  const MAX_DESCRIPCION_LENGTH = 0;
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  //Almacena la URL de la imagen de portada de la publicacion
  const [urlImagen, setUrlImagen] = useState("");
  //Funcion asincrona para obtener la URL de la imagen de portada de publicacion
  async function obtenerUrlImagenAsync(id_publicacionBlog) {
    const url = await getImagenPortadaPorIdPublicacion(id_publicacionBlog);
    setUrlImagen(url);
  }
  //Se utiliza el efecto para llamar a esta funcion cuando cambia el id de la publicacion
  useEffect(() => {
    obtenerUrlImagenAsync(publicacion.id);
  }, [publicacion.id]);

  //Permite alternar la visualizacion de la descripcion
  const toggleDescripcion = () => {
    setDescripcionCompleta((completa) => !completa);
  };
 //Permite alternar la visualizacion de los comentarios
  const toggleComentarios = () => {
    setComentariosVisibles((visibles) => !visibles);
  };
  //Maneja la eliminacion de la publicacion por parte del usuario
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

  //Renderizado del componente
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
              {/*Si el usuario coincide con el autor de la publicacion o es un administrador, se muestra el icono para poder eliminar la publicacion */}
              {usuario ? (
                (usuario.id === publicacion.usuario.id ||
                  usuario.tipo === 0) && (
                  <IoTrashBin
                    className="eliminar-publicacion-icon"
                    onClick={handleEliminarPublicacion}
                  />
                )
              ) : (
                <></>
              )}
            </Card.Footer>
            <Button
              onClick={toggleComentarios}
              className="toggle-comentarios-btn"
              variant="secondary"
            >
              {comentariosVisibles ? "Ocultar comentarios" : "Comentarios"}
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
