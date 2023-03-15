
import { useCategorias } from "../CategoriaComponents/CategoriasContext/CategoriaProvider";
import { useState,useEffect } from "react";
export function FormProducto(){
    const [producto, setProducto] = useState({
      nombre: "",
      precio: "",
      stock: "",
      descripcion: "",
      marca: "",
      modelo: "",
      color: "",
      estado: "",
      categoriaId: "",
      usuarioId: "",
    });
  
    const { categorias } = useCategorias();
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setProducto((prevProducto) => ({
        ...prevProducto,
        [name]: value,
      }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Lógica para enviar el formulario
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del producto:
          <input
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
          />
        </label>
        <label>
          Precio del producto:
          <input
            type="number"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
          />
        </label>
        <label>
          Stock del producto:
          <input
            type="number"
            name="stock"
            value={producto.stock}
            onChange={handleChange}
          />
        </label>
        <label>
          Descripción del producto:
          <textarea
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
          />
        </label>
        <label>
          Marca del producto:
          <input
            type="text"
            name="marca"
            value={producto.marca}
            onChange={handleChange}
          />
        </label>
        <label>
          Modelo del producto:
          <input
            type="text"
            name="modelo"
            value={producto.modelo}
            onChange={handleChange}
          />
        </label>
        <label>
          Color del producto:
          <input
            type="text"
            name="color"
            value={producto.color}
            onChange={handleChange}
          />
        </label>
        <label>
          Estado del producto:
          <input
            type="text"
            name="estado"
            value={producto.estado}
            onChange={handleChange}
          />
        </label>
        <label>
          Categoría del producto:
          <select
            name="categoriaId"
            value={producto.categoriaId}
            onChange={handleChange}
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </label>
        <label>
          ID del usuario:
          <input
            type="number"
            name="usuarioId"
            value={producto.usuarioId}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Agregar</button>
      </form>
    );
  };