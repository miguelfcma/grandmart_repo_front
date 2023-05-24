import { useParams } from "react-router-dom";

import { Navbar, Container, Row, Col } from "react-bootstrap";
import { ComprasFinal } from "../../../components/OrdenesComponents/OrdenesGeneral/ComprasFinal";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";

export function ComprasFinalPage() {
  const { id } = useParams(); // Obtén el ID de la compra de los parámetros de la URL

  return (
    <div style={{ paddingTop: "80px" }}>
      <Navbar1/>
      <Container>
        <Row>
          <Col>
            <h1>Tu compra ha sido exitosa, gracias por elegir GrandMart Marketplace</h1>
            <h2>Este es el ID de tu orden de compra: {id}</h2>
            <p>Da clic en este botón para enviar un mensaje de WhatsApp para conocer más detalles del envío:</p>
            <ComprasFinal id_orden={id} /> 
          </Col>
        </Row>
      </Container>
    </div>
  );
}
