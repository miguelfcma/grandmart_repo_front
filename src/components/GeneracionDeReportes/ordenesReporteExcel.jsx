import * as XLSX from "xlsx";
import FileSaver from "file-saver";
import moment from "moment";

export const ordenesReporteExcel = (datos, atributosExcluir) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const dateFormatted = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`; // Formato: AAAA-MM-DD
  const timeFormatted = `${hours.toString().padStart(2, "0")}-${minutes.toString().padStart(2, "0")}-${seconds.toString().padStart(2, "0")}`; // Formato: HH-MM-SS
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

  // Renombrar la columna "estado_orden" a "Estado Orden"
  datosSinAtributos.forEach((dato) => {
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

  // Hoja de resumen
  const resumenOrdenes = obtenerResumenOrdenes(datos);
  const resumenData = Object.entries(resumenOrdenes).map(([estado, cantidad]) => ({
    "Estado Orden": estado,
    "Cantidad": cantidad,
  }));
  const worksheetResumen = XLSX.utils.json_to_sheet(resumenData);
  XLSX.utils.book_append_sheet(workbook, worksheetResumen, "Resumen");

  // Generar el archivo Excel y guardarlo
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });
  FileSaver.saveAs(blob, filename);
};

const obtenerResumenOrdenes = (datos) => {
  const resumen = {};
  datos.forEach((dato) => {
    const estado = dato.estado_orden;
    if (estado in resumen) {
      resumen[estado] += 1;
    } else {
      resumen[estado] = 1;
    }
  });
  return resumen;
};
