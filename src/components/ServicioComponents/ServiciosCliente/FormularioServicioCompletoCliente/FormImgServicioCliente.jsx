import { useRef, useState } from "react";
import { uploadImagesServicio } from "../../../../firebase/servicioStorage";
import { useServicios } from "../../ServiciosContext/ServicioProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Form, Button, Alert } from "react-bootstrap";
import { useDropzone } from "react-dropzone";

export function FormImgServicioCliente({ idServicio }) {
  const id_servicio = idServicio;

  const { createImagenesServicioEnbd } = useServicios();

  const navigate = useNavigate();
  const [imagenes, setImagenes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
    maxFiles: 5,
  });

  const handleEliminarImagen = (index) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes.splice(index, 1);
    setImagenes(nuevasImagenes);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (imagenes.length === 0) {
        throw new Error("Debe agregar al menos una imagen");
      } else if (imagenes.length > 5) {
        throw new Error("Solo se pueden agregar 5 imágenes");
      }
      Swal.fire({
        title: "Cargando...",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      const urls = await uploadImagesServicio(imagenes);

      const status = await createImagenesServicioEnbd(id_servicio, urls);
      if (status === 201) {
        Swal.fire({
          icon: "success",
          title: "Imágenes subidas",
          text: "Las imágenes se han subido correctamente",
        });
        navigate("/dashClient/servicios");
      } else if (status === 500) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha ocurrido un error al procesar la solicitud",
        });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="imagenes">
        <Form.Label>Imágenes:</Form.Label>
        <p>
          Ahora ingresa las imágenes del servicio para finalizar el registro.
          Solo puedes agregar hasta 5 imágenes:
        </p>
        <div {...getRootProps()} className="dropzone-area">
          <input {...getInputProps()} />
          <p>
            Arrastra y suelta archivos aquí o haz clic para seleccionar archivos
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
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" type="submit" disabled={loading}>
        Crear publicación
      </Button>
    </Form>
  );
}
