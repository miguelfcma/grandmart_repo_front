import React, { useEffect, useState } from "react";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import { useServicios } from "../../../ServicioComponents/ServiciosContext/ServicioProvider";
import { ItemProductoConDenunciaAdmin } from "./ItemProductoConDenunciaAdmin";
import { ItemServicioConDenunciaAdmin } from "./ItemServicioConDenunciaAdmin";
import "./ItemProducto.css";
import { denunciasReporteExcel } from "../../../GeneracionDeReportes/DenunciasReporteExcel";
import { denunciasServiciosReporteExcel } from "../../../GeneracionDeReportes/DenunciasServiciosReporteExcel";

export function ListaProductoConDenunciasAdmin() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const {
    obtenerTodasLasDenuncias,
    productosDenuncias,
    eliminarDenunciaProducto,
  } = useProductos();
  const {
    obtenerTodasLasDenunciasServicios,
    serviciosDenuncias,
    eliminarDenunciaServicio,
  } = useServicios();

  const onDeleteDenuncia = async (denunciaId) => {
    // Lógica que se ejecuta en el componente padre
    try {
      await eliminarDenunciaProducto(denunciaId);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      await obtenerTodasLasDenuncias();
      await obtenerTodasLasDenunciasServicios();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
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
  const denunciasSinRevisar =  Object.values(denunciasPorProducto)
  .filter((producto) =>
    producto.denuncias.some((denuncia) => denuncia.revisar === true)
  )
  .map((producto) => {
    return {
      producto: producto.producto,
      denuncias: producto.denuncias.filter(
        (denuncia) => denuncia.revisar === false
      ),
    };
  });

  //Es un filtro para almacenar únicamente las denuncias que ya han sido revisadas

  const denunciasRevisadas = Object.values(denunciasPorProducto)
    .filter((producto) =>
      producto.denuncias.some((denuncia) => denuncia.revisar === true)
    )
    .map((producto) => {
      return {
        producto: producto.producto,
        denuncias: producto.denuncias.filter(
          (denuncia) => denuncia.revisar === true
        ),
      };
    });

  //Estado para mostrar el contenido del botón seleccionado
  const [mostrarContenido, setMostrarContenido] = useState(false);

  const [mostrarTitulo, setMostrarTitulo] = useState(false); // Agrega el estado para controlar la visibilidad del título

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
            Motivo: motivo,
            Descripción: descripcion,
            "ID denunciante": usuario.id,
            "Nombre denunciante": nombreDenunciante,
            "ID Producto": producto.id,
            "Nombre Producto": producto.nombre,
            "ID propietario": producto.id_usuario,
            "Nombre propietario": nombrePropietario,
            Revisada: revisar ? "SI" : "NO",
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
      "Denuncias con este motivo": cantidadDenunciasMotivoRecurrente,
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

  //Obtiene todos los servicios que tienen denuncias y almacena las denuncias
  const denunciasPorServicio = serviciosDenuncias.reduce(
    (resultado, denuncia) => {
      const idServicio = denuncia.id_servicio;
      if (!resultado[idServicio]) {
        resultado[idServicio] = {
          servicio: denuncia.servicio,
          denuncias: [],
        };
      }
      resultado[idServicio].denuncias.push(denuncia);
      return resultado;
    },
    {}
  );

  //Es un filtro para almacenar únicamente las denuncias que no han sido revisadas
  const denunciasSinRevisarServicios = Object.values(denunciasPorServicio)
  .map((servicio) => {
    return {
      servicio: servicio.servicio,
      denuncias: servicio.denuncias.filter(
        (denuncia) => denuncia.revisar === false
      ),
    };
  })
  .filter((servicio) => servicio.denuncias.length > 0);


  //Es un filtro para almacenar únicamente las denuncias que ya han sido revisadas

  const denunciasRevisadasServicios = Object.values(denunciasPorServicio)
    .map((servicio) => {
      return {
        servicio: servicio.servicio,
        denuncias: servicio.denuncias.filter(
          (denuncia) => denuncia.revisar === true
        ),
      };
    })
    .filter((servicio) => servicio.denuncias.length > 0);


  //Reporte denuncias para servicios
  const generarReporteServicios = () => {
    console.log(denunciasPorServicio);

    const formattedData = Object.values(denunciasPorServicio)
      .map((servicioDenuncia) => {
        const { servicio, denuncias } = servicioDenuncia;
        return denuncias.map((denuncia) => {
          const {
            id,
            motivo,
            descripcion,
            revisar,
            createdAt,
            updatedAt,
            usuario,
            usuarioServicio,
          } = denuncia;

          const nombreDenunciante = `${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`;
          const nombrePropietario = `${usuarioServicio.nombre} ${usuarioServicio.apellidoPaterno} ${usuarioServicio.apellidoMaterno}`;

          return {
            "ID  de denuncia": id,
            Motivo: motivo,
            Descripción: descripcion,
            "ID denunciante": usuario.id,
            "Nombre denunciante": nombreDenunciante,
            "ID Servicio": servicio.id,
            "Título Servicio": servicio.titulo,
            "ID propietario": servicio.id_usuario,
            "Nombre propietario": nombrePropietario,
            Revisada: revisar ? "SI" : "NO",
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
      obtenerMotivoDenunciaRecurrenteServicio(formattedData);
    const cantidadDenunciasMotivoRecurrente = contarDenunciasPorMotivoServicio(
      formattedData,
      motivoDenunciaRecurrente
    );

    // Agregar el campo extra al objeto
    formattedData.push({
      "Motivo más recurrente": motivoDenunciaRecurrente,
      "Denuncias con este motivo": cantidadDenunciasMotivoRecurrente,
    });

    console.log(formattedData);
    const atributosExcluir = ["updatedAt"];
    denunciasServiciosReporteExcel(formattedData, atributosExcluir);
  };

  // Función para obtener el motivo de denuncia más recurrente
  const obtenerMotivoDenunciaRecurrenteServicio = (data) => {
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
  const contarDenunciasPorMotivoServicio = (data, motivo) => {
    let count = 0;

    data.forEach((item) => {
      if (item["Motivo"] === motivo) {
        count++;
      }
    });

    return count;
  };

  const onDeleteDenunciaServicio = async (preguntaId) => {
    try {
      await eliminarDenunciaServicio(preguntaId);
      console.log("Ejecutando la función en el componente padre");
    } catch (error) {
      console.log(error);
    }
  };

  const mostrarDenunciasNoRevisadas = () => {
    setMostrarContenido("lista1");
    setMostrarTitulo(1);
  };

  const mostrarDenunciasRevisadas = () => {
    setMostrarContenido("lista2");
    setMostrarTitulo(1);
  };

  const mostrarDenunciasNoRevisadasServicios = () => {
    setMostrarContenido("lista3");
    setMostrarTitulo(1);
  };

  const mostrarDenunciasRevisadasServicios = () => {
    setMostrarContenido("lista4");
    setMostrarTitulo(1);
  };

  const mostrarTodasLasDenuncias = () => {
    setMostrarContenido("lista5");
    setMostrarTitulo(1);
  };

  const mostrarTodasLasDenunciasServicios = () => {
    setMostrarContenido("lista6");
    setMostrarTitulo(1);
  };

  return (
    <div>
      <div className="contenedorBotones">
        <button className="btn1" onClick={mostrarDenunciasNoRevisadas}>
          Mostrar denuncias de los productos{" "}
        </button>
        <br></br>
        <button className="btn2" onClick={mostrarDenunciasNoRevisadasServicios}>
          Mostrar denuncias de los servicios
        </button>
        <br></br>
        <button className="btn3" onClick={mostrarTodasLasDenuncias}>
          Mostrar todas las denuncias del sistema revisadas y no revisadas
        </button>
      </div>

      <br></br>

      {mostrarContenido === "lista1" && (
        <div>
          <br></br>
          <div className="linea"> </div>
          <button className="btnPSR" onClick={mostrarDenunciasNoRevisadas}>
            Denuncias sin revisar
          </button>

          <button className="btnPR" onClick={mostrarDenunciasRevisadas}>
            Denuncias revisadas
          </button>

          {denunciasSinRevisar.length > 0 && mostrarTitulo === 1 && (
            <div className="tituloListas">
              Lista de denuncias sin revisar de productos:
            </div>
          )}
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
          <h2>No hay denuncias de productos por revisar en este momento.</h2>
        </div>
      )}

      {mostrarContenido === "lista2" && (
        <div>
          <br></br>
          <div className="linea"> </div>
          <button className="btnPSR" onClick={mostrarDenunciasNoRevisadas}>
            Denuncias sin revisar
          </button>

          <button className="btnPR" onClick={mostrarDenunciasRevisadas}>
            Denuncias revisadas
          </button>

          {denunciasRevisadas.length > 0 && mostrarTitulo === 1 && (
            <div className="tituloListas">
              Lista de denuncias revisadas de productos:
            </div>
          )}
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
          <h2>No hay denuncias de productos revisadas en este momento.</h2>
        </div>
      )}

      {mostrarContenido === "lista3" && (
        <div>
          <br></br>
          <div className="linea"> </div>
          <button
            className="btnPSR"
            onClick={mostrarDenunciasNoRevisadasServicios}
          >
            Denuncias sin revisar
          </button>

          <button
            className="btnPR"
            onClick={mostrarDenunciasRevisadasServicios}
          >
            Denuncias revisadas
          </button>

          {denunciasSinRevisarServicios.length > 0 && mostrarTitulo === 1 && (
            <div className="tituloListas">
              Lista de denuncias sin revisar de servicios:
            </div>
          )}
          {denunciasSinRevisarServicios.map((servicio) => (
            <ItemServicioConDenunciaAdmin
              key={servicio.id}
              servicio={servicio}
              onDeleteDenunciaServicio={onDeleteDenunciaServicio}
            />
          ))}
        </div>
      )}
      {denunciasSinRevisarServicios.length === 0 &&
        mostrarContenido === "lista3" && (
          <div>
            <br></br>
            <h2>No hay denuncias de servicios por revisar en este momento.</h2>
          </div>
        )}

      {mostrarContenido === "lista4" && (
        <div>
          <br></br>
          <div className="linea"> </div>
          <button
            className="btnPSR"
            onClick={mostrarDenunciasNoRevisadasServicios}
          >
            Denuncias sin revisar
          </button>

          <button
            className="btnPR"
            onClick={mostrarDenunciasRevisadasServicios}
          >
            Denuncias revisadas
          </button>

          {denunciasRevisadasServicios.length > 0 && mostrarTitulo === 1 && (
            <div className="tituloListas">
              Lista de denuncias revisadas de servicios:
            </div>
          )}
          {denunciasRevisadasServicios.map((servicio) => (
            <ItemServicioConDenunciaAdmin
              key={servicio.id}
              servicio={servicio}
              onDeleteDenunciaServicio={onDeleteDenunciaServicio}
            />
          ))}
        </div>
      )}
      {denunciasRevisadasServicios.length === 0 &&
        mostrarContenido === "lista4" && (
          <div>
            <br></br>
            <h2>No hay denuncias de servicios revisadas en este momento.</h2>
          </div>
        )}

      {mostrarContenido === "lista5" && (
        <div>
          <br></br>
          <div className="linea"> </div>
          <button className="btnPSRS" onClick={mostrarTodasLasDenuncias}>
            Mostrar las denuncias de productos
          </button>

          <button
            className="btnPRS"
            onClick={mostrarTodasLasDenunciasServicios}
          >
            Mostrar las denuncias de servicios
          </button>

          {Object.keys(denunciasPorProducto).length > 0 &&
            mostrarTitulo === 1 && (
              <div className="tituloListas">
                Lista de todas las denuncias registradas de productos:
              </div>
            )}

          <button onClick={generarReporte} className="btnReporte">
            <box-icon
              style={{ marginRight: "5px" }}
              color="white"
              name="file"
            ></box-icon>
            Generar reporte (.xlsx)
          </button>
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
        mostrarContenido === "lista5" && (
          <div>
            <br></br>
            <h2>No hay denuncias de productos registradas por ahora.</h2>
          </div>
        )}

      {mostrarContenido === "lista6" && (
        <div>
          <br></br>
          <div className="linea"> </div>
          <button className="btnPSRS" onClick={mostrarTodasLasDenuncias}>
            Mostrar las denuncias de productos
          </button>

          <button
            className="btnPRS"
            onClick={mostrarTodasLasDenunciasServicios}
          >
            Mostrar las denuncias de servicios
          </button>

          {Object.keys(denunciasPorServicio).length > 0 &&
            mostrarTitulo === 1 && (
              <div className="tituloListas">
                Lista de todas las denuncias registradas de servicios:
              </div>
            )}

          <button onClick={generarReporteServicios} className="btnReporte">
            <box-icon
              style={{ marginRight: "5px" }}
              color="white"
              name="file"
            ></box-icon>
            Generar reporte (.xlsx)
          </button>
          <br></br>
          {Object.values(denunciasPorServicio).map((servicio) => (
            <ItemServicioConDenunciaAdmin
              key={servicio.id}
              servicio={servicio}
              onDeleteDenunciaServicio={onDeleteDenunciaServicio}
            />
          ))}
        </div>
      )}
      {Object.keys(denunciasPorServicio).length === 0 &&
        mostrarContenido === "lista6" && (
          <div>
            <br></br>
            <h2>No hay denuncias de servicios registradas por ahora.</h2>
          </div>
        )}
    </div>
  );
}
