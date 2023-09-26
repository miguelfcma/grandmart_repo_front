import React, { useState } from "react";
import "../../pages/DashClientPages/DashClient.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import { BsInfoCircle } from "react-icons/bs";

export function ContentCliente() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const numeroVentas = 120; // Ejemplo de número de ventas, puedes obtenerlo de tus datos reales
  const numeroCompras = 50; // Ejemplo de número de compras realizadas
  const numeroPreguntas = 10; // Ejemplo de número de preguntas

  const totalProductosPublicados = 30; // Ejemplo de total de productos publicados
  const totalServiciosOfrecidos = 15; // Ejemplo de total de servicios ofrecidos

  return (
    <div className="textoBienvenida">
      <Card style={{ width: "auto" }}>
        <Card.Body>
          <Card.Title style={{ fontSize: "35px" }}>Dashboard</Card.Title>
          <br />
          <Card.Subtitle
            className="mb-2 text-muted"
            style={{ fontSize: "27px" }}
          >
            Bienvenido: &nbsp;{" "}
            {usuario.nombre +
              " " +
              usuario.apellidoPaterno +
              " " +
              usuario.apellidoMaterno}
          </Card.Subtitle>
          <br />

          <div className="dashboard-section">
            <div className="dashboard-info">
              <Button
                variant="light"
                className="info-button"
                onClick={openModal}
              >
                <BsInfoCircle /> Información del Dashboard
              </Button>
            </div>

            <div className="sales-metric">
              <h4>Ventas</h4>
              <p>
                Total de Ventas: <Badge variant="primary">{numeroVentas}</Badge>
              </p>
            </div>

            <div className="notifications">
              <h4>Notificaciones</h4>
              <ul>
                <li>
                  <BsInfoCircle /> {numeroPreguntas} nuevas preguntas
                </li>
                <li>
                  <BsInfoCircle /> {numeroPreguntas} nuevas opiniones
                </li>
              </ul>
            </div>

            <div className="profile-data">
              <h4>Datos de Perfil</h4>
              <p>Total de Productos Publicados: {totalProductosPublicados}</p>
              <p>Total de Servicios Ofrecidos: {totalServiciosOfrecidos}</p>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Información del Dashboard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
            Desde este apartado, usted podrá gestionar de manera integral los
            distintos aspectos que conforman su perfil.
            <br></br>
            <br></br>
            Tendrá la capacidad de gestionar todos los productos y servicios que
            ofrezca para los clientes.
            <br></br>
            Podrá visualizar las compras realizadas por usted mismo y gestionar
            sus respectivos pedidos que tenga de sus clientes.
            <br></br>
            Además, esta plataforma le permitirá editar la información de su
            perfil y revisar las preguntas que los usuarios han realizado acerca
            de los productos y servicios ofrecidos. Así también, podrá observar
            las estadísticas acerca de sus datos dentro del sistema.
       
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
