import React, { useState } from "react";
import { Modal } from "../../../ModalComponents/Modal";
import { FormEditarNombreCompleto } from "./FormEditarNombreCompleto";
import { FormEditarTelefono } from "./FormEditarTelefono";
import { FormEditarFechaNacimiento } from "./FormEditarFechaNacimiento";
import { FormEditarEmail } from "./FormEditarEmail";
import { FormEditarSexo } from "./FormEditarSexo";
import { Card } from "react-bootstrap";
export function DatosPerfil() {
  const [modalNombreCompletoVisible, setModalNombreCompletoVisible] =
    useState(false);
  const [modalEmailVisible, setModalEmailVisible] = useState(false);
  const [modalFechaNacimientoVisible, setModalFechaNacimientoVisible] =
    useState(false);
  const [modalSexoVisible, setModalSexoVisible] = useState(false);
  const [modalTelefonoVisible, setModalTelefonoVisible] = useState(false);
  const nombre = "Nombre";
  const apellidoPaterno = "Apellido Paterno";
  const apellidoMaterno = "Apellido Materno";
  const email = "ejemplo@correo.com";
  const sexo = "Masculino";
  const fechaNacimiento = "01/01/2000";
  const telefono = "1234567890";

  const handleEditarNombreCompletoClick = () => {
    setModalNombreCompletoVisible(true);
  };
  const handleEditarEmailClick = () => {
    setModalEmailVisible(true);
  };
  const handleEditarSexoClick = () => {
    setModalSexoVisible(true);
  };
  const handleEditarFechaNacimientoClick = () => {
    setModalFechaNacimientoVisible(true);
  };
  const handleEditarTelefonoClick = () => {
    setModalTelefonoVisible(true);
  };
  const handleCloseModal = () => {
    setModalNombreCompletoVisible(false);
    setModalEmailVisible(false);
    setModalSexoVisible(false);
    setModalFechaNacimientoVisible(false);
    setModalTelefonoVisible(false);
  };

  const handleSubmit = () => {
    handleCloseModal();
  };

  return (
    <div>
      <h2>Información de la cuenta</h2>
      <Card style={{ width: "auto" }}>
        <Card.Body>
          <div>
            <label>Nombre:</label>
            <p>{nombre}</p>
          </div>
          <div>
            <label>Apellido Paterno:</label>
            <p>{apellidoPaterno}</p>
          </div>
          <div>
            <label>Apellido Materno:</label>
            <p>{apellidoMaterno}</p>

            <button onClick={handleEditarNombreCompletoClick}>Editar</button>
          </div>
        </Card.Body>
      </Card>{" "}
      <Card style={{ width: "auto" }}>
      <Card.Body>
        <div>
          <label>Email:</label>
          <p>{email}</p>
          <button onClick={handleEditarEmailClick}>Editar</button>
        </div>
        </Card.Body>
      </Card>
      <Card style={{ width: "auto" }}>
      <Card.Body>
        <div>
          <label>Sexo:</label>
          <p>{sexo}</p>
          <button onClick={handleEditarSexoClick}>Editar</button>
        </div>
        </Card.Body>
      </Card>
      <Card style={{ width: "auto" }}>
      <Card.Body>
        <div>
          <label>Fecha de nacimiento:</label>
          <p>{fechaNacimiento}</p>
          <button onClick={handleEditarFechaNacimientoClick}>Editar</button>
        </div>
        </Card.Body>
      </Card>

      <Card style={{ width: "auto" }}>
      <Card.Body>
        <div>
          <label>Teléfono:</label>
          <p>{telefono}</p>
          <button onClick={handleEditarTelefonoClick}>Editar</button>
        </div>
        </Card.Body>
      </Card>
      {/* Modal para editar onSubmit={handleSubmit} */}
      {modalNombreCompletoVisible && (
        <Modal isOpen={modalNombreCompletoVisible} onClose={handleCloseModal}>
          <FormEditarNombreCompleto
            onSubmit={handleSubmit}
            nombre={nombre}
            apellidoPaterno={apellidoPaterno}
            apellidoMaterno={apellidoMaterno}
          />
        </Modal>
      )}
      {/* Modal para editar */}
      {modalEmailVisible && (
        <Modal isOpen={modalEmailVisible} onClose={handleCloseModal}>
          <FormEditarEmail onSubmit={handleSubmit} email={email} />
        </Modal>
      )}
      {/* Modal para editar */}
      {modalFechaNacimientoVisible && (
        <Modal isOpen={modalFechaNacimientoVisible} onClose={handleCloseModal}>
          <FormEditarFechaNacimiento
            onSubmit={handleSubmit}
            fechaNacimiento={fechaNacimiento}
          />
        </Modal>
      )}
      {/* Modal para editar */}
      {modalSexoVisible && (
        <Modal isOpen={modalSexoVisible} onClose={handleCloseModal}>
          <FormEditarSexo onSubmit={handleSubmit} sexo={sexo} />
        </Modal>
      )}
      {/* Modal para editar */}
      {modalTelefonoVisible && (
        <Modal isOpen={modalTelefonoVisible} onClose={handleCloseModal}>
          <FormEditarTelefono onSubmit={handleSubmit} telefono={telefono} />
        </Modal>
      )}
    </div>
  );
}
