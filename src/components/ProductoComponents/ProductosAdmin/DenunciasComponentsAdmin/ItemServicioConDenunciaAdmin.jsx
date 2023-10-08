import React, { useState } from "react";
import { Card, ListGroup, Form, Button, Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import { useServicios } from "../../../ServicioComponents/ServiciosContext/ServicioProvider";
export function ItemServicioConDenunciaAdmin({
  servicio,
  onDeleteDenunciaServicio,
}) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [denunciasVisible, setDenunciasVisible] = useState(false);
  const { actualizarDenunciaRevisadaServicio } = useServicios();
  const handleToggleDenunciasVisible = () => {
    setDenunciasVisible(!denunciasVisible);
  };

  const handleRevisarDenuncia = async (denunciaId) => {
    try {
      await actualizarDenunciaRevisadaServicio(denunciaId);
      Swal.fire(
        "Denuncia revisada",
        "La denuncia ha sido marcada como revisada correctamente",
        "success"
      );
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "Ha ocurrido un error al marcar la denuncia como revisada",
        "error"
      );
    }
  };

  const handleEliminarDenuncia = async (denunciaId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la denuncia del servicio permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await onDeleteDenunciaServicio(denunciaId);
          Swal.fire(
            "Denuncia eliminada",
            "La denuncia del servicio ha sido eliminada correctamente",
            "success"
          );
        } catch (error) {
          console.error(error);
          Swal.fire(
            "Error",
            "Ha ocurrido un error al eliminar la denuncia del servicio",
            "error"
          );
        }
      }
    });
  };

  return (
    <div>
      <React.Fragment>
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
              &nbsp; ({servicio.denuncias.length})
            </Button>
            <br></br>
            <br></br>
            <Collapse in={denunciasVisible}>
              <ListGroup variant="flush" id="preguntas-collapse">
                {servicio.denuncias.map((denuncia) => (
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
                      <div style={{ fontWeight: "bold" }}>
                        Denuncia hecha por ID:{" "}
                      </div>
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
                      <div>
                        {new Date(denuncia.createdAt).toLocaleDateString(
                          "es-ES",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          }
                        )}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="items">
                      <div style={{ fontWeight: "bold" }}>
                        Ya ha sido revisada:{" "}
                      </div>
                      &nbsp;&nbsp;
                      <div>{denuncia.revisar ? "SI" : "NO"}</div>
                    </ListGroup.Item>

                    <div className="contBotones">
                      <Button
                        variant="danger"
                        className="btnEliminar"
                        onClick={() => handleEliminarDenuncia(denuncia.id)}
                      >
                        Eliminar
                      </Button>
                      {!denuncia.revisar && (
                        <Button
                          className="btnRevisada"
                          onClick={() => handleRevisarDenuncia(denuncia.id)}
                        >
                          Revisada
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </ListGroup>
            </Collapse>
          </Card.Body>
        </Card>
      </React.Fragment>
      <br></br>
    </div>
  );
}
