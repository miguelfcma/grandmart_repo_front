import { useState,useEffect } from "react";
import { useCategorias } from "../../CategoriaComponents/CategoriasContext/CategoriaProvider";
import { useProductos } from "../ProductosContext/ProductoProvider";

export function FormUpdateProducto({ producto }) {
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProducto(producto.id, formValues);
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
        <option value="nuevo">Nuevo</option>
        <option value="usado">Usado</option>
      </select>

      <label>
        Categoría del producto:
        <select
          name="id_categoria"
          value={producto.id_categoria}
          onChange={handleIdParentChange}
          required
        >
          <option value="">Seleccionar categoría padre</option>
          {categorias
            .filter((categoria) => categoria.id_parent === null)
            .map((categoriaPadre) => (
              <optgroup
                className="categoria-padre" // Agregamos una clase a las opciones de las categorías padres
                label={categoriaPadre.nombre}
                key={categoriaPadre.id}
              >
                {categorias
                  .filter(
                    (categoria) =>
                      categoria.id_parent === categoriaPadre.id &&
                      categoria.id !== producto.id_categoria // para evitar que se pueda seleccionar como categoría padre a sí mismo
                  )
                  .map((categoriaHija) => (
                    <option key={categoriaHija.id} value={categoriaHija.id}>
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
