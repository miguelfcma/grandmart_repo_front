import React, { useEffect, useState } from "react";
import { useOrdenes } from "../OrdenesContext/OrdenProvider";
import { ItemCompraAdmin } from "./ItemCompraAdmin";

import "./ListaComprasAdmin.css";
import { Container, Row, Col } from "react-bootstrap";
export function ListaComprasAdmin() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const { obtenerOrdenesUsuario, ordenesUser } = useOrdenes();

  useEffect(() => {
    // Definir una función asincrónica dentro del useEffect para utilizar await
    const fetchData = async () => {
      try {
        await obtenerOrdenesUsuario(usuario.id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  function renderMain() {
    if (ordenesUser.length === 0) {
      return <h1>No hay órdenes registradas</h1>;
    } else {
      return (
        <Container>
          <Row>
            {ordenesUser.map((orden) => (
              <Col key={orden.id} sm={12}>
                <ItemCompraAdmin key={orden.id} orden={orden} />
              </Col>
            ))}
          </Row>
        </Container>
      );
    }
  }

  return (
    <>
      <h2 className="titulo">Lista de compras:</h2>

      <div className="list-ordenes">{renderMain()}</div>
    </>
  );
}
