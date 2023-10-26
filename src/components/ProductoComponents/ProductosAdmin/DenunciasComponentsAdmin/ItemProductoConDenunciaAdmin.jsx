import React, { useState } from "react";
import { Card, ListGroup, Form, Button, Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import { useProductos } from "../../ProductosContext/ProductoProvider";

// Componente para mostrar un elemento de producto con denuncia en la interfaz de administrador
export function ItemProductoConDenunciaAdmin({ producto, onDeleteDenuncia }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [denunciasVisible, setDenunciasVisible] = useState(false);
  const { actualizarDenunciaRevisada } = useProductos();

  // Maneja el colapso de las denuncias
  const handleToggleDenunciasVisible = () => {
    setDenunciasVisible(!denunciasVisible);
  };

  // Marca una denuncia como revisada
  const handleRevisarDenuncia = async (denunciaId) => {
    try {
      await actualizarDenunciaRevisada(denunciaId);
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

  // Elimina una denuncia
  const handleEliminarDenuncia = async (denunciaId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la denuncia del producto permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await onDeleteDenuncia(denunciaId);
          Swal.fire(
            "Denuncia eliminada",
            "La denuncia ha sido eliminada correctamente",
            "success"
          );
        } catch (error) {
          console.error(error);
          Swal.fire(
            "Error",
            "Ha ocurrido un error al eliminar la denuncia",
            "error"
          );
        }
      }
    });
  };

  return (
    <div>
      <Card key={producto.id}>
        <Card.Header>
          <Link
            to={`/dashAdmin/productos/detalles/${producto.producto.id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="tituloCard">
              ID: {producto.producto.id} - {producto.producto.nombre}
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
            &nbsp; ({producto.denuncias.length})
          </Button>
          <br></br>
          <br></br>
          <Collapse in={denunciasVisible}>
            <ListGroup variant="flush" id="preguntas-collapse">
              {producto.denuncias.map((denuncia) => (
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
                  <ListGroup.Item className="items">
                    {!denuncia.revisar && (
                      <Button
                        variant="success"
                        onClick={() => handleRevisarDenuncia(denuncia.id)}
                      >
                        Marcar como revisada
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      onClick={() => handleEliminarDenuncia(denuncia.id)}
                    >
                      Eliminar denuncia
                    </Button>
                  </ListGroup.Item>
                </div>
              ))}
            </ListGroup>
          </Collapse>
        </Card.Body>
      </Card>
    </div>
  );
}
