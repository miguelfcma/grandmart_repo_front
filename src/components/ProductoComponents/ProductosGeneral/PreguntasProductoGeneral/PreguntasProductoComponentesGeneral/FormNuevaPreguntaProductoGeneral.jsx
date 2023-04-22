import { crearPreguntaProductoRequest } from "../../../../../API/ProductosApiRest/preguntasProducto.api";
import { useProductos } from "../../../ProductosContext/ProductoProvider";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./FormNuevaPreguntaProductoGeneral.css"
export function FormNuevaPreguntaProductoGeneral({id_producto,actualizarPreguntas}) {
  const { crearPreguntaProducto } = useProductos();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [pregunta, setPregunta] = useState({
    pregunta: "",
    id_producto: id_producto,
    id_usuario: usuario.id,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (pregunta.pregunta.trim() === "") {
      setError("La pregunta no puede estar vacía.");
      return;
    }

    try {
        console.log(pregunta)
      const res = await crearPreguntaProducto(pregunta);
      setPregunta({
        pregunta: "",
        id_producto: id_producto,
        id_usuario: usuario.id,
      });
      actualizarPreguntas()
      alert("La pregunta fue creada exitosamente.");
    } catch (error) {
      alert("Ocurrió un error al crear la pregunta.");
    }
  };

  return (
    <div className="nueva-pregunta-container">
      <h2>Nueva Pregunta de Producto</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPregunta">
          <Form.Label>Pregunta:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Escribe aquí tu pregunta"
            value={pregunta.pregunta}
            onChange={(event) =>
              setPregunta({ ...pregunta, pregunta: event.target.value })
            }
            required
          />
        </Form.Group>

        <Button type="submit" className="btn-azul">
          Crear Pregunta
        </Button>
      </Form>
    </div>
  );
}
