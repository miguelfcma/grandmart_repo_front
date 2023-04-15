import { useEffect } from "react";
import { CardProductoGeneral } from "../ListaGeneralProductos/CardProductoGeneral";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import "./FiltradoProductos.css";

export function FiltradoProductosPorBusqueda({ searchTerm }) {
  const { productosAll, loadProductos } = useProductos();

  useEffect(() => {
    loadProductos();
  }, []);

  function renderMain() {
    let filteredProducts = productosAll;

    // Filtrar los productos basados en el searchTerm
    const filteredProductos = productosAll.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.categoria.nombre
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredProductos.length === 0) {
      const noHayResultados = `No hay publicaciones que coincidan con tu búsqueda "${searchTerm}."`;
      return (
        <div style={{ maxWidth: "1000px", marginLeft: "-90px" }}>
          <div style={{ paddingTop: "30px", fontSize: "30px" }}>
            {noHayResultados}
            <br></br> <br></br>
            * Revisa la ortografía de la palabra. <br></br>
            * Utiliza palabras más genéricas o menos palabras. <br></br>
            * Navega por las categorías para encontrar un producto similar.
          </div>
        </div>
      );
    } else {
      const siHayResultados = `Resultados para "${searchTerm}."`;
      return (
        <div style={{ maxWidth: "1000px", marginLeft: "-90px" }}>
          <div style={{ paddingTop: "25px", fontSize: "30px"}}>
            {siHayResultados}
            
          </div>
          <div style={{ display: "flex", flexWrap: "wrap"}}>
          {filteredProductos.map((producto) => (
            <div key={producto.id} style={{marginTop: "15px", marginRight: "35px" }}>
            <CardProductoGeneral producto={producto} />
          </div>
          ))}
          </div>
        </div>
      );
    }
  }
  return (
    <>
      <div className="filtProductos">{renderMain()}</div>
    </>
  );
}
