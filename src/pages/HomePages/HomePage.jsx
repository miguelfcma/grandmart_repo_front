import { Navbar } from "../../components/HomePageComponents/NavBar"
import { Content } from "../../components/HomePageComponents/Content"
import { FormCreateBackup } from "../../components/BackupComponents/FormCreateBackup";
import { useState } from "react";
export function HomePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (searchTerm) => {
      setSearchTerm(searchTerm)
    };
    
    return (
      <>
        <Navbar onSearch={handleSearch}/>
        
        <Content searchTerm={searchTerm} />
      </>
    );
  }