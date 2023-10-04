import { useState } from "react";
import { usePublicacionesBlog } from "./BlogContext/BlogProvider";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import "./FormComentarioPublicacionBlog.css";

import Swal from "sweetalert2";
export function FormComentarioPublicacionBlog({
  id_publicacionBlog,
  actualizarComentarios,
}) {
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
      Swal.fire({
        title: "¡Comentario creado!",
        text: "El comentario se ha creado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.log("Ha ocurrido un error al crear el comentario: ", error);
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al crear el comentario. Por favor, inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Form className="form-comentario" onSubmit={handleSubmit}>
      <FormGroup>
        <FormLabel htmlFor="comentario">Comentario:</FormLabel>
        <FormControl
          id="comentario"
          name="comentario"
          as="textarea"
          rows={3}
          value={comentario.comentario}
          onChange={handleComentarioChange}
        />
      </FormGroup>
      <Button
        className="btn-publicar"
        variant="primary"
        type="submit"
        disabled={!comentario.comentario.trim()}
      >
        Publicar comentario
      </Button>
    </Form>
  );
}
