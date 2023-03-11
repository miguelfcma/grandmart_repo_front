import { FormUsuario } from "../../../components/usuarioComponents/FormUsuario";

import { ListUsuarios } from "../../../components/usuarioComponents/ListUsuarios";
import { Modal } from "../../../components/Modal/Modal";
import { DashAdmin } from "../DashAdmin";
import { useEffect, useState } from "react";
import "./UsuariosPage.css";

export function UsuariosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setFormularioEnviado(false); // Reiniciar el estado del formulario enviado
  }

  function handleSubmit() {
    // Lógica para enviar el formulario
    setFormularioEnviado(true);
  }

  useEffect(() => {
    if (formularioEnviado) {
      handleCloseModal(); // Cerrar la ventana modal si el formulario se ha enviado correctamente
    }
  }, [formularioEnviado]);

  return (
    <>
      <DashAdmin />
      <button type="submit" onClick={handleOpenModal}>
        Nuevo registro
      </button>
      <ListUsuarios />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FormUsuario onSubmit={handleSubmit} />
        <button onClick={handleCloseModal}>Cerrar ventana</button>
      </Modal>
    </>
  );
}
