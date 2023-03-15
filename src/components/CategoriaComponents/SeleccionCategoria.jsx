import { useState } from "react";
import { useCategorias } from "./CategoriasContext/CategoriaProvider";

export function SeleccionCategoria() {
  const { categorias } = useCategorias();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [producto, setProducto] = useState({ nombre: "", descripcion: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí se enviaría el objeto del formulario que incluye la categoría seleccionada y los datos del producto
    console.log({ categoriaSeleccionada, producto });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProducto((prevProducto) => ({ ...prevProducto, [name]: value }));
  };

  const seleccionarCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SeleccionCategoria
        categorias={categorias}
        categoriaSeleccionada={categoriaSeleccionada}
        seleccionarCategoria={seleccionarCategoria}
      />
      <div>
        <label htmlFor="nombre">Nombre del producto:</label>
        <input type="text" id="nombre" name="nombre" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="descripcion">Descripción del producto:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          onChange={handleChange}
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}
