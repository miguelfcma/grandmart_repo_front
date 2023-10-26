// Importación de los módulos necesarios desde rutas específicas
import { useParams, Link } from "react-router-dom";
import { Navbar, Container, Row, Col, Button } from "react-bootstrap";
import { ComprasFinal } from "../../../components/OrdenesComponents/OrdenesGeneral/ComprasFinal";

// Definición del componente ComprasFinalPage
export function ComprasFinalPage() {
  // Obtén el ID de la compra de los parámetros de la URL
  const { id } = useParams();

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Barra de navegación */}
      <Navbar>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              alt="e-commerce"
              src="https://firebasestorage.googleapis.com/v0/b/grandmart-51065.appspot.com/o/src%2Flogo.png?alt=media&token=6c393680-5c89-4708-a0d3-f8ffcb0fc379"
            />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {/* Aquí puedes agregar elementos de navegación si es necesario */}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        {/* Botones de navegación */}
        <Button
          as={Link}
          to="/"
          style={{ marginRight: "80px", marginTop: "20px" }}
          variant="outline-primary"
        >
          Ir a Página Principal
        </Button>
        <Button
          as={Link}
          to="/dashClient/compras"
          style={{ marginTop: "20px" }}
          variant="outline-primary"
        >
          Ver Compras
        </Button>
        <Row style={{ marginTop: "20px" }}>
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
            {/* Renderiza el componente ComprasFinal y pasa 'id' como propiedad */}
            <ComprasFinal id_orden={id} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
