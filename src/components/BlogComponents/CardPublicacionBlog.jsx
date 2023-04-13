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

  const [urlImagen, setUrlImagen] = useState("");
  async function obtenerUrlImagenAsync(id_publicacionBlog) {
    const url = await getImagenPortadaPorIdPublicacion(id_publicacionBlog);
    console.log(url)
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

  return (
    <div>
      <Container fluid className="blog-container">
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
            <Button onClick={toggleComentarios} className="btn-comentarios">
              {comentariosVisibles
                ? "Ocultar comentarios"
                : "Mostrar comentarios"}
            </Button>{" "}
            {/* 2. cambiar el texto del botón según si los comentarios están visibles o no */}
            {comentariosVisibles && (
              <ListaComentariosPublicacionBlog
                id_publicacionBlog={publicacion.id}
              />
            )}{" "}
            {/* mostrar la lista de comentarios solo si los comentarios están visibles */}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
