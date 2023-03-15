import { useState } from "react";
import { useCategorias } from "./CategoriasContext/CategoriaProvider";

export const FormCategoria = ({ categoria = null, onSubmit }) => {
  const { categorias, createCategoria, updateCategoria } = useCategorias();
  const [categoriaEditada, setCategoriaEditada] = useState(
    categoria || {
      nombre: "",
      id_parent: null,
    }
  ); /*  */
  const editando = categoriaEditada.id != null;

  const handleSubmit = async (event) => {
    event.preventDefault();
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

  const buildOptions = (categorias, indent = 0) => {
    return categorias.map((categoria) => {
      const prefix = new Array(indent + 1).join("-");
      return (
        <option key={categoria.id} value={categoria.id}>
          {prefix} {categoria.nombre}
        </option>
      );
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
        Categoría Padre:
        <select
          name="id_parent"
          value={categoriaEditada.id_parent || ""}
          onChange={handleIdParentChange}
        >
          <option value="">-- Sin Categoría Padre --</option>
          {buildOptions(categorias)}
        </select>
      </label>
      <button type="submit">Guardar</button>
    </form>
  );
};
