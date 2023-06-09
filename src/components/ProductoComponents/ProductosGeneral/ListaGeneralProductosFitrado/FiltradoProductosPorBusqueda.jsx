import { useEffect } from "react";
import { CardProductoGeneral } from "../ListaGeneralProductos/CardProductoGeneral";
import { CardServicioGeneral } from "../../../ServicioComponents/ServiciosGeneral/ListaGeneralServicios/CardServicioGeneral";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import { useServicios } from "../../../ServicioComponents/ServiciosContext/ServicioProvider";

export function FiltradoProductosPorBusqueda({ searchTerm }) {
  const { productosAll, loadProductos, favoritos, loadFavoritos } =
    useProductos();
  const { serviciosAll, loadServicios } = useServicios();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Declarar la variable noHayResultados fuera de la función renderMain()
  const noHayResultados = `No hay publicaciones que coincidan con tu búsqueda "${searchTerm}".`;

  useEffect(() => {
    loadProductos();
    loadServicios();
  }, []);

  useEffect(() => {
    if (usuario && usuario.id) {
      loadFavoritos(usuario.id);
    }
  }, []);

  function renderMain() {
    let filteredProducts = productosAll;
    let filteredServicios = serviciosAll;

    // Filtrar los productos basados en el searchTerm
    const filteredProductos = productosAll.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.categoria.nombre
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filtrar los servicios basados en el searchTerm
    const filterServicios = serviciosAll.filter(
      (servicio) =>
        servicio.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        servicio.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredProductos.length === 0 || filteredServicios.length === 0) {
      return (
        <div>
          <div style={{ paddingTop: "30px", fontSize: "30px" }}>
            {noHayResultados}
            <br></br> <br></br>* Revisa la ortografía de la palabra. <br></br>*
            Utiliza palabras más genéricas o menos palabras. <br></br>* Navega
            por las categorías para encontrar un producto similar.
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      );
    } else {
      const siHayResultados = `Resultados para "${searchTerm}".`;
      return (
        <div>
          <div style={{ fontSize: "30px", paddingTop: "5px", marginLeft: "35px"}}>
            {siHayResultados}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "35px"}}>
            {filteredProductos.map((producto) => (
              <div
                key={producto.id}
                style={{
                  marginTop: "15px",
                  marginRight: "35px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  gap: "20px",
                  alignItems: "stretch",
                }}
              >
                <CardProductoGeneral
                  key={producto.id}
                  producto={producto}
                  favoritos={favoritos}
                />
              </div>
            ))}

            {filterServicios.map((servicio) => (
              <div
                key={servicio.id}
                style={{
                  marginTop: "15px",
                  marginRight: "35px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  gap: "20px",
                  alignItems: "stretch",
                }}
              >
                <CardServicioGeneral servicio={servicio} />
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
