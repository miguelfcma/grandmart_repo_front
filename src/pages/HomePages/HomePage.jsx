// Importación de componentes necesarios desde rutas específicas
import { Navbar1 } from "../../components/HomePageComponents/NavBar";
import { Content } from "../../components/HomePageComponents/Content";

// Importación de useState para gestionar el estado
import { useState } from "react";

// Definición del componente HomePage
export function HomePage() {
  // Definición del estado searchTerm y su función para actualizarlo
  const [searchTerm, setSearchTerm] = useState("");

  // Función handleSearch que actualiza el estado searchTerm
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <>
      {/* Renderiza el componente Navbar1 y pasa la función handleSearch como prop */}
      <Navbar1 onSearch={handleSearch} />

      {/* Renderiza el componente Content y pasa el estado searchTerm como prop */}
      <Content searchTerm={searchTerm} />
    </>
  );
}
