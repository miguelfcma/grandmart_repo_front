/* proveedor de contexto que proporciona acceso a las funciones para cargar, crear, actualizar y eliminar productos, así como para obtener y cargar imágenes de productos. */

import { useContext, useState, useEffect } from "react";

import {
  getProductosRequest,
  deleteProductoRequest,
  updateProductoRequest,
  createProductoRequest,
} from "../../../API/productos.api";

import { createProductImageRequest, getProductImageRequest } from "../../../API/imagenProductos.api";

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

      if (response.status === 200) {
        setProductos(response.data);
      } else {
        throw new Error("No se pudo obtener la lista de productos");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const deleteProducto = async (id) => {
    try {
      const response = await deleteProductoRequest(id);
      if (response.status == 200) {
        setProductos(productos.filter((producto) => producto.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createProducto = async (producto) => {
    try {
      const response = await createProductoRequest(producto);
      console.log(response.data)
      if (response.status == 201) {
        loadProductos(); 
        return response.data
      } else {
        return null
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateProducto = async (id, producto) => {
    try {
      const response = await updateProductoRequest(id, producto);

      if (response.status == 200) {
        loadProductos();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };


  const createProductImage = async (imgProducto) => {
    try {
      const response = await createProductImageRequest(imgProducto);
      console.log(response.data)
      if (response.status == 201) {
        return response.data
      } else {
        return null
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const getImgProducto = async (id_producto)=>{
    const response = await getProductImageRequest(id_producto)
    if(response.status == 200){
      console.log(response.data.url)
      return response.data.url;
    }else{
      return null;
    }
  }
  
  return (
    <ProductoContext.Provider
      value={{
        productos,
        loadProductos,
        deleteProducto,
        createProducto,
        updateProducto,
        createProductImage,
        getImgProducto
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
};
