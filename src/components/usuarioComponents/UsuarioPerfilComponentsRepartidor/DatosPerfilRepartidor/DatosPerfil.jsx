import React, { useState, useEffect } from "react";
import { Modal } from "../../../ModalComponents/Modal";
import { FormEditarPerfil } from "./FormEditarPerfil";

import { Card } from "react-bootstrap";
import { useUsuarios } from "../../UsuariosContext/UsuarioProvider";

export function DatosPerfil() {
  const [modalVisible, setModalVisible] = useState(false);
  const { obtenerInfoPerfil } = useUsuarios();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [perfil, setPerfil] = useState(null);

  const cargarPerfil = async () => {
    try {
      const perfilData = await obtenerInfoPerfil(usuario.id);
      console.log(perfilData);
      setPerfil(perfilData);
    } catch (error) {
      console.error(error);
      // Manejar el error en caso de que ocurra
    }
  };

  useEffect(() => {
    cargarPerfil();
  }, []);

  const handleEditarPerfilClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = () => {
    handleCloseModal();
    cargarPerfil();
  };

  return (
    <div>
      <h2>Información de la cuenta</h2>
      {perfil && (
        <Card style={{ width: "auto" }}>
          <Card.Body>
            <div>
              <label>ID:</label>
              <p>{perfil.id}</p>
            </div>
            <div>
              <label>Nombre:</label>
              <p>{perfil.nombre}</p>
            </div>
            <div>
              <label>Apellido Paterno:</label>
              <p>{perfil.apellidoPaterno}</p>
            </div>
            <div>
              <label>Apellido Materno:</label>
              <p>{perfil.apellidoMaterno}</p>
            </div>
            <div>
              <label>Email:</label>
              <p>{perfil.email}</p>
            </div>
            <div>
              <label>Sexo:</label>
              <p>{perfil.sexo}</p>
            </div>
            <div>
              <label>Fecha de nacimiento:</label>
              <p>{perfil.fechaNacimiento}</p>
            </div>
            <div>
              <label>Teléfono:</label>
              <p>{perfil.telefono}</p>
              <button onClick={handleEditarPerfilClick}>Editar información</button>
            </div>
          </Card.Body>
        </Card>
      )}

      {modalVisible && (
        <Modal isOpen={modalVisible} onClose={handleCloseModal}>
          <FormEditarPerfil
            onSubmit={handleSubmit}
            nombre={perfil ? perfil.nombre : ""}
            apellidoPaterno={perfil ? perfil.apellidoPaterno : ""}
            apellidoMaterno={perfil ? perfil.apellidoMaterno : ""}
            fechaNacimiento={perfil ? perfil.fechaNacimiento : ""}
            telefono={perfil ? perfil.telefono : ""}
            sexo={perfil ? perfil.sexo : ""}
          />
        </Modal>
      )}
    </div>
  );
}
