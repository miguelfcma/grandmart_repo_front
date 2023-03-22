import { Navbar } from "../components/HomePageComponents/NavBar"
import { Content } from "../components/HomePageComponents/Content"

import { useState } from "react";
export function HomePage() {
    const [searchTerm, setSearchTerm] = useState("");
    
    return (
      <>
        <Navbar setSearchTerm={setSearchTerm} />
        
        <Content searchTerm={searchTerm} />
      </>
    );
  }