import { useRef, useState } from "react";
import {
  uploadImagesProducto,
} from "../../../firebase/productoStorage";
import { useProductos } from "../ProductosContext/ProductoProvider";
import "./FormImgProductoAdmin.css";
import { useNavigate } from "react-router-dom";

import { Form, Button} from "react-bootstrap";
import { useDropzone } from "react-dropzone";

export function FormImgProductoAdmin(idProducto) {
  const id_producto = idProducto.idProducto;

  const { createImagenesProductoEnbd } = useProductos();

  const navigate = useNavigate();
  const [imagenes, setImagenes] = useState([]);

  const [loading, setLoading] = useState(false); // Agrega un estado de carga

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const urls = await uploadImagesProducto(imagenes);
      console.log(urls)
      const dataUrls = await createImagenesProductoEnbd(id_producto, urls);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
