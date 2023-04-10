
import { useParams } from "react-router-dom";
import { Navbar } from "../../../components/HomePageComponents/NavBar";
import { FiltradoProductosGeneral } from "../../../components/ProductoComponents/ProductosGeneral/ListaGeneralProductosFitrado/FiltradoProductosGeneral";
export function ProductosByCategoriaPage() {
  const { id_categoria } = useParams();
  return<>
  <Navbar/>
  <FiltradoProductosGeneral id_categoria={id_categoria}/>
  </>
};