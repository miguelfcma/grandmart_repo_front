import { ListaComentariosPublicacionBlog } from "./ListaComentariosPublicacionBlog";
import { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { usePublicacionesBlog } from "./BlogContext/BlogProvider";

export function CardPublicaciónBlog({ publicacion }) {
  const [comentariosVisibles, setComentariosVisibles] = useState(false); // 1. agregar el estado para almacenar si los comentarios están visibles o no
  const {deletePublicacionPorIdUsuario} = usePublicacionesBlog();
  
  const handleEliminarProducto = async () => {
    try {
      const imagenesProducto = await getAllImagesProduct(producto.id);
      const urls = imagenesProducto.map((imagen) => imagen.url);

      await deleteImagesProducto(urls);
      await deletePublicacionPorIdUsuario(producto.id);
    } catch (error) {
      console.error(error);
    }
}

  const toggleComentarios = () => {
    // 3. al hacer clic en el botón, cambiar el valor del estado que indica si los comentarios están visibles o no
    setComentariosVisibles((visibles) => !visibles);
  };

  return (
    <div>
      <Container fluid className="blog-container">
    
        <Card key={publicacion.id} className="publicacion">
          <Card.Body>
            <Card.Title>
              id: {publicacion.id} Titulo:{publicacion.titulo}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Publicación por: {publicacion.usuario.nombre}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Fecha de publicación:{" "}
              {new Date(publicacion.updatedAt).toLocaleDateString()}
            </Card.Subtitle>
            <Card.Text>{publicacion.descripcion}</Card.Text>
            <Button onClick={toggleComentarios}>
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
