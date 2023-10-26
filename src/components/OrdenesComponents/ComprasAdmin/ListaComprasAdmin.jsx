import React, { useEffect } from "react";
import { useOrdenes } from "../OrdenesContext/OrdenProvider";
import { ItemCompraAdmin } from "./ItemCompraAdmin";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./ListaComprasAdmin.css";

// Definición del componente "ListaComprasAdmin"
export function ListaComprasAdmin() {
  // Obtiene información del usuario del almacenamiento local
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Obtiene funciones del contexto de órdenes
  const { obtenerComprasPorIdUsuario, ordenesUser } = useOrdenes();

  // Efecto de useEffect que se ejecuta al cargar el componente
  useEffect(() => {
    // Define una función asincrónica dentro del useEffect para utilizar await
    const fetchData = async () => {
      try {
        // Obtiene las compras del usuario actual
        await obtenerComprasPorIdUsuario(usuario.id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Función para renderizar el contenido principal de la lista de compras
  function renderMain() {
    if (ordenesUser.length === 0) {
      return <h1>No hay compras registradas</h1>;
    } else {
      return (
        <Container>
          <Row>
            {ordenesUser.map((orden) => (
              <Col key={orden.id} sm={12}>
                <Card>
                  <ItemCompraAdmin key={orden.id} orden={orden} />
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      );
    }
  }

  // Renderiza el componente
  return (
    <>
      <h2 className="titulo">Mis compras:</h2>
      <div className="list-ordenes">{renderMain()}</div>
    </>
  );
}
