import { useRef, useState } from "react";
import { uploadImageProducto } from "../../../firebase/productoStorage";
import { useProductos } from "../ProductosContext/ProductoProvider";
import "./FormImgProducto.css"
import { useNavigate } from "react-router-dom";
export function FormImgProducto() {
  const { createProductImage } = useProductos();
  const navigate = useNavigate();
  const idProducto = localStorage.getItem("productoId");
  /*
  const archivoRef = useRef(null);
  const [error, setError] = useState("");
  
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const archivo = archivoRef.current.files[0];

    if (!archivo) {
      setError("El archivo es obligatorio");
      return;
    }

    try {
      const urlResponse = await uploadImageProducto(archivo);

      const imgProducto = {
        url: urlResponse,
        id_producto: idProducto,
      }

      const urlCreateResponse = await createProductImage(imgProducto);

      if (urlCreateResponse) {
        archivoRef.current.value = "";
        navigate("/dashAdmin/productos");
      }

      setError("");
    } catch (error) {
      console.error(error);
      alert("Error al subir la imagen: " + error.message);
    }
  };
*/
  const [imagenes, setImagenes] = useState([]);

  const archivoRef = useRef(null);
  const [error, setError] = useState("");

  const handleAgregarImagen = (event) => {
    event.preventDefault();
    const archivos = archivoRef.current.files;

    if (!archivos.length) {
      setError("Debe seleccionar al menos una imagen");
      return;
    }

    if (archivos.length + imagenes.length > 6) {
      setError("Solo se permiten un máximo de 6 imágenes");
      return;
    }

    const nuevasImagenes = [];

    for (let i = 0; i < archivos.length; i++) {
      const archivo = archivos[i];
      const urlImagen = URL.createObjectURL(archivo);
      nuevasImagenes.push({
        archivo,
        url: urlImagen,
      });
    }

    setImagenes([...imagenes, ...nuevasImagenes]);

    archivoRef.current.value = "";
    setError("");
  };

  const handleEliminarImagen = (index) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes.splice(index, 1);
    setImagenes(nuevasImagenes);
  };

  const handleSubirImagenes = async () => {
    try {
      const archivos = imagenes.map((imagen) => imagen.archivo);
      const urls = await uploadImagesProducto(archivos);

      console.log("URLs de imágenes subidas:", urls);
      setImagenes([]);
    } catch (error) {
      console.error(error);
      alert("Error al subir las imágenes: " + error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleAgregarImagen}>
        <div className="drag-drop">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleAgregarImagen}
            ref={archivoRef}
          />
          <p>
            Arrastre y suelte archivos aquí, o haga clic para seleccionar
            archivos
          </p>
          {error && <div className="error">{error}</div>}
        </div>
      </form>

      <div className="imagenes-contenedor">
        {imagenes.map((imagen, index) => (
          <div key={index} className="imagen-contenedor">
            <img src={imagen.url} alt={`Imagen ${index + 1}`} />
            <button onClick={() => handleEliminarImagen(index)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {imagenes.length > 0 && (
        <button className="subir-boton" onClick={handleSubirImagenes}>
          Subir imágenes
        </button>
      )}
    </>
  );
}
