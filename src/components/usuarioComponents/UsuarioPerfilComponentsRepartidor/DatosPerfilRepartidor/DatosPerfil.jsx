import React, { useState, useEffect } from "react";
import { Modal } from "../../../ModalComponents/Modal";
import { FormEditarPerfil } from "./FormEditarPerfil";

import { Card } from "react-bootstrap";
import { useUsuarios } from "../../UsuariosContext/UsuarioProvider";
/**
 * Componente "DatosPerfil" muestra la información de la cuenta de usuario
 * y permite la edición de esta información a través de un modal. Los usuarios
 * pueden ver su ID, nombre, apellidos, email, sexo, fecha de nacimiento y teléfono.
 * Además, pueden editar esta información haciendo clic en el botón "Editar información".
 * Los cambios realizados en el modal de edición se reflejarán en la vista principal
 * de la información del perfil una vez confirmados.
 */

export function DatosPerfil() {
  // Estado para controlar la visibilidad del modal de edición de perfil
  const [modalVisible, setModalVisible] = useState(false);

  // Acceso a la función para obtener la información del perfil
  const { obtenerInfoPerfil } = useUsuarios();

  // Obtiene los datos del usuario actual del almacenamiento local
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Estado para almacenar la información del perfil
  const [perfil, setPerfil] = useState(null);

  // Función para cargar la información del perfil del usuario
  const cargarPerfil = async () => {
    try {
      const perfilData = await obtenerInfoPerfil(usuario.id);
      setPerfil(perfilData);
    } catch (error) {
      console.error(error);
      // Manejar el error en caso de que ocurra
    }
  };

  // Efecto que se ejecuta al cargar el componente para obtener la información del perfil
  useEffect(() => {
    cargarPerfil();
  }, []);

  // Maneja el clic en el botón "Editar información" para mostrar el modal de edición
  const handleEditarPerfilClick = () => {
    setModalVisible(true);
  };

  // Maneja el cierre del modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Maneja la confirmación de la edición del perfil
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
              <button onClick={handleEditarPerfilClick}>
                Editar información
              </button>
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
