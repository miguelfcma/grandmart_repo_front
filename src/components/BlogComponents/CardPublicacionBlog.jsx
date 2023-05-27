import { ListaComentariosPublicacionBlog } from "./ListaComentariosPublicacionBlog";

import { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { usePublicacionesBlog } from "./BlogContext/BlogProvider";
import "./CardPublicacionBlog.css";

export function CardPublicacionBlog({ publicacion }) {
  const [comentariosVisibles, setComentariosVisibles] = useState(false);
  const [descripcionCompleta, setDescripcionCompleta] = useState(false);
  const { deletePublicacionPorIdUsuario, getImagenPortadaPorIdPublicacion } =
    usePublicacionesBlog();
  const MAX_DESCRIPCION_LENGTH = 10;
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

  const handleEliminarPublicacion = () => {
    deletePublicacionPorIdUsuario(publicacion.id, usuario.id);
    // Realizar cualquier otra acción necesaria después de eliminar la publicación
  };

  return (
    <div style={{ maxWidth: "1200px", display: "flex", flexWrap: "wrap" }}>
      <Container className="blog-container">
        <Card key={publicacion.id} className="publicacion">
          <Card.Body>
            <Card.Title>{publicacion.titulo}</Card.Title>
            <img
              className="card-publicacion-img"
              src={urlImagen}
              alt={publicacion.titulo}
            />
            <Card.Text>
              {descripcionCompleta
                ? publicacion.descripcion
                : publicacion.descripcion.slice(0, MAX_DESCRIPCION_LENGTH) +
                  "..."}
              {publicacion.descripcion.length > MAX_DESCRIPCION_LENGTH && (
                <Button variant="link" onClick={toggleDescripcion}>
                  {descripcionCompleta ? "Ver menos" : "Ver más"}
                </Button>
              )}
            </Card.Text>
            <Card.Footer>
              <span>
                Publicación por: {publicacion.usuario.nombre} - Fecha de
                publicación:{" "}
                {new Date(publicacion.updatedAt).toLocaleDateString()}
              </span>
            </Card.Footer>
            {usuario.id === publicacion.usuario.id && (
              <Button
                variant="danger"
                onClick={handleEliminarPublicacion}
              >
                Eliminar publicación
              </Button>
            )}
            <Button onClick={toggleComentarios} className="btn-comentarios">
              {comentariosVisibles
                ? "Ocultar comentarios"
                : "Mostrar comentarios"}
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
