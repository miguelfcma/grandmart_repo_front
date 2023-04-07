
import { useParams } from "react-router-dom";
import { Navbar } from "../../../components/HomePageComponents/NavBar";
import { FilterProducts } from "../../../components/ProductoComponents/general/ListaGeneralProductosFitrado/FilterProducts";

export function ProductosByCategoriaPage() {
  const { id_categoria } = useParams();
  return<>
  <Navbar/>
  <FilterProducts id_categoria={id_categoria}/>
  </>
};