import { useState } from "react";
import { usePublicacionesBlog } from "./BlogContext/BlogProvider";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
  Alert,
} from "react-bootstrap";
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

  const [alerta, setAlerta] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const urls = await uploadImagesBlog(imagenes);

      const response = await createPublicacion(publicacion, urls);

      if (response.status === 201 && response.data && response.data.id) {
        const dataUrls = await createImagenesPublicacionBlog(
          response.data.id,
          urls
        );

        if (dataUrls) {
          setLoading(false);
          setAlerta({
            variant: "success",
            mensaje: "La publicación y sus imágenes se crearon correctamente.",
          });
        } else {
          setLoading(false);
          setAlerta({
            variant: "danger",
            mensaje:
              "Hubo un problema al crear las imágenes de la publicación.",
          });
        }
      } else {
        setLoading(false);
        setAlerta({
          variant: "danger",
          mensaje: "Hubo un problema al crear la publicación.",
        });
      }
    } catch (error) {
      setLoading(false);
      setAlerta({
        variant: "danger",
        mensaje: `Error al crear la publicación: ${error.message}`,
      });
    }
  };

  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {alerta && (
        <Alert
          variant={alerta.variant}
          onClose={() => setAlerta(null)}
          dismissible
        >
          {alerta.mensaje}
        </Alert>
      )}

      <Button variant="primary"  className="btnFormShow" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Ocultar formulario" : "Hacer una publicación"}
      </Button>
      {showForm && (
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
                      <span className="imagen-preview__texto-portada">
                        Portada
                      </span>
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
      )}
    </div>
  );
}
