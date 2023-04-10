import { useRef, useState } from "react";
import { uploadImageProducto,uploadImagesProducto } from "../../../firebase/productoStorage";
import { useProductos } from "../ProductosContext/ProductoProvider";
import "./FormImgProductoCliente.css"
import { useNavigate } from "react-router-dom";

export function FormImgProductoCliente(idProducto) {
  const id_producto = idProducto.idProducto;

  const { createProductImage } = useProductos();
  const navigate = useNavigate(); 

 
  const [imgPortada, setImgPortada] = useState();
  const [imagenes, setImagenes] = useState([]);

  const archivoRef = useRef(null);
  const portadaRef = useRef(null);
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

  const handleAgregarPortada = (event) => {
    event.preventDefault();
    const archivo = portadaRef.current.files[0];

    if (!archivo) {
      setError("Debe seleccionar una imagen");
      return;
    }

    setImgPortada({
      archivo,
      url: URL.createObjectURL(archivo)
    });

    portadaRef.current.value = "";
    setError("");
  }

  const handleEliminarImagen = (index) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes.splice(index, 1);
    setImagenes(nuevasImagenes);
  };

  const handleSubirImagenes = async () => {
    try {
      if (!imgPortada) {
        setError("Debe seleccionar una imagen de portada");
        return;
      }
      
      if (imagenes.length === 0) {
        setError("Debe seleccionar al menos una imagen");
        return;
      }
  
      const archivos = imagenes.map((imagen) => imagen.archivo);
      const urls = await uploadImagesProducto(archivos);
      const portadaUrl = await uploadImageProducto(imgPortada);
      console.log("URL de imagen de portada subida:", portadaUrl);
      console.log("URLs de imágenes subidas:", urls);
  
      const productoImagenes = urls.map((url) => {
        return {
          url: url,
          id_producto: id_producto,
          es_portada: false
        };
      });
      console.log(productoImagenes)
      const portadaImagen = {
        url: portadaUrl,
        id_producto: id_producto,
        es_portada: true
      };
  //se guarda la url en la base de datos
      await createProductImage(portadaImagen);
// se guardan las url de la demas imagenes en la base de datos
 // Se guardan las URLs de las demás imágenes en la base de datos
 for (let i = 0; i < productoImagenes.length; i++) {
  const imagen = productoImagenes[i];
  await createProductImage(imagen);
}
  
      setImgPortada(null);
      setImagenes([]);
  navigate("/dashClient/productos")
    } catch (error) {
      console.error(error);
      alert("Error al subir las imágenes: " + error.message);
    }
  };
  

  

  return (
    <>
      <form onSubmit={handleAgregarImagen}>
        <div className="form-control">
          <label htmlFor="portada">Imagen de portada:</label>
          <input
            type="file"
            accept="image/*"
            id="portada"
            onChange={(event) => setImgPortada(event.target.files[0])}
          />
        </div>
        <div className="form-control">
          <label htmlFor="imagenes">Imágenes:</label>
          <div className="drag-drop">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleAgregarImagen}
              ref={archivoRef}
              id="imagenes"
            />
            <p>
              Arrastre y suelte archivos aquí, o haga clic para seleccionar
              archivos
            </p>
            {error && <div className="error">{error}</div>}
          </div>
        </div>
      </form>
  
      <div className="imagenes-contenedor">
      {/* Contenedor de imagen de portada */}
      {imgPortada && (
        <div key="portada" className="imagen-contenedor">
          <img src={URL.createObjectURL(imgPortada)} alt={`Imagen de portada`} />
          <h1>Portada</h1>
          <button onClick={() => setImgPortada(null)}>Eliminar</button>
        </div>
      )}
      
      {/* Contenedores de las demás imágenes */}
      {imagenes.map((imagen, index) => (
        <div key={index} className="imagen-contenedor">
          <img src={imagen.url} alt={`Imagen ${index + 1}`} />
          <button onClick={() => handleEliminarImagen(index)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  
      
        <button className="subir-boton" onClick={handleSubirImagenes}>
          Subir imágenes
        </button>
      
    </>
  );
      }  