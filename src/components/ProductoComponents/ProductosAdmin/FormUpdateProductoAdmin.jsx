import { async } from "@firebase/util";
import { useState, useEffect } from "react";
import { useCategorias } from "../../CategoriaComponents/CategoriasContext/CategoriaProvider";
import { useProductos } from "../ProductosContext/ProductoProvider";

export function FormUpdateProductoAdmin({ onSubmit, producto }) {
  const { updateProducto } = useProductos();
  const { categorias, loadCategorias } = useCategorias();
  useEffect(() => {
    loadCategorias();
  }, []);
  const [formValues, setFormValues] = useState({
    nombre: producto.nombre,
    precio: producto.precio,
    stock: producto.stock,
    descripcion: producto.descripcion,
    marca: producto.marca,
    modelo: producto.modelo,
    color: producto.color,
    estado: producto.estado,
    id_categoria: producto.id_categoria,
  });
  console.log(formValues);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateProducto(producto.id, formValues);
      onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  const handleIdParentChange = (event) => {
    const { value } = event.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      id_categoria: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nombre">Nombre:</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        value={formValues.nombre}
        onChange={handleInputChange}
      />

      <label htmlFor="precio">Precio:</label>
      <input
        type="number"
        id="precio"
        name="precio"
        value={formValues.precio}
        onChange={handleInputChange}
      />

      <label htmlFor="stock">Stock:</label>
      <input
        type="number"
        id="stock"
        name="stock"
        value={formValues.stock}
        onChange={handleInputChange}
      />

      <label htmlFor="descripcion">Descripción:</label>
      <textarea
        id="descripcion"
        name="descripcion"
        value={formValues.descripcion}
        onChange={handleInputChange}
      ></textarea>

      <label htmlFor="marca">Marca:</label>
      <input
        type="text"
        id="marca"
        name="marca"
        value={formValues.marca}
        onChange={handleInputChange}
      />

      <label htmlFor="modelo">Modelo:</label>
      <input
        type="text"
        id="modelo"
        name="modelo"
        value={formValues.modelo}
        onChange={handleInputChange}
      />

      <label htmlFor="color">Color:</label>
      <input
        type="text"
        id="color"
        name="color"
        value={formValues.color}
        onChange={handleInputChange}
      />

      <label htmlFor="estado">Estado:</label>
      <select
        id="estado"
        name="estado"
        value={formValues.estado}
        onChange={handleInputChange}
      >
        <option value="">Seleccione una opción</option>
        <option value="true" selected={true === formValues.estado}>
          Nuevo
        </option>
        <option value="false" selected={false === formValues.estado}>
          Usado
        </option>
      </select>

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

      <button type="submit">Actualizar producto</button>
    </form>
  );
}
