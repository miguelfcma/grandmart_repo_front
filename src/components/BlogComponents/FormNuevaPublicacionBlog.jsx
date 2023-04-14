import { useState } from "react";
import { usePublicacionesBlog } from "./BlogContext/BlogProvider";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import "./FormNuevaPublicacionBlog.css";
import { uploadImagesBlog } from "../../firebase/blogStorage";


export function FormNuevaPublicacionBlog() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [publicacion, setPublicacion] = useState({
    titulo: "",
    descripcion: "",
    id_usuario: usuario.id,
  });
  const [imagenes, setImagenes] = useState([]);
  const { createPublicacion, createImagenesPublicacionBlog } =
    usePublicacionesBlog();
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
            reject(
              new Error(
                `El archivo "${file.name}" excede el tamaño máximo permitido de 10 MB`
              )
            );
          } else {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              nuevasImagenes.push(file);
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
    console.log(imagenes);
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
      
      const urls = await uploadImagesBlog(imagenes);
      console.log(urls)
      const response = await createPublicacion(publicacion, urls);
      console.log(response.data.id)
      await createImagenesPublicacionBlog(response.data.id, urls);
      setImagenes([])
      setPublicacion({
        titulo: "",
        descripcion: "",
        id_usuario: usuario.id,
      });
      alert("La publicación se creó con éxito");

    } catch (error) {
      alert(`Error al crear la publicación: ${error.message}`);
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
        <div {...getRootProps()} className="dropzone-area">
          <input {...getInputProps()} />
          <p>
            Arrastre y suelte archivos aquí o haga clic para seleccionar
            archivos
          </p>
        </div>
        <div className="imagen-preview-container">
          {imagenes.map((imagen, index) => (
            <div key={index} className="imagen-preview">
              {index === 0 && (
                <>
                  <box-icon
                    type="solid"
                    name="star"
                    className="imagen-preview__icono-portada"
                  />
                  <span className="imagen-preview__texto-portada">Portada</span>
                </>
              )}
              <img
                src={URL.createObjectURL(imagen)}
                alt={`Imagen ${index + 1}`}
                className="imagen-preview__img"
              />
              <button
                type="button"
                onClick={() => handleEliminarImagen(index)}
                className="imagen-preview__eliminar"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>
        Crear publicación
      </Button>
    </Form>
  );
}
