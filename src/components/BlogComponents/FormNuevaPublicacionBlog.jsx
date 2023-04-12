import { useState } from "react";
import { usePublicacionesBlog } from "./BlogContext/BlogProvider";
import { Form, Button } from 'react-bootstrap';
import { useDropzone } from "react-dropzone";

export function FormNuevaPublicacionBlog() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [publicacion, setPublicacion] = useState({
    titulo: "",
    descripcion: "",
    id_usuario: usuario.id,
  });
  const [imagenes, setImagenes] = useState([]);
  const { createPublicacion } = usePublicacionesBlog();

  const onDrop = (acceptedFiles) => {
    const nuevasImagenes = [...imagenes];
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        nuevasImagenes.push(reader.result);
      };
    });
    setImagenes(nuevasImagenes);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  const handleEliminarImagen = (index) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes.splice(index, 1);
    setImagenes(nuevasImagenes);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPublicacion((prevPublicacion) => ({
      ...prevPublicacion,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createPublicacion({ ...publicacion, imagenes });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="titulo">
        <Form.Label>Titulo:</Form.Label>
        <Form.Control
          type="text"
          name="titulo"
          value={publicacion.titulo}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="descripcion">
        <Form.Label>Descripcion:</Form.Label>
        <Form.Control
          type="text"
          name="descripcion"
          value={publicacion.descripcion}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="imagenes">
        <Form.Label>Imágenes:</Form.Label>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Arrastre y suelte archivos aquí o haga clic para seleccionar archivos</p>
        </div>
        {imagenes.map((imagen, index) => (
          <div key={index}>
            <img src={imagen} alt={`Imagen ${index + 1}`} />
            <button type="button" onClick={() => handleEliminarImagen(index)}>Eliminar</button>
          </div>
        ))}
      </Form.Group>
      <Button variant="primary" type="submit">
        Crear publicación
      </Button>

    </Form>
  );
}
