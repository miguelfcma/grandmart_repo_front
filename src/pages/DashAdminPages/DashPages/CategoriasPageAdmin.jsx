import { SidebarAdmin } from "../../../components/DashAdminComponents/SidebarAdmin";
import { HeaderAdmin } from "../../../components/DashAdminComponents/HeaderAdmin";
import { ListCategorias } from "../../../components/CategoriaComponents/ListCategorias";
import { Modal } from "../../../components/ModalComponents/Modal";
import { FormCategoria } from "../../../components/CategoriaComponents/FormCategoria";
import { useState, useEffect } from "react";
import "../DashAdmin.css";
export function CategoriasPageAdmin() {
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
    <div className="dashboard-container">
      <SidebarAdmin />
      <div className="contenidoPages">
        <HeaderAdmin />
        <h1>Página de categorías</h1>
        <button type="submit" onClick={handleOpenModal}>
          Nuevo registro
        </button>

        <ListCategorias />

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <FormCategoria onSubmit={handleSubmit} />
          <button onClick={handleCloseModal}>Cerrar ventana</button>
        </Modal>
      </div>
    </div>
  );
}
