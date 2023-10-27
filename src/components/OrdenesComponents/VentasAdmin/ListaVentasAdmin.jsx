import React, { useEffect, useState } from "react";
import { useOrdenes } from "../OrdenesContext/OrdenProvider";
import { ItemVentaAdmin } from "./ItemVentaAdmin";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FiltroVentas } from "./FiltroVentas";
import { VentasReporteExcel } from "../../GeneracionDeReportes/VentasReporteExcel";

export function ListaVentasAdmin() {
  // Obtenemos el usuario actual del almacenamiento local
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Importamos funciones y estado desde el contexto de órdenes
  const { obtenerVentasPorUsuarioId, ventasUser } = useOrdenes();

  // Estado para almacenar las ventas filtradas
  const [ventasFiltradas, setVentasFiltradas] = useState([]);

  // Estado para gestionar los filtros aplicados
  const [filtros, setFiltros] = useState({});

  // Efecto para obtener las ventas del usuario
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

  // Función para manejar la acción de filtrar ventas
  const handleFiltrarVentas = (filtros) => {
    setFiltros(filtros);
  };

  // Función para limpiar los filtros
  const handleLimpiarFiltros = () => {
    setFiltros({});
  };

  // Efecto para filtrar las ventas en base a los filtros
  useEffect(() => {
    const ventasFiltradas = ventasUser.filter((venta) => {
      let cumplenFiltros = true;

      // Aplicamos los filtros
      if (filtros.estado && venta.orden.estado_orden !== filtros.estado) {
        cumplenFiltros = false;
      }

      if (filtros.totalMin && venta.totalVenta < filtros.totalMin) {
        cumplenFiltros = false;
      }

      if (filtros.totalMax && venta.totalVenta > filtros.totalMax) {
        cumplenFiltros = false;
      }

      if (filtros.id && venta.orden.id === filtros.id) {
        cumplenFiltros = false;
      }

      return cumplenFiltros;
    });

    setVentasFiltradas(ventasFiltradas);
  }, [filtros, ventasUser]);

  // Determinar qué ventas mostrar (filtradas o no)
  const ventasAMostrar = filtros ? ventasFiltradas : ventasUser;

  // Definir atributos a excluir del reporte Excel
  const atributosExcluir = [];

  // Estructurar datos para el reporte Excel
  const ventasEstructuradas = ventasAMostrar.flatMap((venta) => {
    const orden = venta.orden;

    return venta.productos.map((producto) => ({
      idOrden: orden.id.toString(),
      estadoOrden: orden.estado_orden,
      fechaVenta: orden.createdAt,
      totalVenta: venta.totalVenta.toString(),
      idProducto: producto.producto.id.toString(),
      nombreProducto: producto.producto.nombre,
      precioProducto: producto.producto.precio.toString(),
      cantidad: producto.cantidad.toString(),
      subtotal: producto.subtotal.toString(),
    }));
  });

  // Imprimir ventas estructuradas en la consola
  console.log(ventasEstructuradas);

  return (
    <Container>
      <h1>Historial de Ventas</h1>
      
      {/* Componente para filtrar ventas */}
      <FiltroVentas
        handleFiltrarVentas={handleFiltrarVentas}
        handleLimpiarFiltros={handleLimpiarFiltros}
      />

      {ventasAMostrar.length === 0 ? (
        <h1>No hay ventas registradas aún</h1>
      ) : (
        <Row>
          {/* Botón para generar un reporte Excel de ventas */}
          <Button
            variant="primary"
            onClick={() =>
              VentasReporteExcel(ventasEstructuradas, atributosExcluir)
            }
          >
            <box-icon
              style={{ marginRight: "5px" }}
              color="white"
              name="file"
            ></box-icon>
            Generar reporte (.xlsx)
          </Button>

          {/* Mapeo y renderización de las ventas */}
          {ventasAMostrar.map((venta) => (
            <Col key={venta.id} sm={12}>
              <ItemVentaAdmin venta={venta} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
