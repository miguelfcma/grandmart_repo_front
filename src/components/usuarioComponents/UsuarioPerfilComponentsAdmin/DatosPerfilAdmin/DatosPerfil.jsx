import React, { useState } from "react";
import { Modal } from "../../../ModalComponents/Modal";
import { FormEditarPerfil } from "./FormEditarPerfil";
import { Card } from "react-bootstrap";
export function DatosPerfil() {
  const [modalVisible, setModalVisible] = useState(false);

  const nombre = "Nombre";
  const apellidoPaterno = "Apellido Paterno";
  const apellidoMaterno = "Apellido Materno";
  const email = "ejemplo@correo.com";
  const sexo = "Masculino";
  const fechaNacimiento = "01/01/2000";
  const telefono = "1234567890";

  const handleEditarPerfilClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
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

           
          </div>

          <div>
            <label>Sexo:</label>
            <p>{sexo}</p>
      
          </div>
          <div>
            <label>Fecha de nacimiento:</label>
            <p>{fechaNacimiento}</p>
           
          </div>

          <div>
            <label>Teléfono:</label>
            <p>{telefono}</p>
            <button onClick={handleEditarPerfilClick}>Editar</button>
          </div>
        </Card.Body>
      </Card>
 
      {modalVisible && (
        <Modal isOpen={modalVisible} onClose={handleCloseModal}>
          <FormEditarPerfil
            onSubmit={handleSubmit}
            nombre={nombre}
            apellidoPaterno={apellidoPaterno}
            apellidoMaterno={apellidoMaterno}
            fechaNacimiento={fechaNacimiento}
            telefono={telefono}
            sexo={sexo}
          />
        </Modal>
      )}
     
    </div>
  );
}
