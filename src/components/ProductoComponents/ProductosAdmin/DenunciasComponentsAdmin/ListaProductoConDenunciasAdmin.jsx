import React, { useEffect } from "react";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import { ItemProductoConDenunciaAdmin } from "./ItemProductoConDenunciaAdmin";

export function ListaProductoConDenunciasAdmin() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { obtenerTodasLasDenuncias, productosDenuncias } = useProductos();

  useEffect(() => {
    // Definir una función asincrónica dentro del useEffect para utilizar await
    const fetchData = async () => {
      try {
        // Llamar a la función obtenerTodasLasDenuncias para obtener los productos con denuncias
        await obtenerTodasLasDenuncias(usuario.id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Mostrar los productos con denuncias en tu componente */}
      {productosDenuncias.map(producto => (
        <ItemProductoConDenunciaAdmin key={producto.id} producto={producto} />
      ))}
    </div>
  );
}
