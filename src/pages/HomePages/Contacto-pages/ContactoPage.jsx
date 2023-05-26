import { InfoContacto } from "../../../components/HomePageComponents/InfoContacto";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import { FiltradoProductosPorBusqueda } from "../../../components/ProductoComponents/ProductosGeneral/ListaGeneralProductosFitrado/FiltradoProductosPorBusqueda";
import { useState } from "react";
import { FooterHome } from "../../../components/HomePageComponents/FooterHome";
export function ContactoPage() {
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
          <InfoContacto />
        </>
      )}
      <FooterHome/>
    </div>
  );
}
