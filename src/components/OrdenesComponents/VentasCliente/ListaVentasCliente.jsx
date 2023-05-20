import React, { useEffect } from "react";
import { useOrdenes } from "../OrdenesContext/OrdenProvider";
import { ItemVentaCliente } from "./ItemVentasCliente"
import { Container, Row, Col } from "react-bootstrap";

export function ListaVentasCliente() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { obtenerVentasPorUsuarioId, ventasUser } = useOrdenes();

  useEffect(() => {
    // Definir una función asincrónica dentro del useEffect para utilizar await
    const fetchData = async () => {
      try {
        await obtenerVentasPorUsuarioId(usuario.id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  function renderMain() {
    if (ventasUser.length === 0) {
      return <h1>No hay ventas registradas aún</h1>;
    } else {
      return (
        <Container>
          <Row>
            {ventasUser.map((venta) => (
              <Col key={venta.id} sm={12} >
                <ItemVentaCliente venta={venta} />
              </Col>
            ))}
          </Row>
        </Container>
      );
    }
  }

  return <div>{renderMain()}</div>;
}
