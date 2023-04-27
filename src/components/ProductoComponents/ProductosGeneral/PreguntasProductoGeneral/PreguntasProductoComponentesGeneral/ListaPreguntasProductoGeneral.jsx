import React from "react";
import { useState, useEffect } from "react";
import { useProductos } from "../../../ProductosContext/ProductoProvider";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import "./ListaPreguntasProductoGeneral.css"; // Importa el archivo CSS con los estilos

export function ListaPreguntasProductoGeneral({ id_producto, actualizarPreguntas }) {
  const { getPreguntasByIdProducto } = useProductos();
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    const fetchPreguntas = async () => {
      const preguntasData = await getPreguntasByIdProducto(id_producto);
      setPreguntas(preguntasData || []);
    };
    fetchPreguntas();
  }, [id_producto, actualizarPreguntas]);

  return (
    <Container>
    <h2 className="titulo">Preguntas</h2>
    {preguntas && preguntas.length > 0 ? (
      <ListGroup className="lista-preguntas">
        {preguntas.map((pregunta) => (
          <ListGroup.Item key={pregunta.id} className="pregunta-item">
            <p className="pregunta">{pregunta.pregunta}</p>
            <div className="fecha">
              Pregunta realizada el:&nbsp;&nbsp;{new Date(pregunta.updatedAt).toLocaleDateString()}&nbsp;&nbsp;Por: {pregunta.usuario.nombre}
            </div>
            <br></br>
            <p className="respuesta">Respuesta: {pregunta.respuesta || "Sin respuesta"}</p> {/* Mensaje "Sin respuesta" en caso de respuesta vacía */}
           
          </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="no-preguntas">No hay preguntas para mostrar.</p>
      )}
    </Container>
  );
}
