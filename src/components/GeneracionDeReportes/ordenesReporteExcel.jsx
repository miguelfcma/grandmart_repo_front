//Este archivo es el que da formato a los reportes que se vacian en hojas de Excel, para que en las hojas de Excel tengan un formato mas entendible

import * as XLSX from "xlsx";
import FileSaver from "file-saver";
import moment from "moment";

// Función para generar un informe en formato Excel a partir de datos de órdenes de compras
export const ordenesReporteExcel = (datos, atributosExcluir) => {
  // Obtener la fecha y hora actual
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Formatear la fecha y hora actual para incluir en el nombre del archivo
  const dateFormatted = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`; // Formato: AAAA-MM-DD
  const timeFormatted = `${hours.toString().padStart(2, "0")}-${minutes
    .toString()
    .padStart(2, "0")}-${seconds.toString().padStart(2, "0")}`; // Formato: HH-MM-SS
  const filename = `ReporteOrdenesCompras_${dateFormatted}_${timeFormatted}.xlsx`;

  // Excluir los atributos del arreglo de objetos
  const datosSinAtributos = datos.map((dato) => {
    const datoSinAtributos = {};
    for (const atributo in dato) {
      if (!atributosExcluir.includes(atributo)) {
        datoSinAtributos[atributo] = dato[atributo];
      }
    }
    return datoSinAtributos;
  });

  // Transformar los valores de atributos que sean fechas
  const formatoFecha = "YYYY-MM-DD"; // Formato de fecha deseado
  datosSinAtributos.forEach((dato) => {
    for (const atributo in dato) {
      if (dato.hasOwnProperty(atributo)) {
        if (moment.utc(dato[atributo], moment.ISO_8601, true).isValid()) {
          dato[atributo] = moment.utc(dato[atributo]).format(formatoFecha);
        }
      }
    }
  });

  // Realizar transformaciones adicionales en los datos
  datosSinAtributos.forEach((dato) => {
    // Renombrar columna para cambiar "createdAt" a "fechaCreacion"
    if (dato.hasOwnProperty("createdAt")) {
      dato["fechaCreacion"] = dato["createdAt"];
      delete dato["createdAt"];
    }

    // Renombrar la columna "estado_orden" a "Estado Orden"
    if (dato.hasOwnProperty("estado_orden")) {
      dato["Estado Orden"] = dato["estado_orden"];
      delete dato["estado_orden"];
    }
  });

  // Crear el libro de trabajo y las hojas
  const workbook = XLSX.utils.book_new();

  // Hoja de datos
  const worksheetDatos = XLSX.utils.json_to_sheet(datosSinAtributos);
  XLSX.utils.book_append_sheet(workbook, worksheetDatos, "Reporte");

  // Hoja de usuarios
  const usuariosData = obtenerResumenUsuarios(datos);
  const worksheetUsuarios = XLSX.utils.json_to_sheet(usuariosData);
  XLSX.utils.book_append_sheet(workbook, worksheetUsuarios, "Usuarios");

  // Hoja de estados de órdenes con monto total
  const estadosData = obtenerResumenEstadosMonto(datos);
  const resumenData = Object.entries(estadosData).map(
    ([estado, datosEstado]) => ({
      "Estado Orden": estado,
      Cantidad: datosEstado.cantidad,
      "Monto Total": datosEstado.montoTotal.toFixed(2), // Formatear el monto con dos decimales
    })
  );
  const worksheetEstados = XLSX.utils.json_to_sheet(resumenData);
  XLSX.utils.book_append_sheet(workbook, worksheetEstados, "EstadosOrdenes");

  // Generar el archivo Excel y guardarlo
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });
  FileSaver.saveAs(blob, filename);
};

// Función para obtener un resumen de usuarios
const obtenerResumenUsuarios = (datos) => {
  const usuariosResumen = {};
  datos.forEach((dato) => {
    const usuarioId = dato.id_usuario;
    const totalOrden = parseFloat(dato.total); // Convertir a número
    if (usuarioId in usuariosResumen) {
      usuariosResumen[usuarioId].totalOrdenes += 1;
      usuariosResumen[usuarioId].montoTotal += totalOrden;
    } else {
      usuariosResumen[usuarioId] = {
        idUsuario: usuarioId,
        totalOrdenes: 1,
        montoTotal: totalOrden,
      };
    }
  });

  return Object.values(usuariosResumen);
};

// Función para obtener un resumen de estados de órdenes con monto total
const obtenerResumenEstadosMonto = (datos) => {
  const resumen = {};
  datos.forEach((dato) => {
    const estado = dato.estado_orden;
    const totalOrden = parseFloat(dato.total); // Convertir a número
    if (estado in resumen) {
      resumen[estado].cantidad += 1;
      resumen[estado].montoTotal += totalOrden;
    } else {
      resumen[estado] = {
        cantidad: 1,
        montoTotal: totalOrden,
      };
    }
  });
  return resumen;
};
