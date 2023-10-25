//Este archivo es el que da formato a los reportes que se vacian en hojas de Excel, para que en las hojas de Excel tengan un formato mas entendible

import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import moment from "moment"; /*Formatear fechas y horas */

// Función para generar un informe en formato Excel a partir de datos de reviews de productos
export const reviewsReporteExcel = (datos, atributosExcluir) => {
  // Obtener la fecha y hora actual
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Formatear la fecha y hora actual para incluir en el nombre del archivo
  const dateFormatted = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  const timeFormatted = `${hours.toString().padStart(2, "0")}-${minutes.toString().padStart(2, "0")}-${seconds.toString().padStart(2, "0")}`;
  const filename = `reporteDeReviewsProductos_${dateFormatted}_${timeFormatted}.xlsx`;

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

  // Obtener la cantidad total de reviews y el promedio de calificación por producto
  const productosConReviews = {};
  datos.forEach((dato) => {
    const idProducto = dato["ID Producto"];
    if (!productosConReviews[idProducto]) {
      productosConReviews[idProducto] = {
        CantidadDeReviews: 0,
        PromedioDeCalificacion: 0,
      };
    }
    productosConReviews[idProducto].CantidadDeReviews++;
    productosConReviews[idProducto].PromedioDeCalificacion += dato["Calificacion"];
  });

  // Calcular el promedio de calificación
  for (const idProducto in productosConReviews) {
    if (productosConReviews.hasOwnProperty(idProducto)) {
      const producto = productosConReviews[idProducto];
      producto.PromedioDeCalificacion /= producto.CantidadDeReviews;
    }
  }

  // Convertir productosConReviews a un arreglo de objetos
  const arregloProductosConReviews = Object.entries(productosConReviews).map(
    ([idProducto, producto]) => ({
      "ID Producto": parseInt(idProducto),
      "Cantidad de Reviews": producto.CantidadDeReviews,
      "Promedio de Calificación": producto.PromedioDeCalificacion.toFixed(2),
    })
  );

  // Crear el libro de trabajo, hojas de cálculo y agregar los datos
  const workbook = XLSX.utils.book_new();
  const worksheet1 = XLSX.utils.json_to_sheet(datosSinAtributos);
  const worksheet2 = XLSX.utils.json_to_sheet(arregloProductosConReviews);
  XLSX.utils.book_append_sheet(workbook, worksheet1, "ReporteReviewsProductos");
  XLSX.utils.book_append_sheet(workbook, worksheet2, "ReporteProductosConReviews");

  // Generar el archivo Excel y guardarlo
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });
  FileSaver.saveAs(blob, filename);
};
