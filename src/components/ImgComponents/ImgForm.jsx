import { useRef, useState } from "react";
import { uploadImageUsuario } from "../../firebase/usuarioStorage";
import "./ImgForm.css";

export function ImgForm() {
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
      //const response = await createImagenRequest(imagen);
      const result = await uploadImageUsuario(archivo);
      //console.log("Imagen creada:", response.data);
      console.log(result);
      // Reiniciar los valores del formulario después de enviar la imagen.
      archivoRef.current.value = "";
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
          <label htmlFor="archivo">Archivo:</label>
          <input id="archivo" type="file" accept="image/*" ref={archivoRef} />
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
        <button type="submit">Crear imagen</button>
      </form>
    </>
  );
}
