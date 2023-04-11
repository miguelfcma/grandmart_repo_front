import { useCategorias } from "../../CategoriaComponents/CategoriasContext/CategoriaProvider";
import { useState, useEffect } from "react";
import { useServicios } from "../ServiciosContext/ServicioProvider";
import { useNavigate } from "react-router-dom";


export function FormNuevoServicioAdmin() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { createServicio } = useServicios();
  const [servicio, setServicio] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    id_categoria: "",
    id_usuario: usuario.id,
  });

  const { categorias, loadCategorias } = useCategorias();
  useEffect(() => {
    loadCategorias();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setServicio((prevServicio) => ({
      ...prevServicio,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(servicio);

    if (
      servicio.titulo === "" ||
      servicio.precio === "" ||
      servicio.id_categoria === ""
    ) {
      console.log("Por favor complete los campos obligatorios");
      return;
    }

    const response = await createServicio(servicio);
    if (response) {
      const idServicio = response.servicio.id;
      navigate(`/dashClient/servicios/registro-servicio/${idServicio}`);
    }
  };

  const handleIdParentChange = (event) => {
    const { value } = event.target;
    setServicio((prevServicio) => ({
      ...prevServicio,
      id_categoria: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Título del servicio:
        <input
          type="text"
          name="titulo"
          value={servicio.titulo}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Precio del servicio:
        <input
          type="number"
          name="precio"
          value={servicio.precio}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Descripción del servicio:
        <textarea
          name="descripcion"
          value={servicio.descripcion}
          onChange={handleChange}
        />
      </label>

      <label>
        Categoría del servicio:
        <select
          name="id_categoria"
          value={servicio.id_categoria}
          onChange={handleIdParentChange}
          required
        >
          <option value="">Seleccionar categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Agregar</button>
    </form>
  );
}
