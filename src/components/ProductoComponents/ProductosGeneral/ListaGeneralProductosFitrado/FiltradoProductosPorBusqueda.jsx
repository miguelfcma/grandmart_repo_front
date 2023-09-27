import { useEffect } from "react";
import { CardProductoGeneral } from "../ListaGeneralProductos/CardProductoGeneral";
import { CardServicioGeneral } from "../../../ServicioComponents/ServiciosGeneral/ListaGeneralServicios/CardServicioGeneral";
import { useProductos } from "../../ProductosContext/ProductoProvider";
import { useServicios } from "../../../ServicioComponents/ServiciosContext/ServicioProvider";

export function FiltradoProductosPorBusqueda({ searchTerm }) {
  const { productosAll, loadProductos, favoritos, loadFavoritos } = useProductos();
  const { serviciosAll, loadServicios } = useServicios();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    loadProductos();
    loadServicios();
  }, []);

  useEffect(() => {
    if (usuario && usuario.id) {
      loadFavoritos(usuario.id);
    }
  }, []);

  function renderProductos() {
    const filteredProductos = productosAll.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div>
        {filteredProductos.map((producto) => (
          <div key={producto.id}>
            <CardProductoGeneral producto={producto} favoritos={favoritos} />
          </div>
        ))}
      </div>
    );
  }

  function renderServicios() {
    const filteredServicios = serviciosAll.filter(
      (servicio) =>
        servicio.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        servicio.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div>
        {filteredServicios.map((servicio) => (
          <div key={servicio.id}>
            <CardServicioGeneral servicio={servicio} />
          </div>
        ))}
      </div>
    );
  }

  const hayProductos = productosAll.length > 0 && renderProductos().props.children.length > 0;
  const hayServicios = serviciosAll.length > 0 && renderServicios().props.children.length > 0;

  return (
    <div>
      {(hayProductos || hayServicios) ? (
        <>
          {hayProductos && (
            <div style={{ fontSize: "30px", paddingTop: "5px", marginLeft: "35px" }}>
              Resultados de productos para "{searchTerm}".
            </div>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "35px" }}>
            {hayProductos && renderProductos()}
          </div>
  
          {hayServicios && (
            <div style={{ fontSize: "30px", paddingTop: "5px", marginLeft: "35px" }}>
              Resultados de servicios para "{searchTerm}".
            </div>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "35px" }}>
            {hayServicios && renderServicios()}
          </div>
        </>
      ) : (
        <div style={{ fontSize: "30px", paddingTop: "5px", marginLeft: "35px" }}>
          No hay publicaciones que coincidan con tu búsqueda: "{searchTerm}".
          <p></p>
          <p>* Revisa la ortografía de la palabra.</p>
          <p>* Utiliza palabras más genéricas o menos palabras.</p>
          <p>* Navega por las categorías para encontrar un producto similar.</p>
        </div>
      )}
    </div>
  );
  
}
