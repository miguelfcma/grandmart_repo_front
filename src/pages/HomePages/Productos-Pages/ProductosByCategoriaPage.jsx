
import { useParams } from "react-router-dom";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import { FiltradoProductosGeneral } from "../../../components/ProductoComponents/ProductosGeneral/ListaGeneralProductosFitrado/FiltradoProductosGeneral";
export function ProductosByCategoriaPage() {
  const { id_categoria, nombre_categoria } = useParams();
  return(
  <>
  <main>
  <Navbar1/>
  <FiltradoProductosGeneral id_categoria={id_categoria}  nombre_categoria ={nombre_categoria }/>
  </main>
  <footer>
        <p>Derechos Reservados © 2023 GrandMart</p>
      </footer>
  </>
  );
}