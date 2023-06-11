import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import moment from "moment"; /*Formatear fechas y horas */

export const denunciasServiciosReporteExcel = (datos, atributosExcluir) => {
    // Verificar si no hay datos disponibles
    if (!datos || Object.keys(datos).length === 0) {
      console.log("No hay datos disponibles para generar el reporte.");
      return;
    }
  
    // Convertir los datos a un arreglo
    const arregloDatos = Object.values(datos);
  
    // Excluir los atributos del arreglo de objetos
    const datosSinAtributos = arregloDatos.map((dato) => {
      const datoSinAtributos = { ...dato };
      atributosExcluir.forEach((atributo) => {
        delete datoSinAtributos[atributo];
      });
      return datoSinAtributos;
    });


    // Transformar los valores de atributos que sean fechas
    const formatoFecha = "DD/MM/YYYY - HH:MM:SS"; // Formato de fecha deseado
    datosSinAtributos.forEach((dato) => {
      for (const atributo in dato) {
        if (dato.hasOwnProperty(atributo)) {
          if (moment.utc(dato[atributo], moment.ISO_8601, true).isValid()) {
            dato[atributo] = moment.utc(dato[atributo]).format(formatoFecha);
          }
        }
      }
    });
  
    // Crear el libro de trabajo, hoja de cálculo y agregar los datos
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(datosSinAtributos); // Pasar directamente datosSinAtributos
    XLSX.utils.book_append_sheet(workbook, worksheet, "ReporteDenunciasServicios");
  
    // Generar el archivo Excel y guardarlo
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    FileSaver.saveAs(blob, "reporteDeDenunciasServicioss.xlsx");
  };
  