import { useCategorias } from "./CategoriasContext/CategoriaProvider";
import { useEffect, useState } from "react";
import "./ListCategorias.css"; //Importar archivo CSS

export function ListCategorias() {
  const { loadCategorias, categorias } = useCategorias();
  const [categoriasArbol, setCategoriasArbol] = useState([]);

  //Apenas entre a esta pagina se ejecutara esta función
  useEffect(() => {
    loadCategorias();
  }, []);

  //Crear un objeto que represente el árbol de categorías
  useEffect(() => {
    const categoriasMap = new Map();
    categorias.forEach((categoria) => {
      if (!categoria.id_parent) {
        // La categoría no tiene padre, es una raíz
        categoriasMap.set(categoria.id, { ...categoria, hijos: [] });
      } else {
        // La categoría tiene un padre
        if (!categoriasMap.has(categoria.id_parent)) {
          // Si el padre no ha sido agregado al mapa aún, crearlo
          categoriasMap.set(categoria.id_parent, { hijos: [] });
        }
        categoriasMap.get(categoria.id_parent).hijos.push(categoria);
      }
    });
    setCategoriasArbol(Array.from(categoriasMap.values()));
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

  return (
    <>
      <h1 className="titulo">Lista de categorias</h1>
      {categoriasArbol.length === 0 ? (
        <h2 className="subtitulo">No hay categorías registradas</h2>
      ) : (
        <ul className="lista-categorias">
          {categoriasArbol.map(renderCategoria)}
        </ul>
      )}
    </>
  );
}
