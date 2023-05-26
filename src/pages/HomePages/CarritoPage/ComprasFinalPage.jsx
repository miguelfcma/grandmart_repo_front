import { useParams,Link } from "react-router-dom";

import { Navbar, Container, Row, Col } from "react-bootstrap";
import { ComprasFinal } from "../../../components/OrdenesComponents/OrdenesGeneral/ComprasFinal";

export function ComprasFinalPage() {
  const { id } = useParams(); // Obtén el ID de la compra de los parámetros de la URL

  return (
    <div style={{ paddingTop: "80px" }}>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/">
            <img
              alt="e-commerce"
              src="https://firebasestorage.googleapis.com/v0/b/grandmart-51065.appspot.com/o/src%2Flogo.png?alt=media&token=6c393680-5c89-4708-a0d3-f8ffcb0fc379"
            />
          </Link>
        </div>
      </nav>
      <Container>
        <Row>
          <Col>
            <h1>
              Tu compra ha sido exitosa, gracias por elegir GrandMart
              Marketplace
            </h1>
            <h2>Este es el ID de tu orden de compra: {id}</h2>
            <p>
              Da clic en este botón para enviar un mensaje de WhatsApp para
              conocer más detalles del envío:
            </p>
            <ComprasFinal id_orden={id} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
