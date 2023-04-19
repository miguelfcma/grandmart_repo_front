import { async } from "@firebase/util";
import { useState, useEffect } from "react";
import { useCategorias } from "../../CategoriaComponents/CategoriasContext/CategoriaProvider";
import { useServicios } from "../ServiciosContext/ServicioProvider";

export function FormUpdateServicioAdmin({ onSubmit, servicio }) {
  const { updateServicio } = useServicios();
  const { categorias, loadCategorias } = useCategorias();
  useEffect(() => {
    loadCategorias();
  }, []);
  const [formValues, setFormValues] = useState({
    titulo: servicio.titulo,
    descripcion: servicio.descripcion,
    precio: servicio.precio,
    id_categoria: servicio.id_categoria,
  });
  console.log(formValues);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateServicio(servicio.id, formValues);
      onSubmit();
    } catch (error) {
      console.error(error);
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
      <label htmlFor="titulo">Titulo:</label>
      <input
        type="text"
        id="titulo"
        name="titulo"
        value={formValues.titulo}
        onChange={handleInputChange}
      />

      <label htmlFor="descripcion">Descripción:</label>
      <textarea
        id="descripcion"
        name="descripcion"
        value={formValues.descripcion}
        onChange={handleInputChange}
      ></textarea>

      <label htmlFor="precio">Precio:</label>
      <input
        type="number"
        id="precio"
        name="precio"
        value={formValues.precio}
        onChange={handleInputChange}
      />

      <label>
        Categoría del producto:
        <select
          name="id_categoria"
          value={formValues.id_categoria}
          onChange={handleInputChange}
          required
        >
          <option value="">Seleccionar categoría padre</option>
          {categorias
            .filter((categoria) => categoria.id_parent === null)
            .map((categoriaPadre) => (
              <optgroup
                className="categoria-padre"
                label={categoriaPadre.nombre}
                key={categoriaPadre.id}
              >
                {categorias
                  .filter(
                    (categoria) =>
                      categoria.id_parent === categoriaPadre.id &&
                      categoria.id !== formValues.id_categoria
                  )
                  .map((categoriaHija) => (
                    <option
                      key={categoriaHija.id}
                      value={categoriaHija.id}
                      selected={categoriaHija.id === formValues.id_categoria} // Agregamos el atributo selected si el id de la categoría coincide con el id del producto
                    >
                      {categoriaHija.nombre}
                    </option>
                  ))}
              </optgroup>
            ))}
        </select>
      </label>

      <button type="submit">Actualizar servicio</button>
    </form>
  );
}
