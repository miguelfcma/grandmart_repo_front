// Importación de los módulos necesarios desde rutas específicas
import { Link } from "react-router-dom";
import { PaginaDeCompra } from "../../../components/OrdenesComponents/OrdenesGeneral/PaginaDeCompra";
import "./ResumenComprasPage.css"; // Importación del archivo CSS

// Definición del componente ResumenComprasPage
export function ResumenComprasPage() {
  return (
    <div className="resumenComprasPage" style={{ paddingTop: "80px" }}>
      {/* Barra de navegación */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* Enlace al inicio de la página con el logotipo */}
          <Link to="/">
            <img
              alt="e-commerce"
              src="https://firebasestorage.googleapis.com/v0/b/grandmart-51065.appspot.com/o/src%2Flogo.png?alt=media&token=6c393680-5c89-4708-a0d3-f8ffcb0fc379"
            />
          </Link>
        </div>
      </nav>

      {/* Renderiza la página de compra, que probablemente contiene el resumen de las compras realizadas */}
      <PaginaDeCompra />
    </div>
  );
}
