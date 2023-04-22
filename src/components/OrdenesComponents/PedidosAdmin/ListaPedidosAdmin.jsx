import React, { useEffect } from "react";
import { useOrdenes } from "../OrdenesContext/OrdenProvider";
import { ItemPedidoAdmin } from "./ItemPedidoAdmin";
import { Container, Row, Col } from "react-bootstrap";

export function ListaPedidosAdmin() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { obtenerPedidosPorUsuario, pedidosUser } = useOrdenes();

  useEffect(() => {
    // Definir una función asincrónica dentro del useEffect para utilizar await
    const fetchData = async () => {
      try {
        await obtenerPedidosPorUsuario(usuario.id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  function renderMain() {
    if (pedidosUser.length === 0) {
      return <h1>No hay pedidos registrados</h1>;
    } else {
      return (
        <Container>
          <Row>
            {pedidosUser.map((pedido) => (
              <Col key={pedido.id} sm={12} >
                <ItemPedidoAdmin pedido={pedido} />
              </Col>
            ))}
          </Row>
        </Container>
      );
    }
  }

  return <div>{renderMain()}</div>;
}
