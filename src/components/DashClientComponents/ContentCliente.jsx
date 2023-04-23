import "../../pages/DashClientPages/DashClient.css";
import Card from "react-bootstrap/Card";

export function ContentCliente() {
  /*Para mostrar el nombre de usuario */
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <div className="textoBienvenida">
      <Card style={{ width: "auto" }}>
        <Card.Body>
          <Card.Title style={{fontSize: "35px"}}>Dashboard</Card.Title>
          <br></br>
          <Card.Subtitle className="mb-2 text-muted" style={{fontSize: "27px"}}>
            Bienvenido: &nbsp;{" "}
            {usuario.nombre +
              " " +
              usuario.apellidoPaterno +
              " " +
              usuario.apellidoMaterno}
            </Card.Subtitle>
            <br></br>
            <Card.Text style={{fontSize: "24px"}}>
            Desde este apartado, usted podrá gestionar de
            manera integral los distintos aspectos que conforman su perfil.
            <br></br>
            <br></br>
            Tendrá la capacidad de gestionar todos los productos y servicios que ofrezca para los clientes.
            <br></br>
            Podrá visualizar las compras realizadas por usted mismo y gestionar sus respectivos pedidos que tenga de sus clientes.
            <br></br>
            Además, esta plataforma le permitirá editar la información de su perfil y revisar las preguntas que los usuarios han realizado acerca de los productos y servicios ofrecidos. Así también, podrá observar las estadísticas acerca de sus datos dentro del sistema.
            </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
