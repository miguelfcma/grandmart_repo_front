import React, { useEffect } from "react";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import { ItemProductoConDenunciaAdmin } from "./ItemProductoConDenunciaAdmin";

export function ListaProductoConDenunciasAdmin() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { obtenerTodasLasDenuncias, productosDenuncias, eliminarDenunciaProducto } = useProductos();

  const onDeleteDenuncia = async (denunciaId) => {
    // Lógica que se ejecuta en el componente padre
    try{
      await eliminarDenunciaProducto(denunciaId);
      console.log("Ejecutando la función en el componente padre");
    } catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    // Definir una función asincrónica dentro del useEffect para utilizar await
    const fetchData = async () => {
      try {
        // Llamar a la función obtenerTodasLasDenuncias para obtener los productos con denuncias
        await obtenerTodasLasDenuncias(usuario.id, usuario.id_usuario);
        // El segundo parámetro es para el ID del usuario propietario
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [onDeleteDenuncia]);

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
      {denunciasPorProductoArray.length > 0 ? (
        denunciasPorProductoArray.map((producto) => (
          <ItemProductoConDenunciaAdmin
            key={producto.id}
            producto={producto}
            onDeleteDenuncia={onDeleteDenuncia}
          />
        ))
      ) : (
        <p>
          <br></br>
          <h2>No hay denuncias registradas.</h2>
        </p>
      )}
    </div>
  );
}
