//Este archivo se utiliza para mostrar el panel de bienvenida en el dashboard de un administrador

import "../../pages/DashAdminPages/DashAdmin.css";
import Card from "react-bootstrap/Card";

export function ContentAdmin() {
  // Obtener los datos del usuario desde el almacenamiento local para mostrar el nombre de usuario
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <div className="textoBienvenida">
      <Card style={{ width: "auto" }}>
        <Card.Body>
          <Card.Title style={{fontSize: "35px"}}>Dashboard de administrador</Card.Title>
          <br></br>
          <Card.Subtitle className="mb-2 text-muted" style={{fontSize: "27px"}}>
            Bienvenido administrador: &nbsp;{" "}
            {usuario.nombre +
              " " +
              usuario.apellidoPaterno +
              " " +
              usuario.apellidoMaterno}
            </Card.Subtitle>
            <br></br>
            {/*Se utiliza una card para mostrar una descripcion de lo que se puede realizar dentro de este dashboard*/}
            <Card.Text style={{fontSize: "24px"}}>
            Desde esta plataforma de administración, usted podrá gestionar de
            manera integral los distintos aspectos que conforman el sistema.
            <br></br>
            <br></br>
            Tendrá la capacidad de administrar a todos los usuarios del sistema,
            así como también a los productos, servicios y categorías que se
            encuentren registrados en la plataforma. Podrá visualizar las
            compras realizadas por usted mismo y gestionar sus respectivos
            pedidos que tenga de sus clientes. Asimismo, podrá procesar y
            administrar las órdenes de venta que se generen a través del
            sistema.
            <br></br>
            Además, esta plataforma le permitirá editar la información de su
            perfil y revisar las preguntas que los usuarios han realizado acerca
            de los productos y servicios ofrecidos. Así también, se le brindará
            acceso a estadísticas detalladas para analizar la performance del
            sistema en distintas áreas y tomar decisiones informadas en función
            de los datos recolectados.
            </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
