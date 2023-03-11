import { useCategorias } from "./CategoriasContext/CategoriaProvider";
import { useEffect, useState } from "react";
import { Modal } from "../Modal/Modal";
import { FormCategoria } from "./FormCategoria";
import "./ListCategorias.css"; //Importar archivo CSS

export function ListCategorias() {
  const { loadCategorias, categorias, deleteCategoria } = useCategorias();
  const [categoriasArbol, setCategoriasArbol] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null); // Nuevo estado para la categoría editando

  useEffect(() => {
    loadCategorias();
  }, []);

  useEffect(() => {
    const categoriasMap = new Map();
    categorias.forEach((categoria) => {
      categoriasMap.set(categoria.id, { ...categoria, hijos: [] });
    });
    categoriasMap.forEach((categoria) => {
      if (categoria.id_parent) {
        categoriasMap.get(categoria.id_parent).hijos.push(categoria);
      }
    });
    setCategoriasArbol(
      Array.from(categoriasMap.values()).filter(
        (categoria) => categoria.id_parent === null
      )
    );
  }, [categorias]);

  function renderCategoria(categoria) {
    return (
      <li key={categoria.id}>
        {categoria.nombre}
        {categoria.hijos && categoria.hijos.length > 0 && (
          <ul>{categoria.hijos.map(renderCategoria)}</ul>
        )}
      </li>
    );
  }

  function handleOpenModal(categoria) {
    // Recibe la categoría como argumento
    setIsModalOpen(true);
    setCategoriaEditando(categoria); // Actualiza la categoría editando
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setFormularioEnviado(false);
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
      <h1 className="titulo">Lista de categorias</h1>
      {categoriasArbol.length === 0 ? (
        <h2 className="subtitulo">No hay categorías registradas</h2>
      ) : (
        <>
          <ul className="lista-categorias">
            {categoriasArbol.map(renderCategoria)}
          </ul>
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

                    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                      <FormCategoria
                        onSubmit={handleSubmit}
                        idCategoria={categoria.id}
                      />
                      <button onClick={handleCloseModal}>Cerrar ventana</button>
                    </Modal>
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
        </>
      )}
    </>
  );
}
