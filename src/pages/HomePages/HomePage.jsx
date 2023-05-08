import { Navbar1 } from "../../components/HomePageComponents/NavBar"
import { Content } from "../../components/HomePageComponents/Content"
import { AnimacionCargaComponent } from "../../components/Animaciones/AnimacionCargaComponent";
import { useState } from "react";
export function HomePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (searchTerm) => {
      setSearchTerm(searchTerm)
    };
    
    return (
      <>
        <Navbar1 onSearch={handleSearch}/>
        
        <Content searchTerm={searchTerm} />
        <AnimacionCargaComponent/>
      </>
    );
  }