import { useState } from "react";
import { usePublicacionesBlog } from "./BlogContext/BlogProvider";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
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
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [contadorCaracteres, setContadorCaracteres] = useState(0);

  const onDrop = async (acceptedFiles) => {
    const nuevasImagenes = [];
    const maxSize = 10 * 1024 * 1024; // 10 MB
    try {
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
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
    maxFiles: 1,
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
    if (name === "descripcion") {
      setContadorCaracteres(value.length);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (imagenes.length === 0) {
        throw new Error("Debe agregar al menos una imagen");
      } else if (imagenes.length > 1) {
        throw new Error("Solo puedes agregar una imagen de portada");
      }
      const urls = await uploadImagesBlog(imagenes);

      const response = await createPublicacion(publicacion, urls);

      if (response.status === 201 && response.data && response.data.id) {
        const dataUrls = await createImagenesPublicacionBlog(
          response.data.id,
          urls
        );

        if (dataUrls) {
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "La publicación y sus imágenes se crearon correctamente.",
          }).then(() => {
            setPublicacion({
              titulo: "",
              descripcion: "",
              id_usuario: usuario.id,
            });
            setImagenes([]);
            setShowForm(false);
            setShowModal(false); // Cerrar el modal
            setContadorCaracteres(0);
          });
        } else {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un problema al crear las imágenes de la publicación.",
          });
        }
      } else {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al crear la publicación.",
        });
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error);
    }
  };

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="centered-container">
      <Button
        variant="primary"
        className="btnFormShow"
        onClick={() => setShowModal(!showModal)}
      >
        Hacer una publicación
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Hacer una nueva publicación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="titulo">
              <Form.Label>Título:</Form.Label>
              <Form.Control
                type="text"
                name="titulo"
                value={publicacion.titulo}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="descripcion">
              <Form.Label>Descripción:</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={publicacion.descripcion}
                onChange={handleChange}
                maxLength={1500}
                required
              />
              <p>Caracteres restantes: {1500 - contadorCaracteres}</p>
            </Form.Group>

            <Form.Group controlId="imagenes">
              <Form.Label>Imágenes:</Form.Label>
              <p>
                Ingresa una imagen de portada a la publicación. Solo puedes
                agregar 1 imagen:
              </p>
              <div {...getRootProps()} className="dropzone-area">
                <input {...getInputProps()} />
                <p>
                  Arrastra y suelta archivos aquí o haz clic para seleccionar
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
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" type="submit" disabled={loading}>
              Crear publicación
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
