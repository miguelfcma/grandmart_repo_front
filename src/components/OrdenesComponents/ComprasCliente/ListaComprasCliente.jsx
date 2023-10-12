import React, { useEffect } from "react";
import { useOrdenes } from "../OrdenesContext/OrdenProvider";
import { ItemCompraCliente } from "./ItemCompraCliente";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./ListaComprasCliente.css";

export function ListaComprasCliente() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { obtenerComprasPorIdUsuario, ordenesUser } = useOrdenes();

  useEffect(() => {
    // Definir una función asincrónica dentro del useEffect para utilizar await
    const fetchData = async () => {
      try {
        await obtenerComprasPorIdUsuario(usuario.id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  function renderMain() {
    // Ordenar las compras de la última a la primera con el método reverse
    const comprasOrdenadas = [...ordenesUser].reverse();

    if (comprasOrdenadas.length === 0) {
      return <h1>No hay compras registradas</h1>;
    } else {
      return (
        <Container>
          <Row>
            {comprasOrdenadas.map((orden) => (
              <Col key={orden.id} sm={12}>
                <Card>
                  <ItemCompraCliente key={orden.id} orden={orden} />
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      );
    }
  }

  return (
    <>
      <h2 className="titulo">Mis compras:</h2>
      <div className="list-ordenes">{renderMain()}</div>
    </>
  );
}
