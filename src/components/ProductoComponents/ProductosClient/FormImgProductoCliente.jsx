import { useRef, useState } from "react";
import { uploadImagesProducto } from "../../../firebase/productoStorage";
import { useProductos } from "../ProductosContext/ProductoProvider";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Form, Button, Alert } from "react-bootstrap";
import { useDropzone } from "react-dropzone";

// Componente para que el cliente pueda agregar imágenes a un producto
export function FormImgProductoCliente(idProducto) {
  const id_producto = idProducto.idProducto;

  const { createImagenesProductoEnbd } = useProductos();

  const navigate = useNavigate();
  const [imagenes, setImagenes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Maneja la subida de imágenes al sistema
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

  // Configuración del área de arrastrar y soltar (Dropzone)
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
    maxFiles: 7,
  });

  // Maneja la eliminación de una imagen
  const handleEliminarImagen = (index) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes.splice(index, 1);
    setImagenes(nuevasImagenes);
  };

  // Maneja la presentación del formulario y realiza la validación antes de enviar los datos
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (imagenes.length === 0) {
        throw new Error("Debe agregar al menos una imagen");
      } else if (imagenes.length > 7) {
        throw new Error("Solo se pueden agregar 7 imágenes");
      }
      Swal.fire({
        title: "Cargando...",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      const urls = await uploadImagesProducto(imagenes);

      const status = await createImagenesProductoEnbd(id_producto, urls);
      if (status === 201) {
        Swal.fire({
          icon: "success",
          title: "Imágenes subidas",
          text: "Las imágenes se han subido correctamente",
        });
        navigate("/dashClient/productos");
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
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="imagenes">
        <Form.Label>Imágenes:</Form.Label>
        <p>
          Ahora ingresa las imágenes del producto para finalizar el registro.
          Solo puedes agregar hasta 7 imágenes:
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
