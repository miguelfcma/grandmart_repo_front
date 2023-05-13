import React, { useState } from "react";
import { Card, ListGroup, Form, Button, Collapse } from "react-bootstrap";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import "./ItemProducto.css";
import { Link } from "react-router-dom";

export function ItemProductoConDenunciaAdmin({ producto }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const { eliminarDenunciaProductoRequest } = useProductos();
  const [denunciasVisible, setDenunciasVisible] = useState(false);

  const handleEliminarDenuncia = (denunciaId) => {
    // Aquí puedes manejar la lógica para eliminar la pregunta
    // por ejemplo, mediante una API
    console.log("Denuncia eliminada con la denunciaId:", denunciaId);
  };

  const handleToggleDenunciasVisible = () => {
    setDenunciasVisible(!denunciasVisible);
  };
  return (
    <Card key={producto.id}>
      <Card.Header>
        <Link
          to={`/dashAdmin/productos/detalles/${producto.producto.id}`}
          style={{ textDecoration: "none" }}
        >
          <h2>{producto.producto.nombre}</h2>
        </Link>
      </Card.Header>
      <Card.Body>
        <Button
          variant="primary"
          onClick={handleToggleDenunciasVisible}
          aria-controls="preguntas-collapse"
          aria-expanded={denunciasVisible}
        >
          {denunciasVisible ? "Ocultar denuncias" : "Mostrar denuncias"}&nbsp; (
          {producto.denuncias.length})
        </Button>
        <Collapse in={denunciasVisible}>
          <ListGroup variant="flush" id="preguntas-collapse">
            {producto.denuncias.map((denuncia) => (
              <div className="lineagruesa">
                <ListGroup.Item className="items">
                  <div style={{ fontWeight: "bold" }}>Motivo: </div>&nbsp;&nbsp;
                  <div>{denuncia.motivo}</div>
                </ListGroup.Item>
                <ListGroup.Item className="items">
                  <div style={{ fontWeight: "bold" }}>Descripción: </div>
                  &nbsp;&nbsp;
                  <div style={{ textAlign: "justify" }}>
                    {denuncia.descripcion}
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="items">
                  <div style={{ fontWeight: "bold" }}>Por: </div>&nbsp;&nbsp;
                  <div>{denuncia.id_usuario}</div>
                </ListGroup.Item>
                <ListGroup.Item className="items">
                  <div style={{ fontWeight: "bold" }}>ID Producto: </div>
                  &nbsp;&nbsp;
                  <div>{denuncia.id_producto}</div>
                </ListGroup.Item>
                <ListGroup.Item className="items">
                  <div style={{ fontWeight: "bold" }}>Realizada: </div>
                  &nbsp;&nbsp;
                  <div>{denuncia.createdAt}</div>
                </ListGroup.Item>
              </div>
            ))}
          </ListGroup>
        </Collapse>
      </Card.Body>
    </Card>
  );
}
