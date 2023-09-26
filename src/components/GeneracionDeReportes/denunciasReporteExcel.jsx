import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import moment from "moment"; /*Formatear fechas y horas */

export const denunciasReporteExcel = (datos, atributosExcluir) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const dateFormatted = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  const timeFormatted = `${hours.toString().padStart(2, "0")}-${minutes
    .toString()
    .padStart(2, "0")}-${seconds.toString().padStart(2, "0")}`;
  const filename = `reporteDeDenunciasProductos_${dateFormatted}_${timeFormatted}.xlsx`;

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

  // Obtener el gráfico comparativo de denuncias por vendedor o tipo de publicación
  const vendedoresDenuncias = {};
  const tiposPublicacionesDenuncias = {};

  datos.forEach((denuncia) => {
    const vendedorId = denuncia["ID propietario"];
    const tipoPublicacionId = denuncia["ID Producto"];

    if (!vendedoresDenuncias[vendedorId]) {
      vendedoresDenuncias[vendedorId] = 0;
    }
    if (!tiposPublicacionesDenuncias[tipoPublicacionId]) {
      tiposPublicacionesDenuncias[tipoPublicacionId] = 0;
    }

    vendedoresDenuncias[vendedorId]++;
    tiposPublicacionesDenuncias[tipoPublicacionId]++;
  });

  // Convertir datos de gráficos a un arreglo de objetos
  const arregloVendedoresDenuncias = Object.entries(vendedoresDenuncias).map(
    ([vendedorId, cantidadDenuncias]) => ({
      "ID Vendedor": vendedorId,
      "Cantidad de Denuncias": cantidadDenuncias,
    })
  );

  const arregloTiposPublicacionesDenuncias = Object.entries(
    tiposPublicacionesDenuncias
  ).map(([tipoPublicacionId, cantidadDenuncias]) => ({
    "ID Producto": tipoPublicacionId,
    "Cantidad de Denuncias": cantidadDenuncias,
  }));

  // Obtener el motivo más recurrente por producto
  const motivoMasRecurrentePorProducto = {};

  datos.forEach((denuncia) => {
    const productoId = denuncia["ID Producto"];
    const motivo = denuncia["Motivo"];

    if (!motivoMasRecurrentePorProducto[productoId]) {
      motivoMasRecurrentePorProducto[productoId] = {
        "ID Producto": productoId,
        Motivos: {},
      };
    }

    if (!motivoMasRecurrentePorProducto[productoId].Motivos[motivo]) {
      motivoMasRecurrentePorProducto[productoId].Motivos[motivo] = 1;
    } else {
      motivoMasRecurrentePorProducto[productoId].Motivos[motivo]++;
    }
  });

  // Convertir motivoMasRecurrentePorProducto a un arreglo de objetos con contador por motivo
  const arregloMotivoMasRecurrente = Object.entries(
    motivoMasRecurrentePorProducto
  )
    .map(([productoId, motivoData]) => {
      const motivos = Object.entries(motivoData.Motivos).map(
        ([motivo, cantidad]) => ({
          "ID Producto": productoId,
          Motivo: motivo,
          Cantidad: cantidad,
        })
      );
      return motivos;
    })
    .flat();

  // Crear el libro de trabajo y hojas de cálculo
  const workbook = XLSX.utils.book_new();
  const worksheetDenuncias = XLSX.utils.json_to_sheet(datosSinAtributos);
  const worksheetVendedoresDenuncias = XLSX.utils.json_to_sheet(
    arregloVendedoresDenuncias
  );
  const worksheetTiposPublicacionesDenuncias = XLSX.utils.json_to_sheet(
    arregloTiposPublicacionesDenuncias
  );
  const worksheetMotivoMasRecurrente = XLSX.utils.json_to_sheet(
    arregloMotivoMasRecurrente
  );

  // Agregar las hojas de cálculo al libro de trabajo
  XLSX.utils.book_append_sheet(workbook, worksheetDenuncias, "Denuncias");
  XLSX.utils.book_append_sheet(
    workbook,
    worksheetVendedoresDenuncias,
    "Vendedores"
  );
  XLSX.utils.book_append_sheet(
    workbook,
    worksheetTiposPublicacionesDenuncias,
    "ProdutosDenuncias"
  );
  XLSX.utils.book_append_sheet(
    workbook,
    worksheetMotivoMasRecurrente,
    "MotivoMasRecurrente"
  );

  // Generar el archivo Excel y guardarlo
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });
  FileSaver.saveAs(blob, filename);
};
