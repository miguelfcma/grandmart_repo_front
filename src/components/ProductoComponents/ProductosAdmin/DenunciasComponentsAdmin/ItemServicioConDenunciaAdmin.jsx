import React, { useState, useEffect } from "react";
import { Card, ListGroup, Form, Button, Collapse } from "react-bootstrap";
import { useServicios } from "../../../ServicioComponents/ServiciosContext/ServicioProvider";
import "./ItemProducto.css";
import { Link } from "react-router-dom";
import { actualizarDenunciaARevisadaServicio } from "../../../../API/ServiciosApiRest/denunciasServicio.api";

export function ItemServicioConDenunciaAdmin({ servicio, onDeleteDenunciaServicio }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [denunciasVisible, setDenunciasVisible] = useState(false);

  const handleToggleDenunciasVisible = () => {
    setDenunciasVisible(!denunciasVisible);
  };

  const handleRevisarDenuncia = (denunciaId) => {
    console.log("Valor de denunciaId:", denunciaId);
    actualizarDenunciaARevisadaServicio(denunciaId);
  };

  const handleEliminarDenuncia = async (denunciaId) => {
    try {
      onDeleteDenunciaServicio(denunciaId);
    } catch (error) {
      console.error(error);
    }
  };

  const denunciasSinRevisar = servicio.denuncias.filter(
    (denuncia) => denuncia.revisar === false
  );

  const denunciasRevisadas = servicio.denuncias.filter(
    (denuncia) => denuncia.revisar === true
  );

  return (
    <div>
      <React.Fragment>
      {denunciasSinRevisar.length > 0 ? (
        <Card key={servicio.id}>
          <Card.Header>
            <Link
              to={`/dashAdmin/servicios/detalles/${servicio.servicio.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="tituloCard">
                ID: {servicio.servicio.id} - {servicio.servicio.titulo}
              </div>
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
                      <div style={{ fontWeight: "bold" }}>Denuncia hecha por ID: </div>
                      &nbsp;&nbsp;
                      <div>
                        {" "}
                        {denuncia.usuario.id} - {denuncia.usuario.nombre}{" "}
                        {denuncia.usuario.apellidoPaterno}{" "}
                        {denuncia.usuario.apellidoMaterno}{" "}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="items">
                      <div style={{ fontWeight: "bold" }}>ID Servicio: </div>
                      &nbsp;&nbsp;
                      <div>{denuncia.id_servicio}</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="items">
                      <div style={{ fontWeight: "bold" }}>
                        Propietario de la publicación ID:{" "}
                      </div>
                      &nbsp;&nbsp;
                      <div>
                        {" "}
                        {denuncia.usuarioServicio.id} -{" "}
                        {denuncia.usuarioServicio.nombre}{" "}
                        {denuncia.usuarioServicio.apellidoPaterno}{" "}
                        {denuncia.usuarioServicio.apellidoMaterno}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="items">
                      <div style={{ fontWeight: "bold" }}>Realizada: </div>
                      &nbsp;&nbsp;
                      <div>{denuncia.createdAt}</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="items">
                      <div style={{ fontWeight: "bold" }}>Ya ha sido revisada: </div>
                      &nbsp;&nbsp;
                      <div>{"NO"}</div>
                    </ListGroup.Item>

                    <div className="contBotones">
                    <Button
                      variant="danger"
                      className="btnEliminar"
                      onClick={() => handleEliminarDenuncia(denuncia.id)}
                    >
                      Eliminar
                    </Button>
                    <Button
                      className="btnRevisada"
                      onClick={() => handleRevisarDenuncia(denuncia.id)}
                    >
                      Revisada
                    </Button>
                    
                    </div>
                  </div>
                ))}
              </ListGroup>
            </Collapse>
          </Card.Body>
        </Card>
        ) : (
          <Card key={servicio.id}>
          <Card.Header>
            <Link
              to={`/dashAdmin/servicios/detalles/${servicio.servicio.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="tituloCard">
                ID: {servicio.servicio.id} - {servicio.servicio.titulo}
              </div>
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
              &nbsp; ({denunciasRevisadas.length})
            </Button>
            <br></br>
            <br></br>
            <Collapse in={denunciasVisible}>
              <ListGroup variant="flush" id="preguntas-collapse">
                {denunciasRevisadas.map((denuncia) => (
                  <div className="lineagruesa">
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
                      <div style={{ fontWeight: "bold" }}>Denuncia hecha por ID: </div>
                      &nbsp;&nbsp;
                      <div>
                        {" "}
                        {denuncia.usuario.id} - {denuncia.usuario.nombre}{" "}
                        {denuncia.usuario.apellidoPaterno}{" "}
                        {denuncia.usuario.apellidoMaterno}{" "}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="items">
                      <div style={{ fontWeight: "bold" }}>ID Servicio: </div>
                      &nbsp;&nbsp;
                      <div>{denuncia.id_servicio}</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="items">
                      <div style={{ fontWeight: "bold" }}>
                        Propietario de la publicación ID:{" "}
                      </div>
                      &nbsp;&nbsp;
                      <div>
                        {" "}
                        {denuncia.usuarioServicio.id} -{" "}
                        {denuncia.usuarioServicio.nombre}{" "}
                        {denuncia.usuarioServicio.apellidoPaterno}{" "}
                        {denuncia.usuarioServicio.apellidoMaterno}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="items">
                      <div style={{ fontWeight: "bold" }}>Realizada: </div>
                      &nbsp;&nbsp;
                      <div>{denuncia.createdAt}</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="items">
                      <div style={{ fontWeight: "bold" }}>Ya ha sido revisada: </div>
                      &nbsp;&nbsp;
                      <div>{"SI"}</div>
                    </ListGroup.Item>

                    <div className="contBotones">
                    <Button
                      variant="danger"
                      className="btnEliminar"
                      onClick={() => handleEliminarDenuncia(denuncia.id)}
                    >
                      Eliminar
                    </Button>
                    
                    </div>
                  </div>
                ))}
              </ListGroup>
            </Collapse>
          </Card.Body>
        </Card>
        )}
      </React.Fragment>
      <br></br>
    </div>
  );
}
