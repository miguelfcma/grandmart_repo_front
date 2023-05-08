import { crearDenunciaProductoRequest } from "../../../../../API/ProductosApiRest/denunciasProducto.api";
import { useProductos } from "../../../ProductosContext/ProductoProvider";
import { Form, Button, Card } from "react-bootstrap";
import "./Form2.css";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FooterHome } from "../../../../HomePageComponents/FooterHome";
import InputGroup from "react-bootstrap/InputGroup";

export function Form2NuevaDenunciaProductoGeneral({
  id_producto, actualizarDenuncias }) {
  window.scrollTo(0, 0); //Para que se muestre el producto desde arriba de la página
  const { crearDenunciaProducto } = useProductos();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [descripcion, setDescripcion] = useState({
    descripcion: "",
    id_producto: id_producto,
    id_usuario: usuario.id,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (descripcion.descripcion.trim() === "") {
      setError("La descripcion no puede estar vacía.");
      return;
    }
    try {
      console.log(descripcion);
      const res = await crearDenunciaProducto(descripcion);
      setDescripcion({
        descripcion: "",
        id_producto: id_producto,
        id_usuario: usuario.id,
      });
      actualizarDenuncias();
      alert("La denuncia fue creada exitosamente.");
    } catch (error) {
      alert("Ocurrió un error al crear la denuncia.");
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/">
            <img
              alt="e-commerce"
              src="https://firebasestorage.googleapis.com/v0/b/grandmart-51065.appspot.com/o/src%2Flogo.png?alt=media&token=6c393680-5c89-4708-a0d3-f8ffcb0fc379"
            />
          </a>
        </div>
      </nav>
      <div className="background2">
        <Card className="cardDenuncia2">
          <Card.Title className="tituloDenuns2">
            ¿Por qué quieres reportar la publicación?
          </Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="txtDenuns">
                Cuéntanos más sobre el motivo de tu denuncia:
              </Form.Label>
              <InputGroup>
                <Form.Control
                  as="textarea"
                  aria-label="With textarea"
                  className="txtArea"
                  type="text"
                  placeholder="Escribe aquí los detalles de tu denuncia..."
                  value={descripcion.descripcion}
                  onChange={(event) =>
                    setDescripcion({ ...descripcion, descripcion: event.target.value })
                  }
                  required
                />
              </InputGroup>
            </Form.Group>
            <br></br>
            <Button type="submit" className="btn-azul">
              Enviar
            </Button>
          </Form>
          <br></br>
        </Card>
      </div>
      <div className="footerDenuncia2">
        <FooterHome />
      </div>
    </div>
  );
}
