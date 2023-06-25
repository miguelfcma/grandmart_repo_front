import React, { useEffect, useState } from "react";
import { useOrdenes } from "../OrdenesContext/OrdenProvider";
import { ItemVentaAdmin } from "./ItemVentaAdmin";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FiltroVentas } from "./FiltroVentas";
import { VentasReporteExcel } from "../../GeneracionDeReportes/VentasReporteExcel";
export function ListaVentasAdmin() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { obtenerVentasPorUsuarioId, ventasUser } = useOrdenes();
  const [ventasFiltradas, setVentasFiltradas] = useState([]);
  const [filtros, setFiltros] = useState({});

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

  const handleFiltrarVentas = (filtros) => {
    setFiltros(filtros);
  };

  const handleLimpiarFiltros = () => {
    setFiltros({});
  };

  useEffect(() => {
    const ventasFiltradas = ventasUser.filter((venta) => {
      let cumplenFiltros = true;

      if (filtros.estado && venta.orden.estado_orden !== filtros.estado) {
        cumplenFiltros = false;
      }

      if (filtros.totalMin && venta.totalVenta < filtros.totalMin) {
        cumplenFiltros = false;
      }

      if (filtros.totalMax && venta.totalVenta > filtros.totalMax) {
        cumplenFiltros = false;
      }
      console.log("venta", venta);
      if (filtros.id && venta.orden.id === filtros.id) {
        cumplenFiltros = false;
      }

      return cumplenFiltros;
    });

    setVentasFiltradas(ventasFiltradas);
  }, [filtros, ventasUser]);

  const ventasAMostrar = filtros ? ventasFiltradas : ventasUser;

  const atributosExcluir = [];
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

  console.log(ventasEstructuradas);

  return (
    <Container>
      <h1>Historial de Ventas</h1>
      <FiltroVentas
        handleFiltrarVentas={handleFiltrarVentas}
        handleLimpiarFiltros={handleLimpiarFiltros}
      />

      {ventasAMostrar.length === 0 ? (
        <h1>No hay ventas registradas aún</h1>
      ) : (
        <Row>
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
