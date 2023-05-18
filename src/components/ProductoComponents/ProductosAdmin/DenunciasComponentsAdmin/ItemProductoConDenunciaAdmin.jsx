import React, { useState, useEffect } from "react";
import { Card, ListGroup, Form, Button, Collapse } from "react-bootstrap";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import "./ItemProducto.css";
import { Link } from "react-router-dom";
import { actualizarDenunciaARevisada } from "../../../../API/ProductosApiRest/denunciasProducto.api";

export function ItemProductoConDenunciaAdmin({ producto, onDeleteDenuncia }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [denunciasVisible, setDenunciasVisible] = useState(false);

  const handleToggleDenunciasVisible = () => {
    setDenunciasVisible(!denunciasVisible);
  };

  const handleRevisarDenuncia = (denunciaId) => {
    console.log("Valor de denunciaId:", denunciaId);
    actualizarDenunciaARevisada(denunciaId);
  };

  const handleEliminarDenuncia = async (denunciaId) => {
    try {
      onDeleteDenuncia(denunciaId);
    } catch (error) {
      console.error(error);
    }
  };

  const denunciasSinRevisar = producto.denuncias.filter(
    (denuncia) => denuncia.revisar === false
  );

  console.log("Denuncias sin revisar:", denunciasSinRevisar);

  return (
    <div>
      <React.Fragment>
      {denunciasSinRevisar.length > 0 ? (
        <Card key={producto.id}>
          <Card.Header>
            <Link
              to={`/dashAdmin/productos/detalles/${producto.producto.id}`}
              style={{ textDecoration: "none" }}
            >
              <h2>
                ID: {producto.producto.id} - {producto.producto.nombre}
              </h2>
            </Link>
          </Card.Header>
          <Card.Body>
            <Button
              variant="primary"
              onClick={handleToggleDenunciasVisible}
              aria-controls="preguntas-collapse"
              aria-expanded={denunciasVisible}
            >
              {denunciasVisible ? "Ocultar denuncias" : "Mostrar denuncias"}
              &nbsp; ({denunciasSinRevisar.length})
            </Button>
            <br></br>
            <br></br>
            <Collapse in={denunciasVisible}>
              <ListGroup variant="flush" id="preguntas-collapse">
                {denunciasSinRevisar.map((denuncia) => (
                  <div className="lineagruesa">
                    <Button
                      className="btnRevisada"
                      onClick={() => handleRevisarDenuncia(denuncia.id)}
                    >
                      Revisada
                    </Button>
                    <ListGroup.Item className="items">
                      <div style={{ fontWeight: "bold" }}>ID de denuncia: </div>
                      &nbsp;&nbsp;
                      <div>{denuncia.id}</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="items">
                      <div style={{ fontWeight: "bold" }}>Motivo: </div>
                      &nbsp;&nbsp;
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
                      <div style={{ fontWeight: "bold" }}>Por ID: </div>
                      &nbsp;&nbsp;
                      <div>
                        {" "}
                        {denuncia.usuario.id} - {denuncia.usuario.nombre}{" "}
                        {denuncia.usuario.apellidoPaterno}{" "}
                        {denuncia.usuario.apellidoMaterno}{" "}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="items">
                      <div style={{ fontWeight: "bold" }}>ID Producto: </div>
                      &nbsp;&nbsp;
                      <div>{denuncia.id_producto}</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="items">
                      <div style={{ fontWeight: "bold" }}>
                        Propietario de la publicación ID:{" "}
                      </div>
                      &nbsp;&nbsp;
                      <div>
                        {" "}
                        {denuncia.usuarioProducto.id} -{" "}
                        {denuncia.usuarioProducto.nombre}{" "}
                        {denuncia.usuarioProducto.apellidoPaterno}{" "}
                        {denuncia.usuarioProducto.apellidoMaterno}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="items">
                      <div style={{ fontWeight: "bold" }}>Realizada: </div>
                      &nbsp;&nbsp;
                      <div>{denuncia.createdAt}</div>
                    </ListGroup.Item>
                    <Button
                      className="btnEliminar"
                      onClick={() => handleEliminarDenuncia(denuncia.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                ))}
              </ListGroup>
            </Collapse>
          </Card.Body>
        </Card>
        ) : (
          <p>Revisadas</p>
        )}
      </React.Fragment>
    </div>
  );
}
