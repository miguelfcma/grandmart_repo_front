//Este archivo es el que da formato a los reportes que se vacian en hojas de Excel, para que en las hojas de Excel tengan un formato mas entendible

import * as XLSX from "xlsx";
import FileSaver from "file-saver";
import moment from "moment";

// Función para generar un informe en formato Excel a partir de datos de ventas
export const VentasReporteExcel = (datos, atributosExcluir) => {
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
  const filename = `ReporteVentas_${dateFormatted}_${timeFormatted}.xlsx`;

  // Excluir los atributos del arreglo de objetos
  const datosSinAtributos = datos.map((dato) => {
    const datoSinAtributos = { ...dato };
    atributosExcluir.forEach((atributo) => {
      delete datoSinAtributos[atributo];
    });
    return datoSinAtributos;
  });

  // Formatear las fechas utilizando moment.js
  datosSinAtributos.forEach((dato) => {
    dato.fechaCreacion = moment(dato.fechaCreacion).format("YYYY-MM-DD");
    dato.fechaActualizacion = moment(dato.fechaActualizacion).format("YYYY-MM-DD");
  });

  // Obtener el producto más vendido
  const productosVendidos = datos.reduce((productos, venta) => {
    const { idProducto, nombreProducto, cantidad, precioProducto } = venta;
    const montoTotal = parseFloat(cantidad) * parseFloat(precioProducto);

    if (productos[idProducto]) {
      productos[idProducto].cantidad += parseInt(cantidad);
      productos[idProducto].montoTotal += montoTotal;
    } else {
      productos[idProducto] = {
        idProducto,
        nombreProducto,
        cantidad: parseInt(cantidad),
        montoTotal,
      };
    }
    return productos;
  }, {});

  // Ordenar los productos por cantidad vendida de mayor a menor
  const productosOrdenados = Object.values(productosVendidos).sort(
    (a, b) => b.cantidad - a.cantidad
  );

  // Crear el libro de trabajo y la hoja de cálculo
  const workbook = XLSX.utils.book_new();

  // Hoja de cálculo de los datos sin atributos
  const worksheet = XLSX.utils.json_to_sheet(datosSinAtributos);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");

  // Hoja de cálculo de los productos ordenados por cantidad vendida
  const productosWorksheetData = productosOrdenados.map((producto) => ({
    "ID Producto": producto.idProducto,
    "Nombre Producto": producto.nombreProducto,
    Cantidad: producto.cantidad,
    "Monto Total": producto.montoTotal,
  }));
  const productosWorksheet = XLSX.utils.json_to_sheet(productosWorksheetData);
  XLSX.utils.book_append_sheet(workbook, productosWorksheet, "Productos más vendidos");

  // Generar el archivo Excel y guardarlo
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });
  FileSaver.saveAs(blob, filename);
};
