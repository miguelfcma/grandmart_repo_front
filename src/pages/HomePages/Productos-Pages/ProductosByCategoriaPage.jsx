
import { useParams } from "react-router-dom";
import { FilterProducts } from "../../../components/ProductoComponents/client/FilterProducts";
export function ProductosByCategoriaPage() {
  const { id_categoria } = useParams();
  return<>
  <FilterProducts id_categoria={id_categoria}/>
  </>
};