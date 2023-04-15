
import { useParams } from "react-router-dom";
import { Navbar1 } from "../../../components/HomePageComponents/NavBar";
import { FiltradoProductosGeneral } from "../../../components/ProductoComponents/ProductosGeneral/ListaGeneralProductosFitrado/FiltradoProductosGeneral";
export function ProductosByCategoriaPage() {
  const { id_categoria } = useParams();
  return<>
  <Navbar1/>
  <FiltradoProductosGeneral id_categoria={id_categoria}/>
  </>
};