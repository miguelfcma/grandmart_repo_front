import { ListaCategoriasGeneral } from "../../../components/CategoriaComponents/CategoriasGeneral/ListaCategoriasGeneral";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import { FiltradoProductosPorBusqueda } from "../../../components/ProductoComponents/ProductosGeneral/ListaGeneralProductosFitrado/FiltradoProductosPorBusqueda";
import { FooterHome } from "../../../components/HomePageComponents/FooterHome";

import { useState } from "react";
export function CategoriasHomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  return (
    <div style={{ paddingTop: "80px" }}>
      <Navbar1 onSearch={handleSearch} />
      {searchTerm ? (
        <FiltradoProductosPorBusqueda searchTerm={searchTerm} />
      ) : (
        <>
          <div style={{ paddingLeft: "30px", paddingRight: "45px" }}>
            <ListaCategoriasGeneral />
          </div>
        </>
      )}
      <FooterHome/>
    </div>
  );
}
