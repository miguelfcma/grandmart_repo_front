import { SidebarCliente } from "../../../components/DashClientComponents/SidebarCliente";
import { HeaderCliente } from "../../../components/DashClientComponents/HeaderCliente";
import { Line } from "react-chartjs-2";
import { Button } from "react-bootstrap";
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

export function EstadisticasPageCliente() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { obtenerVentasPorUsuarioId, ventasUser } = useOrdenes();

  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        await obtenerVentasPorUsuarioId(usuario.id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const ventasDiaActual = ventasUser.filter((venta) => {
    const fechaOrden = new Date(venta.orden.createdAt);
    return fechaOrden.toDateString() === fechaSeleccionada.toDateString();
  });

  const datosVentas = ventasDiaActual.map((venta) => {
    const fecha = new Date(venta.orden.createdAt);
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
      totalVenta: parseFloat(venta.totalVenta),
    };
  });

  const fechasDiaActual = datosVentas.map((venta) => venta.fecha);
  const totalesDiaActual = datosVentas.map((venta) => venta.totalVenta);

  const data = {
    labels: fechasDiaActual,
    datasets: [
      {
        label: "Total de Ventas",
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
          text: 'Ingresos en pesos MXN de Ventas',
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
      <SidebarCliente />
      <div className="contenidoPages">
        <HeaderCliente />
        <h1>Ingresos por Día de las Ventas</h1>
        <div className="fecha-seleccionada">
          <p>Seleccione una fecha:</p>
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
