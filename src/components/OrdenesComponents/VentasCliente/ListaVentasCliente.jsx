import React, { useEffect, useState } from "react";
import { useOrdenes } from "../OrdenesContext/OrdenProvider";
import { ItemVentaCliente } from "./ItemVentasCliente";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FiltroVentas } from "./FiltroVentas";

export function ListaVentasCliente() {
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

      if (filtros.id && venta.id !== filtros.id) {
        cumplenFiltros = false;
      }

      return cumplenFiltros;
    });

    setVentasFiltradas(ventasFiltradas);
  }, [filtros, ventasUser]);

  const ventasAMostrar = filtros ? ventasFiltradas : ventasUser;

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
          {ventasAMostrar.map((venta) => (
            <Col key={venta.id} sm={12}>
              <ItemVentaCliente venta={venta} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
