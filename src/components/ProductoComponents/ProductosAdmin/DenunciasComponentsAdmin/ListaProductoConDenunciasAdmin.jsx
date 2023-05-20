import React, { useEffect, useState } from "react";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import { ItemProductoConDenunciaAdmin } from "./ItemProductoConDenunciaAdmin";
import "./ItemProducto.css";
import { denunciasReporteExcel } from "../../../GeneracionDeReportes/denunciasReporteExcel";

export function ListaProductoConDenunciasAdmin() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const {
    obtenerTodasLasDenuncias,
    productosDenuncias,
    eliminarDenunciaProducto,
  } = useProductos();

  const onDeleteDenuncia = async (denunciaId) => {
    // Lógica que se ejecuta en el componente padre
    try {
      await eliminarDenunciaProducto(denunciaId);
      console.log("Ejecutando la función en el componente padre");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await obtenerTodasLasDenuncias();
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  //Obtiene todos los productos que tienen denuncias y almacena las denuncias
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

  //Es un filtro para almacenar únicamente las denuncias que no han sido revisadas
  const denunciasSinRevisar = Object.values(denunciasPorProducto).filter(
    (producto) =>
      producto.denuncias.some((denuncia) => denuncia.revisar === false)
  );

  //Es un filtro para almacenar únicamente las denuncias que ya han sido revisadas
  const denunciasRevisadas = Object.values(denunciasPorProducto).filter(
    (producto) =>
      producto.denuncias.some((denuncia) => denuncia.revisar === true)
  );

  //Estado para mostrar el contenido del botón seleccionado
  const [mostrarContenido, setMostrarContenido] = useState("lista1"); // Por defecto se mostrarán las denuncias pendientes por revisar

  //Constantes para los 3 botones de opciones:
  const mostrarDenunciasNoRevisadas = () => {
    setMostrarContenido("lista1");
  };

  const mostrarDenunciasRevisadas = () => {
    setMostrarContenido("lista2");
  };

  const mostrarTodasLasDenuncias = () => {
    setMostrarContenido("lista3");
  };

  const generarReporte = () => {
    console.log(denunciasPorProducto);

    const formattedData = Object.values(denunciasPorProducto)
      .map((productoDenuncia) => {
        const { producto, denuncias } = productoDenuncia;
        return denuncias.map((denuncia) => {
          const {
            id,
            motivo,
            descripcion,
            revisar,
            createdAt,
            updatedAt,
            usuario,
            usuarioProducto,
          } = denuncia;

          const nombreDenunciante = `${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`;
          const nombrePropietario = `${usuarioProducto.nombre} ${usuarioProducto.apellidoPaterno} ${usuarioProducto.apellidoMaterno}`;

          return {
            "ID  de denuncia": id,
            "Motivo": motivo,
            "Descripción": descripcion,
            "ID denunciante": usuario.id,
            "Nombre denunciante": nombreDenunciante,
            "ID Producto": producto.id,
            "Nombre Producto": producto.nombre,
            "ID propietario": producto.id_usuario,
            "Nombre propietario": nombrePropietario,
            "Revisada": revisar ? "SI" : "NO",
            "Fecha creación": createdAt,
            "Fecha actualización": updatedAt,
          };
        });
      })
      .flat();

    // Ordenar los datos por el ID de denuncias de menor a mayor
    formattedData.sort((a, b) => a["ID  de denuncia"] - b["ID  de denuncia"]);

    // Calcular el motivo de denuncia más recurrente y su cantidad
    const motivoDenunciaRecurrente =
      obtenerMotivoDenunciaRecurrente(formattedData);
    const cantidadDenunciasMotivoRecurrente = contarDenunciasPorMotivo(
      formattedData,
      motivoDenunciaRecurrente
    );

    // Agregar el campo extra al objeto
    formattedData.push({
      "Motivo más recurrente": motivoDenunciaRecurrente,
      "Denuncias con este motivo":
        cantidadDenunciasMotivoRecurrente,
    });

    console.log(formattedData);
    const atributosExcluir = ["updatedAt"];
    denunciasReporteExcel(formattedData, atributosExcluir);
  };

  // Función para obtener el motivo de denuncia más recurrente
  const obtenerMotivoDenunciaRecurrente = (data) => {
    const motivoFrecuenteMap = {};
    let maxCount = 0;
    let motivoFrecuente = "";

    data.forEach((item) => {
      const motivo = item["Motivo"];
      if (motivoFrecuenteMap[motivo]) {
        motivoFrecuenteMap[motivo]++;
      } else {
        motivoFrecuenteMap[motivo] = 1;
      }
      if (motivoFrecuenteMap[motivo] > maxCount) {
        maxCount = motivoFrecuenteMap[motivo];
        motivoFrecuente = motivo;
      }
    });

    return motivoFrecuente;
  };

  // Función para contar las denuncias por motivo
  const contarDenunciasPorMotivo = (data, motivo) => {
    let count = 0;

    data.forEach((item) => {
      if (item["Motivo"] === motivo) {
        count++;
      }
    });

    return count;
  };


  return (
    <div>
      <div className="contenedorBotones">
        <button className="btn1" onClick={mostrarDenunciasNoRevisadas}>
          Mostrar denuncias sin revisar{" "}
        </button>
        <br></br>
        <button className="btn2" onClick={mostrarDenunciasRevisadas}>
          Mostrar denuncias revisadas
        </button>
        <br></br>
        <button className="btn3" onClick={mostrarTodasLasDenuncias}>
          Mostrar todas las denuncias registradas
        </button>
      </div>

      <br></br>

      {mostrarContenido === "lista1" && denunciasSinRevisar.length > 0 && (
        <div>
          <div className="tituloListas">Lista de denuncias sin revisar: </div>
          {denunciasSinRevisar.map((producto) => (
            <ItemProductoConDenunciaAdmin
              key={producto.id}
              producto={producto}
              onDeleteDenuncia={onDeleteDenuncia}
            />
          ))}
        </div>
      )}
      {denunciasSinRevisar.length === 0 && mostrarContenido === "lista1" && (
        <div>
          <br></br>
          <h2>No hay denuncias por revisar en este momento.</h2>
        </div>
      )}

      {mostrarContenido === "lista2" && denunciasRevisadas.length > 0 && (
        <div>
          <div className="tituloListas">Lista de denuncias revisadas: </div>
          {denunciasRevisadas.map((producto) => (
            <ItemProductoConDenunciaAdmin
              key={producto.id}
              producto={producto}
              onDeleteDenuncia={onDeleteDenuncia}
            />
          ))}
        </div>
      )}
      {denunciasRevisadas.length === 0 && mostrarContenido === "lista2" && (
        <div>
          <br></br>
          <h2>Aún no hay denuncias revisadas.</h2>
        </div>
      )}

      {mostrarContenido === "lista3" &&
        Object.keys(denunciasPorProducto).length > 0 && (
          <div>
            <div className="tituloListas">
              Lista de todas las denuncias registradas:{" "}
            </div>
            <div>
              <button onClick={generarReporte} className="btnReporte">
              <box-icon style={{marginRight: "5px"}}  color="white" name='file'></box-icon>Generar reporte (.xlsx)</button>
            </div>
            <br></br>
            {Object.values(denunciasPorProducto).map((producto) => (
              <ItemProductoConDenunciaAdmin
                key={producto.id}
                producto={producto}
                onDeleteDenuncia={onDeleteDenuncia}
              />
            ))}
          </div>
        )}
      {Object.keys(denunciasPorProducto).length === 0 &&
        mostrarContenido === "lista3" && (
          <div>
            <br></br>
            <h2>No hay denuncias registradas por ahora.</h2>
          </div>
        )}
    </div>
  );
}