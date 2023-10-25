//Este archivo es el que da formato a los reportes que se vacian en hojas de Excel, para que en las hojas de Excel tengan un formato mas entendible

import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import moment from "moment"; // Librería para formatear fechas y horas

// Función para generar un informe en formato Excel a partir de datos de denuncias de servicios
export const denunciasServiciosReporteExcel = (datos, atributosExcluir) => {
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
    .padStart(2, "0")}`;
  const timeFormatted = `${hours.toString().padStart(2, "0")}-${minutes
    .toString()
    .padStart(2, "0")}-${seconds.toString().padStart(2, "0")}`;
  const filename = `reporteDeDenunciasServicios_${dateFormatted}_${timeFormatted}.xlsx`;

  // Verificar si no hay datos disponibles
  if (!datos || Object.keys(datos).length === 0) {
    console.log("No hay datos disponibles para generar el reporte.");
    return;
  }

  // Convertir los datos a un arreglo
  const arregloDatos = Object.values(datos);

  // Excluir los atributos especificados del arreglo de objetos
  const datosSinAtributos = arregloDatos.map((dato) => {
    const datoSinAtributos = { ...dato };
    atributosExcluir.forEach((atributo) => {
      delete datoSinAtributos[atributo];
    });
    return datoSinAtributos;
  });

  // Transformar los valores de atributos que sean fechas al formato deseado
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

  // Obtener estadísticas: gráfico comparativo de denuncias por vendedor o tipo de servicio
  const vendedoresDenuncias = {};
  const serviciosDenuncias = {};

  datos.forEach((denuncia) => {
    const vendedorId = denuncia["ID propietario"];
    const servicioId = denuncia["ID Servicio"];

    if (!vendedoresDenuncias[vendedorId]) {
      vendedoresDenuncias[vendedorId] = 0;
    }
    if (!serviciosDenuncias[servicioId]) {
      serviciosDenuncias[servicioId] = 0;
    }

    vendedoresDenuncias[vendedorId]++;
    serviciosDenuncias[servicioId]++;
  });

  // Convertir datos de gráficos a un arreglo de objetos
  const arregloVendedoresDenuncias = Object.entries(vendedoresDenuncias).map(
    ([vendedorId, cantidadDenuncias]) => ({
      "ID Vendedor": vendedorId,
      "Cantidad de Denuncias": cantidadDenuncias,
    })
  );

  const arregloServiciosDenuncias = Object.entries(serviciosDenuncias).map(
    ([servicioId, cantidadDenuncias]) => ({
      "ID Servicio": servicioId,
      "Cantidad de Denuncias": cantidadDenuncias,
    })
  );

  // Obtener el motivo más recurrente por servicio
  const motivoMasRecurrentePorServicio = {};

  datos.forEach((denuncia) => {
    const servicioId = denuncia["ID Servicio"];
    const motivo = denuncia["Motivo"];

    if (!motivoMasRecurrentePorServicio[servicioId]) {
      motivoMasRecurrentePorServicio[servicioId] = {
        "ID Servicio": servicioId,
        Motivos: {},
      };
    }

    if (!motivoMasRecurrentePorServicio[servicioId].Motivos[motivo]) {
      motivoMasRecurrentePorServicio[servicioId].Motivos[motivo] = 1;
    } else {
      motivoMasRecurrentePorServicio[servicioId].Motivos[motivo]++;
    }
  });

  // Convertir motivoMasRecurrentePorServicio a un arreglo de objetos con contador por motivo
  const arregloMotivoMasRecurrente = Object.entries(
    motivoMasRecurrentePorServicio
  )
    .map(([servicioId, motivoData]) => {
      const motivos = Object.entries(motivoData.Motivos).map(
        ([motivo, cantidad]) => ({
          "ID Servicio": servicioId,
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
  const worksheetServiciosDenuncias = XLSX.utils.json_to_sheet(
    arregloServiciosDenuncias
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
    worksheetServiciosDenuncias,
    "Servicios"
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
