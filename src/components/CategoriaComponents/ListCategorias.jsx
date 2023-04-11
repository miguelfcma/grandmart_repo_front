import { useCategorias } from "./CategoriasContext/CategoriaProvider";
import { useEffect, useState } from "react";
import { Modal } from "../ModalComponents/Modal";
import { FormCategoria } from "./FormCategoria";
import { Table, Button } from "react-bootstrap";
import "./ListCategorias.css";

export function ListCategorias() {
  const { loadCategorias, categorias, deleteCategoria } = useCategorias();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    loadCategorias();
  }, []);

  function handleOpenModal(categoria) {
    setIsModalOpen(true);
    setCategoriaSeleccionada(categoria);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setFormularioEnviado(false);
    setCategoriaSeleccionada(null);
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
      <Table striped bordered hover>
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
                <Button variant="primary" onClick={() => handleOpenModal(categoria)}>
                  Editar
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => deleteCategoria(categoria.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {categoriaSeleccionada && (
          <FormCategoria
            onSubmit={handleSubmit}
            categoria={categoriaSeleccionada}
          />
        )}
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar ventana
        </Button>
      </Modal>
    </>
  );
}
