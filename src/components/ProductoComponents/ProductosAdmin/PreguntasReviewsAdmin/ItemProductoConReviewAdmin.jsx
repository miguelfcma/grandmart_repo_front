import React, { useState } from "react";
import { Card, ListGroup, Form, Button, Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";

export function ItemProductoConReviewAdmin({ producto, onDeleteReview }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [reviewsVisible, setReviewsVisible] = useState(false);
  

  console.log(producto);
  const handleToggleReviewsVisible = () => {
    setReviewsVisible(!reviewsVisible);
  };

  const handleEliminarReview = (reviewId) => {
    try {
      onDeleteReview(reviewId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <React.Fragment>
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
              onClick={handleToggleReviewsVisible}
              aria-controls="preguntas-collapse"
              aria-expanded={reviewsVisible}
            >
              {reviewsVisible ? "Ocultar reviews" : "Mostrar reviews"}
              &nbsp; ({producto.reviews.length})
            </Button>
            <br></br>
            <br></br>
            <Collapse in={reviewsVisible}>
              <ListGroup variant="flush" id="preguntas-collapse">
                {producto.reviews.map((review) => {
                  console.log("Holas",review);
                  return (
                    <div className="lineagruesa">
                      <ListGroup.Item key={review.id} className="items">
                        <div style={{ fontWeight: "bold" }}>ID de review: </div>
                        &nbsp;&nbsp;
                        <div>{review.id}</div>
                      </ListGroup.Item>
                      <ListGroup.Item className="items">
                        <div style={{ fontWeight: "bold" }}>Título: </div>
                        &nbsp;&nbsp;
                        <div>{review.titulo}</div>
                      </ListGroup.Item>
                      <ListGroup.Item className="items">
                        <div style={{ fontWeight: "bold" }}>Comentario: </div>
                        &nbsp;&nbsp;
                        <div style={{ textAlign: "justify" }}>
                          {review.comentario}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="items">
                        <div style={{ fontWeight: "bold" }}>ID Producto: </div>
                        &nbsp;&nbsp;
                        {/* <div>{review.producto.id}</div> */}
                      </ListGroup.Item>
                      <ListGroup.Item className="items">
                        <div style={{ fontWeight: "bold" }}>Realizada: </div>
                        &nbsp;&nbsp;
                        <div>{review.createdAt}</div>
                      </ListGroup.Item>
                      <ListGroup.Item className="items">
                        <div style={{ fontWeight: "bold" }}>Calificación:</div>
                        &nbsp;&nbsp;
                        <div>{review.calificacion}</div>
                      </ListGroup.Item>

                      <div className="contBotones">
                        <Button
                          variant="danger"
                          className="btnEliminar"
                          onClick={() => handleEliminarReview(review.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </ListGroup>
            </Collapse>
          </Card.Body>
        </Card>
      </React.Fragment>
      <br></br>
    </div>
  );
}
