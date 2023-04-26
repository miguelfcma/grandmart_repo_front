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

  // Obtener los datos de fechas y totales de las órdenes
  const fechas = ordenesAll.map(orden => new Date(orden.createdAt));
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
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(255, 99, 132)",
        pointBackgroundColor: "rgba(255, 99, 132)",
      },
    
    ],
  };

  const misoptions = {
    scales: {
      y: {
        min: 0,
      },
      x: {
        ticks: { color: "rgb(255, 99, 132)" },
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
