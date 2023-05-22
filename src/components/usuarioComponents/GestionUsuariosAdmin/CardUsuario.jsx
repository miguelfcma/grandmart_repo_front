import "./CardUsuario.css";
import { useUsuarios } from "../UsuariosContext/UsuarioProvider";
import { Modal } from "../../ModalComponents/Modal";
import { FormUsuario } from "./FormUsuario";
import { useEffect, useState } from "react";

export function CardUsuario({ usuario }) {
  const { deleteUsuario } = useUsuarios();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleSubmit() {
    // Lógica para enviar el formulario
    handleCloseModal();
  }

  return (
    <div className="card-usuario">
      <div>Id: {usuario.id}</div>
      <div>Nombre: {usuario.nombre}</div>
      <div>Apellido Paterno: {usuario.apellidoPaterno}</div>
      <div>Apellido Materno: {usuario.apellidoMaterno}</div>
      <div>email: {usuario.email}</div>
      <div>
        Tipo Usuario:{" "}
        {usuario.tipoUsuario === 0
          ? "Usuario cliente"
          : usuario.tipoUsuario === 1
          ? "Usuario admin"
          : usuario.tipoUsuario === 2
          ? "Usuario repartidor"
          : "Tipo de usuario desconocido"}
      </div>
      <button className="card-usuario" onClick={handleOpenModal}>
        Editar usuario
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FormUsuario onSubmit={handleSubmit} initialUsuario={usuario} />
        <button onClick={handleCloseModal}>Cerrar ventana</button>
      </Modal>
      <button
        className="card-usuario"
        onClick={() => deleteUsuario(usuario.id)}
      >
        Eliminar usuario
      </button>
    </div>
  );
}
