import { useState, useEffect } from "react";
import { useCategorias } from "./CategoriasContext/CategoriaProvider";

export const FormCategoria = ({ idCategoria, onSubmit }) => {
  const { getCategoria } = useCategorias();

  const [categoria, setCategoria] = useState({ id: idCategoria, nombre: "", idParent: "" });

  useEffect(() => {
    const obtenerCategoria = async () => {
      const data = await getCategoria(idCategoria);
      setCategoria(data);
    };
    obtenerCategoria();
  }, [getCategoria, idCategoria]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await onSubmit(categoria);
    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ID:
        <input type="text" value={categoria.id} readOnly />
      </label>
      <label>
        Nombre:
        <input type="text" value={categoria.nombre} onChange={(e) => setCategoria({ ...categoria, nombre: e.target.value })} />
      </label>
      <label>
        ID del padre:
        <input type="text" value={categoria.idParent} onChange={(e) => setCategoria({ ...categoria, idParent: e.target.value })} />
      </label>
      <button type="submit">Guardar</button>
    </form>
  );
};
