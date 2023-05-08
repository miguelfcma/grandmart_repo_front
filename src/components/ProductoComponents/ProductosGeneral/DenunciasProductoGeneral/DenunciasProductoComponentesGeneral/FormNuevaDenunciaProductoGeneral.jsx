import { useProductos } from "../../../ProductosContext/ProductoProvider";
import { Form, Button, Card, Accordion } from "react-bootstrap";
import "./FormNuevaDenunciaProductoGeneral.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FooterHome } from "../../../../HomePageComponents/FooterHome";
import { useParams } from "react-router-dom";

export function FormNuevaDenunciaProductoGeneral() {
  window.scrollTo(0, 0); //Para que se muestre desde arriba la página
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const { id_producto } = useParams();
  console.log(id_producto);

  const [motivoSeleccionado, setMotivoSeleccionado] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("motivo", motivoSeleccionado);
    console.log(formData);
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
      <div className="background">
        <Card className="cardDenuncia">
          <Card.Title className="tituloDenuns">
            ¿Por qué quieres reportar la publicación?
          </Card.Title>

          <div className="ms-2 me-auto" style={{ color: "black" }}>
            <Form onSubmit={handleSubmit}>
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <Form.Check
                    type="radio"
                    name="motivo"
                    id="motivo1"
                    label="El producto genera dudas acerca de su legalidad o no transmite la confianza necesaria."
                    style={{className: "motivosDenuns"}}
                    onChange={(e) =>
                      setMotivoSeleccionado({
                        ...motivoSeleccionado,
                        motivo: e.target.labels[0].innerText,
                      })
                    }
                  />
                </Accordion.Header>
                <Accordion.Body className="detallesDenuns">
                  Se prohibe ofrecer productos o servicios que generen cierta
                  desconfianza o que puedan vulnerar la seguridad de los
                  usuarios.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <Form.Check type="radio" name="denuncia" />
                  <div className="motivosDenuns">
                    Utiliza datos de contacto en las respuestas o publicaciones.
                  </div>
                </Accordion.Header>
                <Accordion.Body className="detallesDenuns">
                  Incluir en la publicación algún dato personal o información de
                  contacto.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  <Form.Check type="radio" name="denuncia" />
                  <div className="motivosDenuns">
                    Tiene contenido ofensivo, obsceno o discriminatorio.
                  </div>
                </Accordion.Header>
                <Accordion.Body className="detallesDenuns">
                  Se prohibe publicar agresiones o utilizar lenguaje vulgar
                  tanto en el contenido de las publicaciones como en los
                  apartados de preguntas y respuestas. Incluir contenido
                  discriminatorio.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  <Form.Check type="radio" name="denuncia" />
                  <div className="motivosDenuns">
                    Quiere cobrar un precio diferente o hay incoherencias con el
                    precio y los productos de la publicación.
                  </div>
                </Accordion.Header>
                <Accordion.Body className="detallesDenuns">
                  Se prohibe ofrecer un artículo en forma gratuita o a un valor
                  simbólico o precio significativamente diferente al valor de
                  mercado.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header>
                  <Form.Check type="radio" name="denuncia" />
                  <div className="motivosDenuns">
                    Vende una copia o falsificación
                  </div>
                </Accordion.Header>
                <Accordion.Body className="detallesDenuns">
                  Se prohibe publicar productos falsificados que incluyan una
                  marca de un tercero y que no hayan sido fabricados o
                  autorizados por sus titulares. Hacer referencia a otras marcas
                  para describir un producto utilizando palabras como: “símil”,
                  “tipo” o “réplica”.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6">
                <Accordion.Header>
                  <Form.Check type="radio" name="denuncia" />
                  <div className="motivosDenuns">
                    Induce en la publicación o en sus respuestas a que se
                    realicen acciones que pueden ser fraudulentas.
                  </div>
                </Accordion.Header>
                <Accordion.Body className="detallesDenuns">
                  Se prohibe el uso de cualquier mecanismo destinado a evitar o
                  disminuir los efectos de los Programas, Beneficios y otros
                  Sistemas de protección incluidos en el Sitio Web. Inducir al
                  usuario comprador a que no inicie un reclamo.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="7">
                <Accordion.Header>
                  <Form.Check type="radio" name="denuncia" />
                  <div className="motivosDenuns">
                    Publica con envío gratis, pero luego quiere cobrarme el
                    servicio.
                  </div>
                </Accordion.Header>
                <Accordion.Body className="detallesDenuns">
                  Se prohibe publicar envío gratis y no asumir todos los costos
                  relacionados con el envío del producto.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            </Form>
          </div>
          <br></br>

          <Link to="/denuncia/producto/:id_producto/detalles">
            <Button type="submit">Siguiente</Button>
          </Link>

          <br></br>
        </Card>
      </div>
      <div className="footerDenuncia">
        <FooterHome />
      </div>
    </div>
  );
}
