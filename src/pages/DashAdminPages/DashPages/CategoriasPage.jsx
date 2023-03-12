import { DashAdmin } from "../DashAdmin";
import { ListCategorias } from "../../../components/CategoriaComponents/ListCategorias";
import { Modal } from "../../../components/Modal/Modal";
import { FormCategoria } from "../../../components/CategoriaComponents/FormCategoria";
import { useState,useEffect} from "react";
export function CategoriasPage() {
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
    <div>
        <DashAdmin />
      <h1>Hoal estas en la pagina de catgeorias</h1>
      <button type="submit" onClick={handleOpenModal}>
        Nuevo registro
      </button>

      <ListCategorias/>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FormCategoria onSubmit={handleSubmit} />
        <button onClick={handleCloseModal}>Cerrar ventana</button>
      </Modal>
    </div>
  )
}
