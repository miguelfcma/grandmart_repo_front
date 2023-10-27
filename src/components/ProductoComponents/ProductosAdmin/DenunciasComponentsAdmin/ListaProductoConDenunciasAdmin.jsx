import React, { useEffect, useState } from "react";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import { useServicios } from "../../../ServicioComponents/ServiciosContext/ServicioProvider";
import { ItemProductoConDenunciaAdmin } from "./ItemProductoConDenunciaAdmin";
import { ItemServicioConDenunciaAdmin } from "./ItemServicioConDenunciaAdmin";
import "./ItemProducto.css";
import { denunciasReporteExcel } from "../../../GeneracionDeReportes/DenunciasReporteExcel";
import { denunciasServiciosReporteExcel } from "../../../GeneracionDeReportes/DenunciasServiciosReporteExcel";

// Componente principal para gestionar denuncias relacionadas con productos y servicios en un panel de administración
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

  // Función para eliminar una denuncia de producto
  const onDeleteDenuncia = async (denunciaId) => {
    try {
      await eliminarDenunciaProducto(denunciaId);
    } catch (error) {
      console.log(error);
    }
  };

  // Función para cargar los datos iniciales
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
  productosDenuncias;

  // Obtiene todas las denuncias de productos y las organiza por producto
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

  // Filtra las denuncias de productos que no han sido revisadas
  const denunciasSinRevisar = Object.values(denunciasPorProducto)
    .map((producto) => {
      return {
        producto: producto.producto,
        denuncias: producto.denuncias.filter(
          (denuncia) => denuncia.revisar === false
        ),
      };
    })
    .filter((producto) => producto.denuncias.length > 0);

  // Filtra las denuncias de productos que ya han sido revisadas
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

  // Estado para mostrar el contenido del botón seleccionado
  const [mostrarContenido, setMostrarContenido] = useState(false);

  // Estado para controlar la visibilidad del título
  const [mostrarTitulo, setMostrarTitulo] = useState(false);

  // Función para generar un reporte de denuncias de productos en formato Excel
  const generarReporte = () => {
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

    const atributosExcluir = ["updatedAt"];
    denunciasReporteExcel(formattedData, atributosExcluir);
  };

  // Obtiene todas las denuncias de servicios y las organiza por servicio
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

  // Filtra las denuncias de servicios que no han sido revisadas
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

  // Filtra las denuncias de servicios que ya han sido revisadas
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

  // Función para generar un reporte de denuncias de servicios en formato Excel
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

    const atributosExcluir = ["updatedAt"];
    denunciasServiciosReporteExcel(formattedData, atributosExcluir);
  };

  // Función para eliminar una denuncia de servicio
  const onDeleteDenunciaServicio = async (preguntaId) => {
    try {
      await eliminarDenunciaServicio(preguntaId);
    } catch (error) {
      console.log(error);
    }
  };

  // Funciones para mostrar diferentes secciones de denuncias
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
