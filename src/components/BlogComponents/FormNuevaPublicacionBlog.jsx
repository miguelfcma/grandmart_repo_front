import { useState } from "react";
import { usePublicacionesBlog } from "./BlogContext/BlogProvider";
import { Form, Button } from "react-bootstrap";
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
  const [loading, setLoading] = useState(false);

  const onDrop = async (acceptedFiles) => {
    setLoading(true);
    const nuevasImagenes = [];
    const maxSize = 10 * 1024 * 1024; // 10 MB
    await Promise.all(
      acceptedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          if (!file.type.startsWith("image/")) {
            reject(new Error(`El archivo "${file.name}" no es una imagen`));
          } else if (file.size > maxSize) {
            reject(new Error(`El archivo "${file.name}" excede el tamaño máximo permitido de 10 MB`));
          } else {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              nuevasImagenes.push(reader.result);
              resolve();
            };
            reader.onerror = reject;
          }
        });
      })
    );
    setLoading(false);
    setImagenes((prevImagenes) => [...prevImagenes, ...nuevasImagenes]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
    maxFiles: 5,
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
          <p>
            Arrastre y suelte archivos aquí o haga clic para seleccionar archivos
          </p>
        </div>
        {imagenes.map((imagen, index) => (
          <div key={index}>
            <img src={imagen} alt={`Imagen ${index + 1}`} />
            <button type="button" onClick={() => handleEliminarImagen(index)}>
              Eliminar
            </button>
          </div>
        ))}
      </Form.Group>
      {imagenes.length >= 5 && <p>Sólo se permiten hasta 5 imágenes</p>}
      {imagenes.some((imagen) => !imagen.startsWith("data:image")) && (
        <p>Sólo se permiten archivos de imagen</p>
      )}
      <Button variant="primary" type="submit" disabled={loading}>
        Crear publicación
      </Button>
    </Form>
  );
  
}