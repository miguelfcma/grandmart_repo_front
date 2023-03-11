import { useContext, useState, useEffect } from "react";

import {
  getProductosRequest,
  createProductoRequest,
  deleteProductoRequest,
  updateProductoRequest,
} from "../../../API/productos.api";

import { ProductoContext } from "./ProductoContext";

export const useProductos = () => {
  const context = useContext(ProductoContext);
  if (context === undefined) {
    throw new Error(
      "useProductos must be used within a ProductoContextProvider"
    );
  }
  return context;
};

export const ProductoContextProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  async function loadProductos() {
    try {
      const response = await getProductosRequest();
      if (response === undefined) {
        throw new Error("No se pudo obtener la lista de productos");
      }
      setProductos(response);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteProducto = async (id) => {
    try {
      const response = await deleteProductoRequest(id);
      setProductos(productos.filter((producto) => producto.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const createProducto = async (producto) => {
    try {
      const response = await createProductoRequest(producto);

      if (response.status == 201) {
        await refreshProductos(); // Llama a la función refreshProductos después de actualizar el producto.
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateProducto = async (id, producto) => {
    try {
      const response = await updateProductoRequest(id, producto);
      console.log(response);
      if (response.status == 200) {
        await refreshProductos(); // Llama a la función refreshProductos después de actualizar el producto.
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const refreshProductos = async () => {
    // Agrega la función refreshProductos.
    try {
      const response = await getProductosRequest();
      if (response === undefined) {
        throw new Error("No se pudo obtener la lista de productos");
      }
      setProductos(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductoContext.Provider
      value={{
        productos,
        loadProductos,
        deleteProducto,
        createProducto,
        updateProducto,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
};
