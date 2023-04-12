import { useCategorias } from "../CategoriasContext/CategoriaProvider";
import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import "./ListaCategoriasGeneral.css";
import { Link } from "react-router-dom";

export function ListaCategoriasGeneral() {
  const { loadCategorias, categorias } = useCategorias();

  useEffect(() => {
    loadCategorias();
  }, []);

  const renderizarCategoria = (categoria, nivel) => {
    const estiloCategoria = {
      paddingLeft: `${20 * nivel}px`,
      color: nivel === 0 ? "blue" : "green",
    };
    return (
      <ListGroup.Item key={categoria.id} style={estiloCategoria}>
       <Link to={`/productos/categoria/${categoria.id}`}>
        {categoria.nombre}
      </Link>
        {categoria.subcategorias && categoria.subcategorias.map((subcategoria) =>
          renderizarCategoria(subcategoria, nivel + 1)
        )}
      </ListGroup.Item>
    );
  };

  const categoriasJerarquicas = categorias.reduce((categoriasAcumuladas, categoria) => {
    if (!categoria.id_parent) {
      categoriasAcumuladas.push({
        ...categoria,
        subcategorias: [],
      });
    } else {
      categoriasAcumuladas.forEach((categoriaAcumulada) => {
        if (categoriaAcumulada.id === categoria.id_parent) {
          if (!categoriaAcumulada.subcategorias) {
            categoriaAcumulada.subcategorias = [];
          }
          categoriaAcumulada.subcategorias.push(categoria);
        }
      });
    }
    return categoriasAcumuladas;
  }, []);

  return (
    <>
      <h2 className="titulo">Lista de categorias:</h2>
      <ListGroup>
        {categoriasJerarquicas.map((categoria) =>
          renderizarCategoria(categoria, 0)
        )}
      </ListGroup>
    </>
  );
}
