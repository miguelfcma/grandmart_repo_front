//Este archivo se utiliza para mostrar el panel de bienvenida en el dashboard de un cliente

import React, { useState, useEffect } from "react";
import "../../pages/DashClientPages/DashClient.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import { BsInfoCircle } from "react-icons/bs";
import { getInformacionDash } from "../../API/UsuariosApiRest/usuarios.api";

export function ContentCliente() {
  // Obtener los datos del usuario desde el almacenamiento local para mostrar el nombre de usuario
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const [informacionDash, setInformacionDash] = useState({});

  useEffect(() => {
    const fetchInformacionDash = async () => {
      const informacion = await getInformacionDash(usuario.id);
      console.log(informacion);
      setInformacionDash(informacion.data);
    };

    fetchInformacionDash();
  }, []);

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
                Total de Ventas:{" "}
                <Badge variant="primary">{informacionDash.totalVentas}</Badge>
              </p>
            </div>

            <div className="notifications">
              <h4>Notificaciones</h4>
              <ul>
                <li>
                  <BsInfoCircle /> {informacionDash.totalPreguntas} nuevas
                  preguntas de productos
                </li>
                <li>
                  <BsInfoCircle /> {informacionDash.totalPreguntas2} nuevas
                  preguntas de servicios
                </li>
                <li>
                  <BsInfoCircle /> {informacionDash.totalReviews} nuevas
                  opiniones
                </li>
              </ul>
            </div>

            <div className="profile-data">
              <h4>Datos de Perfil</h4>
              <p>
                Total de Productos Publicados: {informacionDash.totalProductos}
              </p>
              <p>Total de Servicios Ofrecidos: {informacionDash.totalServicios}</p>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={closeModal} centered>
        {/*Se hace clic en el boton de informacion del dashboard para ver la descripcion de lo que se puede hacer desde este apartado*/}
        <Modal.Header closeButton>
          <Modal.Title>Información del Dashboard</Modal.Title>
        </Modal.Header>
        {/*Utilizando un modal para mostrar la descripcion de la explicacion del dashboard*/}
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
