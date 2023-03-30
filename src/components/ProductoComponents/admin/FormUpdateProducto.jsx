import { useState } from "react";
import { useProductos } from "../ProductosContext/ProductoProvider";

export function FormUpdateProducto({ producto }) {
  const { updateProducto } = useProductos();
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
      <select id="estado" name="estado" value={formValues.estado} onChange={handleInputChange}>
        <option value="">Seleccione una opción</option>
        <option value="nuevo">Nuevo</option>
        <option value="usado">Usado</option>
      </select>

      <label htmlFor="id_categoria">Categoría:</label>
      <select
        id="id_categoria"
        name="id_categoria"
        value={formValues.id_categoria}
        onChange={handleInputChange}
      >
        <option value="">Seleccione una categoría</option>
        <option value="1">Electrónica</option>
        <option value="2">Ropa</option>
        <option value="3">Hogar</option>
      </select>

      <button type="submit">Actualizar producto</button>
    </form>
  );
}
