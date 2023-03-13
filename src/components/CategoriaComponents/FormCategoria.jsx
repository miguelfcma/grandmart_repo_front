import { useState } from "react";
import { useCategorias } from "./CategoriasContext/CategoriaProvider";
export const FormCategoria = ({ categoria = null, onSubmit }) => {
  const { updateCategoria, createCategoria } = useCategorias();
  const [categoriaEditada, setCategoriaEditada] = useState(categoria || {
    nombre: '',
    id_parent: null,
  });
  const editando =(categoriaEditada.id != null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(categoriaEditada)
    if (editando) {
      await updateCategoria(categoriaEditada.id, categoriaEditada);
    } else {
      await createCategoria(categoriaEditada);
    }
    onSubmit();
  };

  const handleIdParentChange = (e) => {
    const id_parent = e.target.value.trim() ? e.target.value : null;
    setCategoriaEditada({
      ...categoriaEditada,
      id_parent,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {editando && (
        <label>
          ID:
          <input
            type="text"
            value={categoriaEditada.id}
            onChange={(e) =>
              setCategoriaEditada({
                ...categoriaEditada,
                id: e.target.value,
              })
            }
            disabled
          />
        </label>
      )}
      <label>
        Nombre:
        <input
          type="text"
          value={categoriaEditada.nombre}
          onChange={(e) =>
            setCategoriaEditada({
              ...categoriaEditada,
              nombre: e.target.value,
            })
          }
        />
      </label>
      <label>
        ID del padre:
        <input
          type="text"
          pattern="[0-9]*"
          value={categoriaEditada.id_parent || ''}
          onChange={handleIdParentChange}
        />
      </label>
      <button type="submit">Guardar</button>
    </form>
  );
};
