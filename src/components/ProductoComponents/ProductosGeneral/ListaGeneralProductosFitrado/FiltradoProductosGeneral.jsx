import { useEffect, useState } from "react";
import { CardProductoGeneral } from "../ListaGeneralProductos/CardProductoGeneral";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import { useCategorias } from "../../../CategoriaComponents/CategoriasContext/CategoriaProvider";

export function FiltradoProductosGeneral({ id_categoria, nombre_categoria }) {
  const { productosAll, loadProductos, favoritos, loadFavoritos } =
    useProductos();
  const { categorias, loadCategorias } = useCategorias();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [nombreCategoriaActual, setNombreCategoriaActual] = useState("");
  useEffect(() => {
    loadProductos();
    loadCategorias();
  }, []);
  useEffect(() => {
    if (usuario && usuario.id) {
      loadFavoritos(usuario.id);
    }
  }, []);

  useEffect(() => {
    if (id_categoria) {
      const categoriaEncontrada = categorias.find(
        (categoria) => categoria.id === parseInt(id_categoria)
      );

      if (categoriaEncontrada) {
        setNombreCategoriaActual(categoriaEncontrada.nombre);
      } else {
        setNombreCategoriaActual("Nombre de la categoría desconocido");
      }
    }
  }, [id_categoria]);
  function renderMain() {
    let filteredProducts = productosAll;

    if (id_categoria) {
      const categoriasHijas = categorias.filter(
        (categoria) => categoria.id_parent === parseInt(id_categoria)
      );
      if (categoriasHijas.length > 0) {
        const idsCategoriasHijas = categoriasHijas.map(
          (categoria) => categoria.id
        );
        filteredProducts = productosAll.filter((producto) =>
          idsCategoriasHijas.includes(producto.id_categoria)
        );
      } else {
        filteredProducts = productosAll.filter(
          (producto) => producto.id_categoria === parseInt(id_categoria)
        );
      }
    }

    if (filteredProducts.length === 0) {
      return (
        <div>
          <h2>{nombreCategoriaActual}</h2>
          <div style={{ fontSize: "30px", paddingTop: "50px" }}>
            Por ahora no hay productos registrados en esta categoría. Lo
            sentimos.
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      );
    } else {
      const categoriaFiltrada = `Estás en la categoría de "${nombreCategoriaActual}".`;
      return (
        <div style={{ justifyContent: "center" }}>
          <div
            style={{ fontSize: "30px", paddingTop: "5px", marginLeft: "115px" }}
          >
            {categoriaFiltrada}
            <br></br>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gridGap: "20px",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {filteredProducts.map((producto) => (
              <div
                key={producto.id}
                style={{
                  marginTop: "10px",
                  marginRight: "5px",
                  marginLeft: "55px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  gap: "20px",
                  flex: "1 0 300px" /* Se establece una flex-basis de 300px*/,
                }}
              >
                <CardProductoGeneral
                  key={producto.id}
                  producto={producto}
                  favoritos={favoritos}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <div>{renderMain()}</div>
    </>
  );
}
