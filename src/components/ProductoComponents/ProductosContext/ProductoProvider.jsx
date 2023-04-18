/* proveedor de contexto que proporciona acceso a las funciones para cargar, crear, actualizar y eliminar productos, así como para obtener y cargar imágenes de productos. */

import { useContext, useState, useEffect } from "react";

import {
  getProductosRequest,
  deleteProductoRequest,
  updateProductoRequest,
  createProductoRequest,
  getProductosByUsuarioIdRequest,
} from "../../../API/ProductosApiRest/productos.api";

import {
  createProductImageRequest,
  getProductImagePortadaRequest,
  getProductImagesGaleriaRequest,
  getAllImagesProductRequest,
} from "../../../API/ProductosApiRest/imagenProductos.api";

import {
  crearPreguntaProductoRequest,
  getPreguntasByIdProductoRequest,
} from "../../../API/ProductosApiRest/preguntasProducto.api";

import {
  agregarProductoAlCarritoRequest,
  actualizarCantidadProductoEnCarritoRequest,
  vaciarCarritoRequest,
  obtenerCarritoDeComprasRequest,
  eliminarProductoDelCarritoRequest,
} from "../../../API/ProductosApiRest/carritoProductos.api";

import {
  obtenerFavoritosRequest,
  eliminarProductoFavoritoRequest,
  agregarProductoAFavoritosRequest,
} from "../../../API/ProductosApiRest/favoritosProductos.api";

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
  const [productosAll, setProductosAll] = useState([]);
  const [productosUsuario, setProductosUsuario] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [carrito, setCarrito] = useState({
    idCarrito: null, // Valor inicial correspondiente
    id_usuario: null, // Valor inicial correspondiente
    detalles: [], // Valor inicial correspondiente
    totalCantidad: 0, // Valor inicial correspondiente
  });

  /////////////////////////////////////////////////////////////////

  // Función para obtener el carrito de compras
  async function obtenerCarritoDeCompras(id_usuario) {
    try {
      const response = await obtenerCarritoDeComprasRequest(id_usuario); // Cambiar por el nombre de la función que realiza la solicitud para obtener el carrito
      if (response.status === 200) {
        const carritoData = response.data; // Obtener los datos del carrito de la respuesta
        const idCarrito = carritoData.carrito.id; // Obtener el id del carrito
        const id_usuario = carritoData.carrito.id_usuario; // Obtener el id del usuario del carrito
        const detalles = carritoData.detalleCarrito; // Obtener los detalles del carrito

        let totalCantidad = 0; // Inicializar el total de cantidad en 0

        // Calcular el total de la cantidad de productos en el carrito
        for (let i = 0; i < detalles.length; i++) {
          totalCantidad += detalles[i].cantidad * detalles[i].producto.precio;
        }

        // Actualizar el estado del carrito con los datos obtenidos
        setCarrito({
          idCarrito,
          id_usuario,
          detalles,
          totalCantidad,
        });
      } else {
        throw new Error("No se pudo obtener el carrito"); // Manejar el error si no se pudo obtener el carrito
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Función para agregar un producto al carrito
  async function agregarProductoAlCarrito(data) {
    try {
      const response = await agregarProductoAlCarritoRequest(data);

      if (response.status === 200) {
        obtenerCarritoDeCompras(data.id_usuario);
        console.log("Producto agregado al carrito exitosamente", carrito);
      } else {
        throw new Error("No se pudo agregar el producto al carrito");
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Función para vaciar el carrito
  async function vaciarCarrito(id_usuario) {
    try {
      const response = await vaciarCarritoRequest(id_usuario); // Pasar el id del carrito a la función de la API

      if (response.status === 200) {
        // Actualizar el estado del carrito con un arreglo vacío para vaciar el carrito
        setCarrito({
          idCarrito: null,
          id_usuario: null,
          detalles: [],
          totalCantidad: 0,
        });
        console.log("Carrito vaciado exitosamente");
      } else {
        throw new Error("No se pudo vaciar el carrito");
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Función para actualizar la cantidad de un producto en el carrito
  async function actualizarCantidadProductoEnCarrito(id_producto, data) {
    try {
      const response = await actualizarCantidadProductoEnCarritoRequest(
        id_producto,
        data
      );

      if (response.status === 200) {
        const detalleActualizado = response.data.detalle; // Obtener el detalle actualizado de la respuesta de la API

        // Actualizar el estado del carrito con los detalles actualizados
        const nuevosDetalles = carrito.detalles.map((detalle) => {
          if (detalle.id_producto === detalleActualizado.id_producto) {
            // Comparar con el id del producto en el detalle actualizado
            return detalleActualizado; // Retornar el detalle actualizado
          } else {
            return detalle;
          }
        });

        setCarrito({ ...carrito, detalles: nuevosDetalles });
        console.log("Cantidad de producto actualizada exitosamente");
      } else {
        throw new Error(
          "No se pudo actualizar la cantidad del producto en el carrito"
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Función para eliminar un producto del carrito
  async function eliminarProductoDelCarrito(id_producto, data) {
    console.log(data);
    try {
      const response = await eliminarProductoDelCarritoRequest(
        id_producto,
        data
      );

      if (response.status === 200) {
        /*
        const nuevosDetalles = carrito.detalles.filter(
          (detalle) => detalle.id_producto !== id_producto
        ); // Filtrar los detalles del carrito para excluir el producto eliminado por su id_producto
        
        const nuevosDetalles = response.data.detalleCarrito;
        setCarrito({ ...carrito, detalles: nuevosDetalles });
        */
        obtenerCarritoDeCompras(data.id_usuario);
        console.log("Producto eliminado del carrito exitosamente");
      } else {
        throw new Error("No se pudo eliminar el producto del carrito");
      }
    } catch (error) {
      console.error(error);
    }
  }

  ///////////////////////////////////////////////////
  /*

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
  // Vaciar todo el carrito
  function vaciarFavoritos() {
    setFavoritos([]);
  }

  function incrementarCantidadItemCarrito(producto) {
    setCarrito((prevCarrito) =>
      prevCarrito.map((p) =>
        p.id === producto.id && p.cantidad < p.stock
          ? { ...p, cantidad: p.cantidad + 1 }
          : p
      )
    );
  }

  // Decrementar la cantidad de un producto en el carrito
  function decrementarCantidadItemCarrito(producto) {
    setCarrito((prevCarrito) =>
      prevCarrito.map((p) =>
        p.id === producto.id && p.cantidad > 1
          ? { ...p, cantidad: p.cantidad - 1 }
          : p
      )
    );
  }
  */
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
        setProductosAll(response.data);
      } else {
        throw new Error("No se pudo obtener la lista de productos");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const loadProductosUsuario = async (id_usuario) => {
    try {
      const response = await getProductosByUsuarioIdRequest(id_usuario);

      if (response.status === 200) {
        setProductosUsuario(response.data);
      } else if (response.status === 404) {
        console.log("La lista de productos no existe");
        setProductosUsuario([]);
      } else {
        throw new Error("No se pudo obtener la lista de productos");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProducto = async (id) => {
    try {
      const response = await deleteProductoRequest(id);
      if (response.status == 200) {
        setProductosAll(productosAll.filter((producto) => producto.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createProducto = async (producto) => {
    try {
      const response = await createProductoRequest(producto);

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

      if (response.status == 201) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
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

  const getProductImagesGaleria = async (id_producto) => {
    const response = await getProductImagesGaleriaRequest(id_producto);
    if (response.status == 200) {
      return response.data;
    } else {
      return null;
    }
  };

  const getAllImagesProduct = async (id_producto) => {
    const response = await getAllImagesProductRequest(id_producto);
    if (response.status == 200) {
      return response.data;
    } else {
      return null;
    }
  };

  //Preguntas

  const crearPreguntaProducto = async (data) => {
    try {
      const response = await crearPreguntaProductoRequest(data);

      if (response.status == 201) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPreguntasByIdProducto = async (data) => {
    try {
      const response = await getPreguntasByIdProductoRequest(data);
      console.log(response);
      if (response.status == 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ProductoContext.Provider
      value={{
        productosAll,
        productosUsuario,
        loadProductos,
        loadProductosUsuario,
        deleteProducto,
        createProducto,
        updateProducto,
        createProductImage,
        getImgPortadaProducto,
        getProductImagesGaleria,
        getAllImagesProduct,
        favoritos,
        agregarFavorito,
        eliminarFavorito,
        /*
        
        agregarItemCarrito,
        eliminarItemCarrito,
        vaciarCarrito,
        incrementarCantidadItemCarrito,
        decrementarCantidadItemCarrito,
        vaciarFavoritos,
*/
        agregarProductoAlCarrito,
        obtenerCarritoDeCompras,
        carrito,
        actualizarCantidadProductoEnCarrito,
        eliminarProductoDelCarrito,
        vaciarCarrito,

        crearPreguntaProducto,
        getPreguntasByIdProducto,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
};
