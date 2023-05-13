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

  const denunciasPorProducto = productosDenuncias.reduce(
    (resultado, denuncia) => {
      const idProducto = denuncia.id_producto;
      if (!resultado[idProducto]) {
        resultado[idProducto] = {
          producto: denuncia.producto,
          denuncias: [],
        };
      }
      resultado[idProducto].denuncias.push(denuncia);
      return resultado;
    },
    {}
  );
  const denunciasPorProductoArray = Object.values(denunciasPorProducto);

  console.log(denunciasPorProductoArray);
  return (
    <div>
      {/* Mostrar los productos con denuncias en componente */}
      {denunciasPorProductoArray.map((producto) => (
        <ItemProductoConDenunciaAdmin key={producto.id} producto={producto} />
      ))}
    </div>
  );
}
