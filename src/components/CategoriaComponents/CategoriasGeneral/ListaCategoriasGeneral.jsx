import { useCategorias } from "../CategoriasContext/CategoriaProvider";
import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import "./ListaCategoriasGeneral.css";
import { Link } from "react-router-dom";

export function ListaCategoriasGeneral() {
  // Se obtienen las funciones y datos relacionados con las categorias del contexto
  const { loadCategorias, categorias } = useCategorias();

  // Al cargar el componente, se llama a la funcion para cargar las categorias desde la API
  useEffect(() => {
    loadCategorias();
  }, []);

  // Funcion recursiva para renderizar categorías jerarquicas
  const renderizarCategoria = (categoria, nivel) => {
    const estiloCategoria = {
      paddingLeft: `${20 * nivel}px`, // Añade un espaciado a la izquierda para mostrar la jerarquía
      color: nivel === 0 ? "blue" : "green", // Cambia el color del texto para las categorias de nivel superior
    };
    return (
      <ListGroup.Item key={categoria.id} style={estiloCategoria} className="paginacategorias">
        {/* Se agrega un enlace a la categoria para navegar a su pagina */}
        <Link to={`/productos/categoria/${categoria.id}`}>
          {categoria.nombre}
        </Link>
        {/* Se renderiza las subcategorias, si existen */}
        {categoria.subcategorias && categoria.subcategorias.map((subcategoria) =>
          renderizarCategoria(subcategoria, nivel + 1)
        )}
      </ListGroup.Item>
    );
  };

  // Se tranforman las categorias planas en una estructura jerarquica
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
      <h2 className="titulo">Categorías</h2>
      <ListGroup>
        {categoriasJerarquicas.map((categoria) =>
          renderizarCategoria(categoria, 0)
        )}
      </ListGroup>
      <br></br><br></br>
    </>
  );
}
