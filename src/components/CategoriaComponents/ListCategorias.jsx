import { useCategorias } from "./CategoriasContext/CategoriaProvider";
import { useEffect, useState } from "react";
import { Modal } from "../ModalComponents/Modal";
import { FormCategoria } from "./FormCategoria";
import { Table, Button } from "react-bootstrap";
import "./ListCategorias.css";
import Swal from "sweetalert2";

export function ListCategorias() {
  const { loadCategorias, categorias, deleteCategoria } = useCategorias();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await loadCategorias();
    }
    fetchData();
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

  const handleEliminarCategoria = async (categoria) => {
    try {
      const confirmResult = await Swal.fire({
        icon: "warning",
        title: "Eliminar categoría",
        html: `¿Estás seguro de eliminar la categoría <strong>${categoria.nombre}</strong>?`,
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      });

      if (confirmResult.isConfirmed) {
        const status = await deleteCategoria(categoria.id);
        if (status === 204) {
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "La categoría se eliminó correctamente",
          });
        } else if (status === 400) {
          Swal.fire({
            icon: "info",
            title: "Advertencia",
            text: "La categoría tiene subcategorías y no se puede eliminar",
          });
        } else if (status === 404) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "La categoría no se encontró o no existe",
          });
        } else if (status === 500) {
          Swal.fire({
            icon: "error",
            title: "Error en el servidor",
            text: "Ocurrió un error en el servidor. Por favor, intenta nuevamente más tarde.",
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 className="titulo">Lista de categorias:</h2>
      <div class="tabla-lista-categorias">
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría Padre</th>
              <th>Botones de acción</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
                <td>{categoria.id_parent || "-"}</td>
                <td>
                  <div class="btn-acciones-categoria">
                    <Button
                      variant="primary"
                      onClick={() => handleOpenModal(categoria)}
                    >
                      Editar
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => handleEliminarCategoria(categoria)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
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
