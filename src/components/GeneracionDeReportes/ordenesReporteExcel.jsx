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

  const dateFormatted = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`; // Formato: AAAA-MM-DD
  const timeFormatted = `${hours.toString().padStart(2, "0")}-${minutes
    .toString()
    .padStart(2, "0")}-${seconds.toString().padStart(2, "0")}`; // Formato: HH-MM-SS
  const filename = `ReporteOrdenesCompras_${dateFormatted}_${timeFormatted}`;

  // Excluir los atributos del arreglo de objetos
  const datosSinAtributos = datos.map((dato) => {
    const datoSinAtributos = { ...dato };
    atributosExcluir.forEach((atributo) => {
      delete datoSinAtributos[atributo];
    });
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

  // Renombrar la columna "createdAt" a "Fecha de Creación"
  datosSinAtributos.forEach((dato) => {
    if (dato.hasOwnProperty("createdAt")) {
      dato["FechaCreacion"] = dato["createdAt"];
      delete dato["createdAt"];
    }
  });

  // Crear el libro de trabajo, hoja de cálculo y agregar los datos
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(datosSinAtributos);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");

  // Generar el archivo Excel y guardarlo
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });
  FileSaver.saveAs(blob, `${filename}.xlsx`);
};
