import { useCategorias } from "../../CategoriaComponents/CategoriasContext/CategoriaProvider";
import { useState, useEffect } from "react";
import { useProductos } from "../ProductosContext/ProductoProvider";
import { useNavigate } from "react-router-dom";

export function FormProducto() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { createProducto } = useProductos();
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    stock: "",
    descripcion: "",
    marca: "",
    modelo: "",
    color: "",
    estado: "",
    id_categoria: "",
    id_usuario: usuario.id,
  });

  const { categorias, loadCategorias } = useCategorias();
  useEffect(() => {
    loadCategorias();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(producto);

    if (
      producto.nombre === "" ||
      producto.precio === "" ||
      producto.stock === "" ||
      producto.id_categoria === ""||
      producto.estado === ""
    ) {
      console.log("Por favor complete los campos obligatorios");
      return;
    }

   
      const response = await createProducto(producto);
      if (response) {
        const idProducto=response.producto.id
        
        navigate(`/dashClient/productos/registro-producto/${idProducto}`);

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
      <label>
        Nombre del producto:
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Precio del producto:
        <input
          type="number"
          name="precio"
          value={producto.precio}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Stock del producto:
        <input
          type="number"
          name="stock"
          value={producto.stock}
          onChange={handleChange}
          required
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
        <select name="estado" value={producto.estado} onChange={handleChange}>
          <option value="">Seleccionar el estado del producto</option>
          <option value="true">Nuevo</option>
          <option value="false">Usado</option>
        </select>
      </label>

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
      <button type="submit">Agregar</button>
    </form>
  );
}
