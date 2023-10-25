//Este archivo se utiliza para permitir a los usuarios agregar comentarios a una publicacion en el blog

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
    comentario: "", //contiene el contenido del comentario
    id_publicacionBlog: id_publicacionBlog, //almacena el ID de la publicacion en la que se publicara el comentario
    id_usuario: usuario.id, //guarda el id del usuario que esta realizando el comentario
  });
  //Se utiliza para manejar los cambios en el campo de comentario, se va mostrando el comentario visualmente
  const handleComentarioChange = (event) => {
    setComentario({ ...comentario, comentario: event.target.value });
  };
  //Se ejecuta cuando el usuario hace clic en el boton de "Publicar"
  const handleSubmit = async (event) => {
    event.preventDefault();//Se recarga la pagina
    try {
      await createComentario(comentario);//Para crear el comentario en la base de datos
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

  //Renderizado del componente
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
