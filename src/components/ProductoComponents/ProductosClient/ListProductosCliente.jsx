import React, { useEffect, useState } from "react";
import { CardProductoCliente } from "./CardProductoCliente";
import { useProductos } from "../ProductosContext/ProductoProvider";

// Componente para mostrar una lista de productos al cliente
export function ListProductosCliente() {
  // Obtenemos el usuario desde el almacenamiento local
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Utilizamos el contexto de productos para obtener datos y funciones relacionadas con los productos
  const { productosUsuario, loadProductosUsuario } = useProductos();

  // Estado para el filtro de productos
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    // Cargamos los productos del usuario al montar el componente
    async function fetchData() {
      try {
        await loadProductosUsuario(usuario.id);
      } catch (error) {
        console.log("Error al cargar los productos:", error);
      }
    }
    fetchData();
  }, []);

  // Función para filtrar los productos en función del criterio de búsqueda
  function filtrarProductos() {
    if (filtro === "") {
      return productosUsuario;
    } else {
      return productosUsuario.filter((producto) => {
        const filtroLowerCase = filtro.toLowerCase();
        return (
          producto.id.toString().includes(filtroLowerCase) ||
          producto.nombre.toLowerCase().includes(filtroLowerCase) ||
          producto.descripcion.toLowerCase().includes(filtroLowerCase) ||
          producto.marca.toLowerCase().includes(filtroLowerCase) ||
          producto.modelo.toLowerCase().includes(filtroLowerCase) ||
          `${producto.id} ${producto.nombre}`
            .toLowerCase()
            .includes(filtroLowerCase) ||
          `${producto.id} - ${producto.nombre}`
            .toLowerCase()
            .includes(filtroLowerCase) ||
          `${producto.id}-${producto.nombre} `
            .toLowerCase()
            .includes(filtroLowerCase) ||
          `${producto.nombre} ${producto.marca}`
            .toLowerCase()
            .includes(filtroLowerCase) ||
          `${producto.nombre} ${producto.modelo}`
            .toLowerCase()
            .includes(filtroLowerCase) ||
          `${producto.marca} ${producto.modelo}`
            .toLowerCase()
            .includes(filtroLowerCase)
        );
      });
    }
  }

  // Función para renderizar la lista de productos
  function renderMain() {
    const productosFiltrados = filtrarProductos();

    if (productosFiltrados.length === 0) {
      return <h1>No hay productos registrados</h1>;
    } else {
      return productosFiltrados.map((producto) => (
        <CardProductoCliente key={producto.id} producto={producto} />
      ));
    }
  }

  return (
    <>
      <h2 className="titulo">Lista de productos:</h2>
      <input
        type="text"
        placeholder="Buscar por ID, nombre, descripción, marca o modelo"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="bordeFiltro"
      />
      <div className="list-productos">{renderMain()}</div>
    </>
  );
}
