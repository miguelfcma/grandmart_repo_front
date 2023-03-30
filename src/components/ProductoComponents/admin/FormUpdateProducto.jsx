import { useProductos } from "../ProductosContext/ProductoProvider"
export  function FormUpdateProducto(producto) {
    const {updateProducto} = useProductos()
    const [producto, setProducto] = useState({
        nombre: "",
        precio: "",
        stock: "",
        descripcion: "",
        marca: "",
        modelo: "",
        color: "",
        estado: "",
        id_categoria: "",
        id_usuario: usuario.id,
      });
  return (
    <div>
      
    </div>
  )
}
