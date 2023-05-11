import { Navbar1 } from "../../../components/HomePageComponents/NavBar";

import { PaginaDeCompra } from "../../../components/OrdenesComponents/OrdenesGeneral/PaginaDeCompra";
import"./ResumenComprasPage.css"
export  function ResumenComprasPage() {
  return (
    <div className="resumenComprasPage" style={{ paddingTop: "80px" }}>
      
    <Navbar1/>
    <PaginaDeCompra/>
    </div>
  )
}
