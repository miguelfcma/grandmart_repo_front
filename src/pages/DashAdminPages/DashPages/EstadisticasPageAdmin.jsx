import { SidebarAdmin } from "../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../components/DashAdminComponents/HeaderAdmin";
import { Line } from "react-chartjs-2";
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
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";
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

  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        await obtenerTodasLasOrdenesConDetalles();
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const ordenesDiaActual = ordenesAll.filter((orden) => {
    const fechaOrden = new Date(orden.createdAt);
    return fechaOrden.toDateString() === fechaSeleccionada.toDateString();
  });

  const datosOrdenes = ordenesDiaActual.map((orden) => {
    const fecha = new Date(orden.createdAt);
    const fechaFormateada = fecha.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const horaFormateada = fecha.toLocaleTimeString("es-ES", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return {
      fecha: `${fechaFormateada} ${horaFormateada}`,
      totalOrden: parseFloat(orden.total),
    };
  });

  const fechasDiaActual = datosOrdenes.map((orden) => orden.fecha);
  const totalesDiaActual = datosOrdenes.map((orden) => orden.totalOrden);

  const data = {
    labels: fechasDiaActual,
    datasets: [
      {
        label: "Total de Órdenes",
        data: totalesDiaActual,
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
  const options = {
    scales: {
      y: {
        min: 0,
        title: {
          display: true,
          text: 'Ingresos en pesos MXN de Órdenes',
        },
      },
      x: {
        display: true,
        title: {
          display: true,
          text: 'Fecha y Hora',
        },
      },
    },
  };

  const handleFechaActual = () => {
    setFechaSeleccionada(new Date());
  };

  return (
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <h1>Ingresos por Día de las Órdenes</h1>
        <div className="fecha-seleccionada">
          <DatePicker
            selected={fechaSeleccionada}
            onChange={(date) => setFechaSeleccionada(date)}
            dateFormat="P"
          />
          <Button variant="success" onClick={handleFechaActual}>Fecha Actual</Button>
        </div>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
