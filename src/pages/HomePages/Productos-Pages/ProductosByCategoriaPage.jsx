import { useParams } from "react-router-dom";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import { FiltradoProductosGeneral } from "../../../components/ProductoComponents/ProductosGeneral/ListaGeneralProductosFitrado/FiltradoProductosGeneral";
import { FiltradoProductosPorBusqueda } from "../../../components/ProductoComponents/ProductosGeneral/ListaGeneralProductosFitrado/FiltradoProductosPorBusqueda";
import { useState } from "react";
import { FooterHome } from "../../../components/HomePageComponents/FooterHome";
export function ProductosByCategoriaPage() {
  const { id_categoria, nombre_categoria } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  return (
    <>
     <div style={{ paddingTop: "80px" }}>
        <Navbar1 onSearch={handleSearch} />
        {searchTerm ? (
          <FiltradoProductosPorBusqueda searchTerm={searchTerm} />
        ) : (
          <>
            {" "}
            <FiltradoProductosGeneral
              id_categoria={id_categoria}
              nombre_categoria={nombre_categoria}
            />
          </>
        )}
      </div>
      <FooterHome />
    </>
  );
}
