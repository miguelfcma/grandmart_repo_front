import { useParams } from "react-router-dom";
import { DetallesProducto } from "../../../components/ProductoComponents/client/DetallesProducto";
import { Navbar } from "../../../components/HomePageComponents/NavBar";

export function ProductosDetallesPage() {
<<<<<<< Updated upstream
  const { id } = useParams();
=======
  const { productos, getImgPortadaProducto, getProductImagesGaleria, loadProductos } = useProductos();
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [imagen, setImagen] = useState(null);
  const [imagenes, setImagenes] = useState(null);
  const { categorias, loadCategorias } = useCategorias();

  useEffect(() => {
    loadCategorias();
    loadProductos();
  }, []);

  useEffect(() => {
    const productoEncontrado = productos.find(
      (prod) => prod.id === parseInt(id)
    );

    if (productoEncontrado) {
      setProducto(productoEncontrado);

      async function cargarImagen() {
        const urlImagen = await getImgPortadaProducto(parseInt(id));
        const imagenesArray = await getProductImagesGaleria(parseInt(id));
        setImagenes(imagenesArray);
        setImagen(urlImagen);
      }

      cargarImagen();
    }
  }, [productos, id, getImgPortadaProducto, getProductImagesGaleria]);

>>>>>>> Stashed changes
  return (
    <>
       <Navbar/>
      <DetallesProducto id={id} />
    </>
  );
}
