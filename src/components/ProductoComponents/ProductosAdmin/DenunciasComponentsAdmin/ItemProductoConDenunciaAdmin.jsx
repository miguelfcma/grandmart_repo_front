import React, { useState } from "react";
import { Card, ListGroup, Form, Button, Collapse } from "react-bootstrap";
import { useProductos } from "../../ProductosContext/ProductoProvider";

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
        <h2>Nombre del producto: {producto.producto.nombre}</h2>
      </Card.Header>
      <Card.Body>
        <Button
          variant="primary"
          onClick={handleToggleDenunciasVisible}
          aria-controls="preguntas-collapse"
          aria-expanded={denunciasVisible}
        >
          {denunciasVisible ? "Ocultar denuncias" : "Mostrar denuncias"}
        </Button>
        <Collapse in={denunciasVisible}>
          <ListGroup variant="flush" id="preguntas-collapse">
            {producto.denuncias.map((denuncia) => (
              <div>
                <ListGroup.Item>Motivo: {denuncia.motivo}</ListGroup.Item>
                <ListGroup.Item>
                  Descripción: {denuncia.descripcion}
                </ListGroup.Item>
                <ListGroup.Item>Fecha: {denuncia.fecha}</ListGroup.Item>
                <ListGroup.Item>
                  ID Usuario: {denuncia.id_usuario}
                </ListGroup.Item>
                <ListGroup.Item>
                  ID Producto: {denuncia.id_producto}
                </ListGroup.Item>
                <ListGroup.Item>Creado en: {denuncia.createdAt}</ListGroup.Item>
                <ListGroup.Item>
                  Actualizado en: {denuncia.updatedAt}
                </ListGroup.Item>
              </div>
            ))}
          </ListGroup>
        </Collapse>
      </Card.Body>
    </Card>
  );
}
