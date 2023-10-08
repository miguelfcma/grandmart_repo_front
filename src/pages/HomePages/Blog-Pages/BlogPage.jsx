import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import { FormNuevaPublicacionBlog } from "../../../components/BlogComponents/FormNuevaPublicacionBlog";
import { ListaPublicacionesBlog } from "../../../components/BlogComponents/ListaPublicacionesBlog";
import { FiltradoProductosPorBusqueda } from "../../../components/ProductoComponents/ProductosGeneral/ListaGeneralProductosFitrado/FiltradoProductosPorBusqueda";
import { useState } from "react";
import { FooterHome } from "../../../components/HomePageComponents/FooterHome";
export function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  return (
    <div style={{ paddingTop: "80px" }}>
      <Navbar1 onSearch={handleSearch} />
      {searchTerm ? (
        <FiltradoProductosPorBusqueda searchTerm={searchTerm} />
      ) : (
        <>
          {usuario ? (
            <FormNuevaPublicacionBlog />
          ) : (
            <p>Por favor inicia sesión para publicar</p>
          )}

          <ListaPublicacionesBlog />
        </>
      )}
      <FooterHome />
    </div>
  );
}
