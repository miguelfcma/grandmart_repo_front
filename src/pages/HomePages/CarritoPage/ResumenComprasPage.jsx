import { Link } from "react-router-dom";
import { PaginaDeCompra } from "../../../components/OrdenesComponents/OrdenesGeneral/PaginaDeCompra";
import"./ResumenComprasPage.css"
export  function ResumenComprasPage() {
  return (
    <div className="resumenComprasPage" style={{ paddingTop: "80px" }}>
      
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/">
            <img
              alt="e-commerce"
              src="https://firebasestorage.googleapis.com/v0/b/grandmart-51065.appspot.com/o/src%2Flogo.png?alt=media&token=6c393680-5c89-4708-a0d3-f8ffcb0fc379"
            />
          </Link>
        </div>
      </nav>
    <PaginaDeCompra/>
    </div>
  )
}
