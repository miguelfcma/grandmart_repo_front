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
        <h2>{producto.nombre}</h2>
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
              <ListGroup.Item key={denuncia.id}>
                Denuncia: {denuncia.denuncia}
                {/* Eliminar siempre visible */}
                <Button
                  variant="danger"
                  onClick={() => handleEliminarDenuncia(denuncia.id)}
                  style={{ marginLeft: "1rem" }}
                >
                  Eliminar denuncia
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Collapse>
      </Card.Body>
    </Card>
  );
}
