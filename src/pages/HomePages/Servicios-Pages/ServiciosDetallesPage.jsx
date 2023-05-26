import { useParams } from "react-router-dom";
import { DetallesServicioGeneral } from "../../../components/ServicioComponents/ServiciosGeneral/ListaGeneralServicios/VistaDetallesServicioGeneral/DetallesServicioGeneral";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import { FooterHome } from "../../../components/HomePageComponents/FooterHome";
import { FiltradoProductosPorBusqueda } from "../../../components/ProductoComponents/ProductosGeneral/ListaGeneralProductosFitrado/FiltradoProductosPorBusqueda";
import { useState } from "react";
export function ServiciosDetallesPage() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  return (
    <div style={{ paddingTop: "80px" }} className="productos-detalles-page" >
      <Navbar1 onSearch={handleSearch} className="navbar" />
      {searchTerm ? (
        <FiltradoProductosPorBusqueda searchTerm={searchTerm} />
      ) : (
        <>
          <div className="detalles-producto-general">
            <DetallesServicioGeneral id={id} />
          </div>
        </>
      )}
      <FooterHome />
    </div>
  );
}
