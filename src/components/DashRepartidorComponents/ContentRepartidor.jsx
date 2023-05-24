import "../../pages/DashRepartidorPages/DashRepartidor.css";
import Card from "react-bootstrap/Card";

export function ContentRepartidor() {
  /*Para mostrar el nombre de usuario */
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <div className="textoBienvenida">
      <Card style={{ width: "auto" }}>
        <Card.Body>
          <Card.Title style={{ fontSize: "35px" }}>
            Dashboard de Repartidor
          </Card.Title>
          <br></br>
          <Card.Subtitle
            className="mb-2 text-muted"
            style={{ fontSize: "27px" }}
          >
            Bienvenido, Repartidor: &nbsp;{" "}
            {usuario.nombre +
              " " +
              usuario.apellidoPaterno +
              " " +
              usuario.apellidoMaterno}
          </Card.Subtitle>
          <br></br>
          <Card.Text style={{ fontSize: "24px" }}>
            Desde esta plataforma de administración, podrás realizar las
            siguientes acciones como repartidor:
            <br></br>
            <br></br>- Observar la orden de compra y sus detalles: Tendrás
            acceso a la información detallada de las órdenes de compra que debes
            entregar. Podrás ver los productos o servicios adquiridos, las
            cantidades, direcciones de envío y cualquier otro detalle relevante.
            <br></br>- Detalles del envío: Podrás acceder a la información
            relacionada con la entrega, como la dirección de envío,
            instrucciones especiales del cliente y horarios preferidos.
            <br></br>- Cambiar el estado del envío: Tendrás la capacidad de
            actualizar el estado del envío en tiempo real. Podrás marcar el
            pedido como "en camino", "entregado" u otras opciones según
            corresponda.
            <br></br>
            
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
