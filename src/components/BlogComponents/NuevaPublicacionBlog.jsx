import { useState } from "react";
import { usePublicacionesBlog } from "./BlogContext/BlogProvider";

export function NuevaPublicacionBlog() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [publicacion, setPublicacion] = useState({
    titulo: "",
    descripcion: "",
    id_usuario: usuario.id,
  });
  const { createPublicacion } = usePublicacionesBlog();

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
      const response = await createPublicacion(publicacion);
    } catch (error) {
      console.log(error);
    }


  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Titulo:
        <input
          type="text"
          name="titulo"
          value={publicacion.titulo}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Descripcion:
        <input
          type="text"
          name="descripcion"
          value={publicacion.descripcion}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Crear publicación</button>
    </form>
  );
}
