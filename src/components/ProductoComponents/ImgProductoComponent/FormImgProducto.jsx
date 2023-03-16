import { useRef, useState } from "react";
import { uploadImageProducto } from "../../../firebase/productoStorage";
import { useProductos } from "../ProductosContext/ProductoProvider";

import { useNavigate } from "react-router-dom";
export function FormImgProducto() {
  const { createProductImage } = useProductos();
  const navigate = useNavigate();
  const archivoRef = useRef(null);
  const [error, setError] = useState("");
  const idProducto = localStorage.getItem("productoId");
  

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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="archivo">Imagen Producto:</label>
          <input id="archivo" type="file" accept="image/*" ref={archivoRef} />
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
        <button type="submit">Crear imagen</button>
      </form>
    </>
  );
}
