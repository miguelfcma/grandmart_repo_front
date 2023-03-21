import { useCategorias } from "./CategoriasContext/CategoriaProvider";
import { useEffect, useState } from "react";
import { Modal } from "../ModalComponents/Modal";
import { FormCategoria } from "./FormCategoria";
import "./ListCategorias.css";

export function ListCategorias() {
  const { loadCategorias, categorias, deleteCategoria } = useCategorias();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null); // Nuevo estado para la categoría seleccionada

  useEffect(() => {
    loadCategorias();
  }, []);

  function handleOpenModal(categoria) {
    setIsModalOpen(true);
    setCategoriaSeleccionada(categoria); // Actualiza la categoría seleccionada
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setFormularioEnviado(false);
    setCategoriaSeleccionada(null); // Resetea la categoría seleccionada al cerrar la ventana modal
  }

  function handleSubmit() {
    setFormularioEnviado(true);
  }

  useEffect(() => {
    if (formularioEnviado) {
      handleCloseModal();
    }
  }, [formularioEnviado]);

  return (
    <>
      
      <h2 className="titulo">Lista de categorias:</h2>
      <table className="tabla-categorias">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría Padre</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.nombre}</td>
              <td>{categoria.id_parent || "-"}</td>
              <td>
                <button onClick={() => handleOpenModal(categoria)}>
                  Editar
                </button>
              </td>
              <td>
                <button onClick={() => deleteCategoria(categoria.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {categoriaSeleccionada && ( // Renderiza el formulario sólo si hay una categoría seleccionada
          <FormCategoria
            onSubmit={handleSubmit}
            categoria={categoriaSeleccionada} // Pasa la categoría seleccionada como propiedad al formulario
          />
        )}
        <button onClick={handleCloseModal}>Cerrar ventana</button>
      </Modal>
    </>
  );
}
