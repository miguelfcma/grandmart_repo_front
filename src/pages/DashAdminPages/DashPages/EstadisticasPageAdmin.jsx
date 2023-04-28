import { SidebarAdmin } from "../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../components/DashAdminComponents/HeaderAdmin";

import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useOrdenes } from "../../../components/OrdenesComponents/OrdenesContext/OrdenProvider";
import { useEffect } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function EstadisticasPageAdmin() {
  const { obtenerTodasLasOrdenesConDetalles, ordenesAll } = useOrdenes();

  useEffect(() => {
    // Definir una función asincrónica dentro del useEffect para utilizar await
    const fetchData = async () => {
      try {
        await obtenerTodasLasOrdenesConDetalles();
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Obtener los datos de fechas y totales de las órdenes en español
  const fechas = ordenesAll.map((orden) => {
    const fecha = new Date(orden.createdAt);
    const opcionesFecha = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const opcionesHora = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const fechaFormateada = fecha.toLocaleString("es-ES", opcionesFecha);
    const horaFormateada = fecha.toLocaleString("es-ES", opcionesHora);
    return `${fechaFormateada} ${horaFormateada}`;
  });


  const totales = ordenesAll.map(orden => parseFloat(orden.total));

  // Configurar los datos y opciones del gráfico
  const midata = {
    labels: fechas,
    datasets: [
      {
        label: "Total de Ventas",
        data: totales,
        tension: 0.5,
        fill: true,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(54, 162, 235)",
        pointBackgroundColor: "rgba(54, 162, 235)",
      },
    
    ],
  };

  const misoptions = {
    scales: {
      y: {
        min: 0,
      },
      x: {
        display: false, /* Para que no se muestren las fechas por debajo del gráfico */
      },
    },
  };
  
  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <h1>Ventas del Día</h1>
        <Line data={midata} options={misoptions} />
      </div>
    </div>
  );
}
