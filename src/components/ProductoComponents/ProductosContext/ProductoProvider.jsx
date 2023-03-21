/* proveedor de contexto que proporciona acceso a las funciones para cargar, crear, actualizar y eliminar productos, así como para obtener y cargar imágenes de productos. */

import { useContext, useState, useEffect } from "react";

import {
  getProductosRequest,
  deleteProductoRequest,
  updateProductoRequest,
  createProductoRequest,
} from "../../../API/productos.api";

import {
  createProductImageRequest,
  getProductImageRequest,
  getProductImagePortadaRequest,
  getProductImagesRequest,
  getAllImagesProductRequest,
} from "../../../API/imagenProductos.api";

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
  const [favoritos, setFavoritos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  // Agregar un producto al carrito
  function agregarItemCarrito(producto) {
    setCarrito((prevCarrito) => {
      // Si el producto ya está en el carrito, incrementar su cantidad
      if (prevCarrito.some((p) => p.id === producto.id)) {
        return prevCarrito.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      // Si el producto no está en el carrito, agregarlo con cantidad 1
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  }

  // Eliminar un producto del carrito
  function eliminarItemCarrito(producto) {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((p) => p.id !== producto.id)
    );
  }

  // Vaciar todo el carrito
  function vaciarCarrito() {
    setCarrito([]);
  }

  // Incrementar la cantidad de un producto en el carrito
  function incrementarCantidadItemCarrito(producto) {
    setCarrito((prevCarrito) =>
      prevCarrito.map((p) =>
        p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
      )
    );
  }

  // Decrementar la cantidad de un producto en el carrito
  function decrementarCantidadItemCarrito(producto) {
    setCarrito((prevCarrito) =>
      prevCarrito.map((p) =>
        p.id === producto.id ? { ...p, cantidad: p.cantidad - 1 } : p
      )
    );
  }
  function agregarFavorito(producto) {
    setFavoritos((prevFavoritos) => [...prevFavoritos, producto]);
  }

  function eliminarFavorito(producto) {
    setFavoritos((prevFavoritos) =>
      prevFavoritos.filter((p) => p.id !== producto.id)
    );
  }

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
      console.log(response.data);
      if (response.status == 201) {
        loadProductos();
        return response.data;
      } else {
        return null;
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
      console.log(response.data);
      if (response.status == 201) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getImgProducto = async (id_producto) => {
    const response = await getProductImageRequest(id_producto);
    if (response.status == 200) {
      console.log(response.data.url);
      return response.data.url;
    } else {
      return null;
    }
  };
  const getImgPortadaProducto = async (id_producto) => {
    const response = await getProductImagePortadaRequest(id_producto);
    if (response.status == 200) {
      return response.data.url;
    } else {
      return null;
    }
  };

  const getProductImages = async (id_producto) => {
    const response = await getProductImagesRequest(id_producto);
    if (response.status == 200) {
      console.log(response.data);
      return response.data;
    } else {
      return null;
    }
  };

  const getAllImagesProduct = async (id_producto) => {
    const response = await getAllImagesProductRequest(id_producto);
    if (response.status == 200) {
      console.log(response.data);
      return response.data;
    } else {
      return null;
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
        createProductImage,
        getImgProducto,
        getImgPortadaProducto,
        getProductImages,
        getAllImagesProduct,
        favoritos,
        agregarFavorito,
        eliminarFavorito,
        carrito,
        agregarItemCarrito,
        eliminarItemCarrito,
        vaciarCarrito,
        incrementarCantidadItemCarrito,
        decrementarCantidadItemCarrito,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
};
